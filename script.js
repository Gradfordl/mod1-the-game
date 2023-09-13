//Create Character classes
class Character {
    constructor(name, role, ability,){
        this.name = name;
        this.role = role;
        this.ability = ability;
    }
}
class Villain extends Character {
    constructor(name, role, ability, ) {
        super(name, role, ability)
    }
}
// Create arrays for wizard name generator

let wizSuffix = [" The Almighty", " The Great", " The Magician", " The Wizard", " The Conjurer", " The Magus", " The Powerful"];

//Capture user name and generate random wizard name
let userName = prompt("To get started, please enter your name:")

function genWizName() {
        let rdmLastName = wizSuffix[Math.floor(Math.random() * 7)];
        let wizName = userName + rdmLastName;
        return wizName;
    }
//Create characters
const wizard = new Character (genWizName(), "Professor of the Dark Arts", "dark magic");

const manticore = new Villain ("Mighty Manticore", "Keeper of the Mountains", "will eat you.");

const troll = new Character ("Angry Angus", "Keeper of the Bridge", "fighting");

//define my HTML elements
const containerEl = document.getElementById("container");
const textEl = document.getElementById("text");
const optionBtnEl = document.getElementById("button-container");
const startBtn = document.getElementById("start");
// const itemBtn = document.getElementById("items");
//Start button details
startBtn.addEventListener("click", (evt) => {
    console.log("clicked!");
    containerEl.style.display = "flex";
    optionBtnEl.style.display = "flex";
    startBtn.style.display = "none";
});

function startGame() {
    state = {};
    getText(0);
    containerEl.style.display = "none";
    startBtn.style.display = "flex";
}

function getText(idx) {
    //Pull text from node using node ids as an index
    const textNode = storyNodes.find(textNode => textNode.id === idx)
    // Display storyline text in container
    textEl.textContent = textNode.text
    //Remove option buttons after click
    while (optionBtnEl.firstChild) {
        optionBtnEl.removeChild(optionBtnEl.firstChild);
    }
    textNode.options.forEach( option => {
        if(showOption(option)){
            //Add new option buttons
            const button = document.createElement("button");
            //Add node specific option text to buttons
            button.textContent = option.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectOption(option));
            optionBtnEl.append(button);
        }
    })
}

// Determine which options to show to the player. If no conditions required or if required condition is met, show option.
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// //Convert satchel object into array to display in DOM
// const satchelStatus = Object.values(state);

// let satchel = document.getElementById("satchel-state");
// //Loop through array to display each satchel item in DOM element
// satchelStatus.forEach((item) => {
//     let li = document.createElement("li");
//     li.innerText = item;
//     satchel.appendChild(li);
// })
//Generate nextText based on which option is selected
function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    getText(nextTextNodeId);
}

