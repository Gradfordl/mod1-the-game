

const textEl = document.getElementById("text");
const optionBtnEl = document.getElementById("button-container");

//CHANGE STATE TO SATCHEL. MAKE ARRAY OF ITEMS
// let satchel = [];
// satchel.push("gold-coin")

function startGame() {
    state = {};
    getText(1);
}
function getText(idx) {
    const textNode = storyNodes.find(textNode => textNode.id === idx)
    textEl.textContent = textNode.text
    while (optionBtnEl.firstChild) {
        optionBtnEl.removeChild(optionBtnEl.firstChild);
    }
    textNode.options.forEach( option => {
        if(showOption(option)){
            const button = document.createElement("button");
            button.textContent = option.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectOption(option));
            optionBtnEl.appendChild(button);
        }
    })
}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state = Object.assign(state, option.setState);
    getText(nextTextNodeId);
}

const storyNodes = [
    {
        id: 1,
        text:"Hello wizard! Are you ready to set off on your quest?",
        options: [
            {
                text: "Mountain Path",
                nextText:2
            },
            {
                text: "Forest Path",
                nextText:3,
            }
        ]
    },
    {
        //Mountain path Manticore encounter options
        id: 2,
        text: `While climbing the rocky path realize those old wizard knees arent what they used to be! You lean against a moss-covered rock to catch your breath. After a couple of minutes you begin to feel you're being watched. You look around, but see nothing. Right as you begin to set back off on your trek out hops a mighty Manticore! Enraged that you have invaded his space, you have to battle it to continue.`,
        options: [
            {
                text: `Battle the manticore`,
                setState: { redJewel: true, wood: true },
                nextText:4,
            },
            {
                text: "Run away",
                // WHAT HAPPENS WHEN YOU RUN AWAY?????
            },
            {
                text: "Restart",
                nextText: 1
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
                nextText: 4
            },
            {
                text: "Restart",
                nextText: 1
            }
        ]
    },
    { // Drawbridge - Encounter Troll options
        id:4, 
        text:"You continue your quest and come across a body of water far too deep for your magic to carry you over. You spot a drawbridge in the distance and make your way there. You're encountered by a grumpy old troll demanding one gold coin as payment.",
        options: [
            {//pay troll
                text: `Pay toll`,
                requiredState: (currentState) => currentState.goldCoin,
                setState: {goldCoin: false },
                nextText: 6
            },
            { // direct you to river path
                text: "Find another way",
                nextText: 5,
            },
            {
                text: "Restart",
                nextText: 1
            }
        ]
    },
     {
        id: 5, 
        text:"You couldn't pay the toll so you're back at the water's edge weighing your options. If you had the necessary materials you could probably fashion yourself a magical paddleboard and cross the river. You spot a water fairy fluttering about and think to yourself 'maybe she can help me out'. You explain to her your dilemma and she says she can ferry you in exchange for a goodie out of your satchel.",
        options: [
            {
                text: "Magical paddleboard",
                requiredState: (currentState) => currentState.wood,
                setState: { wood: false },
                nextText: 6
            },
            {
                text: "Fairy Ferry",
                setState: {herbs: false},
                nextText: 7
            },
            {
                text: "Restart",
                nextText: 1
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