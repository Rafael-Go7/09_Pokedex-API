let PokemonList = [];
startPokemonCount = 0;
LoadMorePokemonsCount = 20;
// let keyboard = new Keyboard();
CurrentGlobalPokemon = [];


async function loadPokemons() {                                 // async functions we use when we have high latencies, e.g. get apis from internet
    for (let i = startPokemonCount ; i < LoadMorePokemonsCount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;     // gets api   - in this case we count i+1 when reading data from api because by doing so we increase the initial value of the first entry of our array artificially. Due to that our PokemonCount delivers even numbers, e.g. 20. We do not make use of the Pokemon-ID from api for counting/ rendering!  
        let response = await fetch(url);                        //  fetch (url) downloads the api's content
        currentPokemon = await response.json();                 // defining .json as data-format-standard
        PokemonList.push(currentPokemon);                       // pushing into main array
        console.log('Loaded pokemon', currentPokemon);
        renderPokemons();
       
    } startPokemonCount = LoadMorePokemonsCount;
        console.log('LoadMorePokemonsCount', LoadMorePokemonsCount);
}


function searchPokemon () {
    document.getElementById('maincontent').innerHTML = '';
    let query = document.getElementById('searchbar').value;
    let searchInput = query.toLowerCase();
    console.log (searchInput);

    for (let index = 0; index < PokemonList.length; index++) {
        let Finding = PokemonList[index].name;
        console.log ("name: ", Finding);      
        
        if (Finding.includes(searchInput)) {
            let foundPokemon = PokemonList[index];
            templateRenderPokemons (foundPokemon, index);
        }

        else {
            
                if (query.length == 0)  {
                    renderPokemons();
                
            }
        }
    }
}


function renderPokemons(){
    document.getElementById('maincontent').innerHTML = '';
    for (let index = 0; index < PokemonList.length; index++) {
        const ShowPokemon = PokemonList[index];

    templateRenderPokemons(ShowPokemon, index); 
    gettype(index);
    }       

}


function templateRenderPokemons (ShowPokemon, i) {             
    
    document.getElementById('maincontent').innerHTML += `
    
    <div class="card ${ShowPokemon['types']['0']['type']['name']}" id="pokecard" onclick="openPokemon(${i})">
        <div class="pokecard_head">
            <div class="pokecard_head_left">
                <h2 id="poke_name">${ShowPokemon['name']}</h2>
                
                <div class="pokecard_head_left_sub">
                    <img src="img/pokemon ball_1_640x479x - Kopie.png">
                    <div class="pokecard_class" id="pokecard_class${i}"></div>
                </div>
                
            </div>
            <div>#${ShowPokemon['id']}</div>
        </div>
        <div class="pokecard_body">
            <img src="${ShowPokemon['sprites']['other']['home']['front_default']}"> 
        </div>
        
    </div>

    `;              // wir benutzen .src - da wir das Bild ändern wollen. Zudem: 'sprites' wird häufig als ein Array für Bilder benutzt.
}


function gettype(i){
    
    for (let index=0; index<PokemonList[i].types.length; index++)
    { 
        document.getElementById(`pokecard_class${i}`).innerHTML+= `<div><span>${PokemonList[i].types[index].type.name}</span></div>`
        
    }

    // for (let g=0; g<PokemonList[b].types.length; g++)
    // {
    //     document.getElementById(`PokeTypes${b}`).innerHTML = `<span>${PokemonList[b].types[g].type.name}</span>`
    // }

}


function openPokemon(i){
    document.getElementById('popUpContainer').classList.remove('hide');
    renderPokeDetail(i); aboutPoke (i); genPokeStats(i); genPokeMovelist(i); 
}

function renderPokeDetail(i) {

        
    document.getElementById('popUpContainer').innerHTML = `
    
    <div id="detail-card" class="detail-card ${PokemonList[i]['types']['0']['type']['name']}">
        <div class="detail-card_head">

            <b>#${PokemonList[i]['id']}</b>    
            <h2>${PokemonList[i]['name']}</h2>
            <button class="${PokemonList[i]['types']['0']['type']['name']}" onclick="closePokemon()"><b>X</b></button>
        </div>
        <div class="top-container">
            <div class="top-containerLinearGradientCard"> 
                <div class="top-containerContent">
                    <div class="top-containerInside">   
                        <button class="btn_arrowLeft" onclick="arrowLeft(${i})"><img src="img/arrow_left_64x64.png"></button>
                        <img src="${PokemonList[i]['sprites']['other']['home']['front_default']}">
                        <button class="btn_arrowRight" onclick="arrowRight(${i})"><img src="img/arrow_right_64x64.png"></button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bottom-container">
                                        
                    <div class="bottom-container_categories">
                        <button class="w3-bar-item-w3-button" onclick="openCity('London')">About</button>
                        
                        <button class="w3-bar-item-w3-button" onclick="openCity('Paris')">Base Stats</button>
                        
                        <button class="w3-bar-item-w3-button" onclick="openCity('Tokyo')">Moves</button>
                    </div> 
                    <hr> 
                    <div class="infos">
                        <div id="London" class="city">
                            <div><p><b>Height:</b>  ${PokemonList[i]['height']/10} m</p></div>
                            <hr>
                            <div><p><b>Weight:</b>  ${PokemonList[i]['weight']/10} kg</p></div>
                            <hr>
                            <div><p><b>Base-Experience:</b> ${PokemonList[i]['base_experience']}</p></div>
                            <hr>
                            <div id="nexo">
                                <div><p><b>Abilities: </b></p></div>
                                <div class="poke_Abilities" id="poke_Abilities"></div>
                            </div>
                            <hr>
                            <div id="nexo2">
                                <div><p><b>Classes:</b></p></div>
                                <div class="PokeTypes" id="PokeTypes"></div>
                            </div>

                            
                        </div>

                        <div id="Paris" class="city" style="display:none">
                            <div id="poke_stats" class="poke_stats">
                                
                            </div>
                        </div>

                        <div id="Tokyo" class="city" style="display:none">
                            <div id="poke_MoveList" class="poke_MoveList"> </div>
                        </div>
                    </div> 
                   
        </div>  
    </div>
    `;

}


