let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    // wir übergeben Variablen (canvas, keyboard) an unsere Welt
                                                             // character.src = '../img/2_character_pepe/2_walk/W-21.png';    mit ../ greifen wir in der Verzeichnishirarchie auf den übergeordneten Ordner zu. So gehen wir eine Verzeichnisebene höher.
    // console.log('My Character is', world['character']);
    // console.log('My Character is', world['backgroundObjects']);
}

window.addEventListener('keydown', (event) => {       // Definition des Events 'keypress'
    if (event.keyCode == 39) {
        keyboard.KEY_RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.KEY_LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.KEY_UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.KEY_DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.KEY_SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.KEY_D = true;
    }
    console.log(event);                                     //Google suchbefehle: z.B.: "javascript get arrow key pressed", "eventlistener keypress detecting the pressed arrow key geeksforgeeks", "eventlistener press arrow down", "etc."
});