//Story line objects
const storyNodes = [
        { //INTRO
        id: 0, 
        text: `Welcome to Wizard Quest! You are ${wizard.name}, and today you set off on a quest with a myriad of choices that will ultimately determine your fate.  Are you ready to begin?`,
        options: [
            {
                text: "Lets Get It!",
                setState: {},
                nextText: 1
            }
        ]
    },
    {
        id: 1,
        text:`${wizard.name}, which path will you choose?`,
        options: [
            {
                text: "Take the Mountain Path",
                setState: {},
                nextText:2
            },
            {
                text: "Take the Forest Path",
                setState: {},
                nextText:3,
            }
        ]
    },
    {
        //Mountain path Manticore encounter options
        id: 2,
        text: `You set off on the mountain path and encounter some Finicky Fir trees. Everyone knows you need that wood to produce fire hot enough for potion making. You collect a few bundles and head up the mountain. While climbing that rocky path realize those old wizard knees arent what they used to be! You lean against a moss-covered rock to catch your breath. After a couple of minutes you start to feel like you're being watched. You look around, but see nothing. Right as you begin to set back off on your trek out hops a mighty Manticore! Enraged that you have invaded his space, you have to battle it to continue.`,
        options: [
            { 
                text: `Battle the ${manticore.name}`,
                setState: {wood: true },
                nextText:4.5,
            },
            {
                text: "Flee",
                nextText: 12
            },
            {
                text: "Restart",
                nextText: 0
            }
        ],
    },
    {
        // Forest Path-- Leprechaun encounter options
        id: 3,
        text: `You've taken the forest path. It's a beautiful sunny day. The sun peeking through the leaves warms your skin. You are collecting herbs and you catch a glimpse of something shiny out your peripheral. As you move towards the gleam out hops a friendly Leprechaun! He offers you a gold coin for treating the forest with such care.`,
        options: [
            {
                text: "Accept gold coin",
                setState: {goldCoin: true, herbs: true },
                nextText: 4
            },
            {
                text: "Decline offering",
                setState: {goldCoin: false, herbs: true },
                nextText: 4
            },
            {
                text: "Restart",
                nextText: 0
            }
        ]
    },
      {
        id:4.5, 
        text: `${wizard.name}... Your name will go down in history as the great wizard who defeated the frenzied Manticore who stalked these mountains. You have received a Red Jewel as trophy of your accomplishments.`,
        options: [
            {
                text: "Accept Jewel",
                setState: {redJewel: true},
                nextText: 4
            }
        ]
    },
    { // Drawbridge - Encounter Troll options
        id:4, 
        text:`You continue your quest and come across a body of water far too wide for your magic to carry you. You spot a drawbridge in the distance and make your way there. You're encountered by a grumpy old troll demanding one gold coin as payment. If you haven't collected any coins thus far, you must battle ${troll.name} If you win, you may cross.`,
        options: [
            {//pay troll
                text: `Pay toll`,
                requiredState: (currentState) => currentState.goldCoin,
                setState: {goldCoin: false },
                nextText: 8
            },
            {//Fight troll and die
                text: "Fight Troll",
                nextText: 11
            },
            { // direct you to river path
                text: "Find another way",
                nextText: 5,
            },
            {
                text: "Restart",
                nextText: 0
            }
        ]
    },
     { // River path choices - water fairy encounter
        id: 5, 
        text:"You couldn't pay the toll so you're back at the water's edge weighing your options. If you have some wood you could probably fashion yourself a magical paddleboard and cross the river. While collecting dew drops for your potion-making you spot a water fairy fluttering about and think to yourself 'maybe she can help me out'. You explain to her your dilemma and she says she can ferry you in exchange for a goodie out of your satchel.",
        options: [
            {
                text: "Magical paddleboard",
                requiredState: (currentState) => currentState.wood,
                setState: { dewDrops: true, wood: false },
                nextText: 6
            },
            {
                text: "Fairy Ferry",
                setState: {dewDrops: true} && {wood: false} || {herbs: false},
                nextText: 7
            },
            {
                text: "Restart",
                nextText: 0
            }
        ]
    },
     { // decline fairy, build paddleboard, meet elf
        id:6, 
        text: "You build yourself a magical paddleboard and made your way across the river! After trekking for a couple of miles, you encounter an elf. You two begin to chat and the elf offers you the secrets of the land in exchange for one of your satchel items. ",
        options: [
            {
                text: "Give me the secrets!",
                setState: {dewDrops: false},
                nextText: 9
            },
            {
                text: "No way",
                nextText: 10
            },
            {
                text: "Restart",
                nextText: 0
            }
        ]
    },
    { // Fairy ferry ending, meet elf
        id:7, 
        text: `"Goodbye ${wizard.name}! I'll never forget you!" The fairy exclaims after she drops you off on the other side of the river. You try your best to brush the remnants of fairy dust off your garments but it's no use. You keep moving forward.`,
        options: [
            {
                text: "Where am I anyway?",
                nextText: 8
            },
            {
                text: "Restart",
                nextText: 0
            }
        ]
    },
    {
            id: 8, 
            text: "After trekking for what seems like hours, you encounter an elf. You two begin to chat and the elf offers you the secrets of the land in exchange for one of your satchel items. ",
            options: [
                {
                    text: "Give me the secrets!",
                    setState: {dewDrops: false},
                    nextText: 9
                },
                {
                    text: "No way",
                    nextText: 10
                },
                {
                    text: "Restart",
                    nextText: 0
                }
            ]
        },
         {
        id:9, 
        text: "You've been given direction to a magical portal. Upon entering, you find a hidden wizard community. There are wizards from all over practicing magic, learning, collaborating and advancing magic for the greater good. Todays quest has come to an end.",
        options: [
            {
                text: "That was fun",
                nextText: 0
            }
        ]
    },
     {
        id:10, 
        text: "'I tried...' the elf mutters as he wanders off without so much as a look back. You continue your trek. Before you know it night has fallen. You are surrounded by death eaters and, yeah. I think you know the rest.",
        options: [
            {
                text: "Restart",
                nextText: 0
            }
        ]
    },
    {
            id:11, 
            text: "You are bludgeoned to death as soon as you raise your wand toward the troll.",
            options: [
                {
                    text: "Restart",
                    nextText: 0
                }
            ]
        },
        {
                id:12, 
                text: "You try to flee and are maimed from the rear. Did you actually think you could outrun a Man-Lion-Scorpion? With those knees? ",
                options: [
                    {
                        text: "Restart",
                        nextText: 0
                    }
                ]
            }
    // {
    //     id:, 
    //     text:,
    //     options: []
    // }
]

startGame();