function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
}


function closePokemon(){
    document.getElementById('popUpContainer').classList.add('hide')

}


function aboutPoke (i) {
    
    let about = document.getElementById('poke_Abilities');
    about.innerHTML = ``;

    for (let a = 0; a < PokemonList[i].abilities.length; a++) {
        
        let Abilities = PokemonList[i].abilities[a].ability.name;
        about.innerHTML += renderAboutPoke (Abilities);
    }

    let pokeClasses = document.getElementById('PokeTypes');
    pokeClasses.innerHTML = ``;

    for (let g = 0; g < PokemonList[i].types.length; g++) {
        
        let Types = PokemonList[i].types[g].type.name;
        pokeClasses.innerHTML += renderAboutPoke (Types);
    }

}


function renderAboutPoke (Abilities, Types) {
    return `

    &#160${Abilities},
    `;

    `
    &#160${Types},
    `;
    
}


function genPokeStats (i) {
    let pokeStats = document.getElementById('poke_stats');
    pokeStats.innerHTML = ``;

    for (let index = 0; index < PokemonList[i].stats.length; index++) {
        
        let baseStats = PokemonList[i].stats[index].base_stat;
        let statType = PokemonList[i].stats[index].stat.name;
        
        pokeStats.innerHTML += renderPokeStats (baseStats, statType);
    }
}


function renderPokeStats (baseStats, statType) {
    
    return `
        <div class="base-stats-container">
            <div id="poke_stats_type" class="poke_stats_type"><b>${statType}:</b>
            </div>
            <div id="poke_stats_skillbar" class="poke_stats_skillbar">
                <div class="${statType}" style="width:${baseStats}%"> ${baseStats}</div>
        </div>

    `;
} 


function genPokeMovelist(i) {
    let moves = document.getElementById('poke_MoveList');
    moves.innerHTML = ``;

    for (let j=0; j<PokemonList[i].moves.length; j++) {
        
            let movename = PokemonList[i].moves[j].move.name;
            moves.innerHTML += renderPokeMovelist (movename, j);
        
    }
}


function renderPokeMovelist (movename, j){
    return `
    <div class= "poke_move">${j+1}. ${movename}</div>
    `;
}


function arrowLeft(i) {
    if (i <= 0){
        i = PokemonList.length-1;
        openPokemon(i);
      
    } else    
        {
            i--;
            openPokemon(i);
        }
    
}


function arrowRight(i) {
if (i >= PokemonList.length){
    i = 0;
    openPokemon(i);    
  
} else    
    { 
        i++;
        openPokemon(i);
    
}
}


function LoadMorePokemons () {
    LoadMorePokemonsCount += 20;
    loadPokemons();
}


// PokemonList[i].onkeydown = function (event) {
//     switch (event.keyCode) {
//         case 37:
//             arrowLeft(i);
//         case 39:
//             arrowRight(i); 
//     }
// }

// let Keypress = document.getElementById('popUpContainer');

// window.addEventListener('keydown', )

// let KeyPressEvents= PokemonList[{$i}];

document.addEventListener('keydown', (event)=> {       // Definition des Events 'keypress'
    if (event.key == 39) {
        keyboard.KEY_RIGHT = true;
        arrowRight(CurrentGlobalPokemon);
    }

    if (event.key == 37) {
        keyboard.KEY_LEFT = true;
        arrowLeft(CurrentGlobalPokemon);
    }
    console.log(event);                                     //Google suchbefehle: z.B.: "javascript get arrow key pressed", "eventlistener keypress detecting the pressed arrow key geeksforgeeks", "eventlistener press arrow down", "etc."

});



        // <p>HP: ${PokemonList[i]['stats']['0']['base_stat']}</p>
        // <p>Attack: ${PokemonList[i]['stats']['1']['base_stat']}</p>
        // <p>Defense: ${PokemonList[i]['stats']['2']['base_stat']}</p>
        // <p>Special Attack: ${PokemonList[i]['stats']['3']['base_stat']}</p>
        // <p>Special Defense: ${PokemonList[i]['stats']['4']['base_stat']}</p>
        // <p>Speed: ${PokemonList[i]['stats']['5']['base_stat']}</p>


