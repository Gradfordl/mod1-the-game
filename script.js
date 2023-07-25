// Creating classes and objects
class Character {
    constructor(health, attack){
        this.health = health;
        this.attack = attack;
    } 
}

//added accuracy properties to the characters with battling ability

const wizard = new Character (50,5);
    wizard.accuracy = .6;
    wizard.satchel = [];
const manticore = new Character(55, 4);
    manticore.accuracy = .5;
const troll = new Character(55, 4);
    troll.accuracy = .7;
const leprechaun = new Character(30, 2.5);
const elf = new Character(25, 3);
const fairy = new Character(25, 3);


console.log(startGame());