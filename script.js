const storyData = {
    start: {
        text: "As you explore an ancient ruin, you stumble upon a mysterious portal. What will you do?",
        choices: ["Step through the glowing portal", "Examine the surrounding area"],
        consequence: ["left", "right"],
        image: "crossroads.jpg"
    },
    left: {
        text: "The portal transports you to a lush jungle with a roaring waterfall. How do you proceed?",
        choices: ["Attempt to climb the waterfall", "Search for a safe crossing", "Follow the jungle path"],
        consequence: ["swim", "bridge", "riverbank"],
        image: "river.jpg"
    },
    right: {
        text: "You find an ancient map leading to a legendary artifact. Do you choose to pursue it?",
        choices: ["Follow the map's directions", "Return to the portal"],
        consequence: ["cave", "continue"],
        image: "cave.jpg"
    },
    bridge: {
        text: "You discover a hidden temple across a deep chasm. A fragile rope bridge is the only way across. What's your decision?",
        choices: ["Brave the bridge", "Look for another way"],
        consequence: ["crossBridge", "turnBack"],
        image: "bridge.jpg"
    },
    continue: {
        text: "Returning to the portal, you find yourself in a bustling marketplace of an unknown civilization. How do you interact?",
        choices: ["Approach the locals", "Observe from a distance"],
        consequence: ["village", "camp"],
        image: "village.jpg"
    },
    riverbank: {
        text: "Following the jungle path, you stumble upon ancient ruins. What secrets might they hold?",
        choices: ["Explore the ruins", "Return to the portal"],
        consequence: ["hiddenPath", "start"],
        image: "hidden_path.jpg"
    }
};

const endings = {
    swim: {
        text: "As you climb, you slip on the wet rocks and plummet down the waterfall. Your adventure ends here.",
        image: "ending_drowning.jpg"
    },
    cave: {
        text: "The map leads you to a cursed treasure. As you touch it, you turn to stone. Your quest ends abruptly.",
        image: "ending_dragon.jpg"
    },
    crossBridge: {
        text: "Halfway across, the ancient bridge gives way. You fall into the abyss below. Your journey comes to a sudden end.",
        image: "ending_fall.jpg"
    },
    turnBack: {
        text: "You choose caution and return safely. While uneventful, you live to adventure another day.",
        image: "ending_home.jpg"
    },
    village: {
        text: "The locals welcome you warmly. You become a respected member of their society, starting a new life.",
        image: "ending_village_life.jpg"
    },
    camp: {
        text: "While observing, you witness the arrival of celestial beings. They invite you to join them on an interstellar journey.",
        image: "ending_aliens.jpg"
    },
    hiddenPath: {
        text: "In the ruins, you uncover an artifact of immense power. With it, you reshape the world as you see fit.",
        image: "ending_treasure.jpg"
    },
    continue: {
        text: "Your cautious approach leads to a profound understanding of this new world. You return home, forever changed by the experience.",
        image: "ending_wander.jpg"
    }
};

let currentStage = 'start';

function startGame() {
    currentStage = 'start';
    updatePage();
}

function updatePage() {
    const stage = storyData[currentStage];
    document.getElementById('story').textContent = stage.text;
    
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    stage.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => makeChoice(index));
        choicesDiv.appendChild(button);
    });

    document.getElementById('image-container').innerHTML = `<img src="${stage.image}" alt="Scene">`;
}

function makeChoice(index) {
    currentStage = storyData[currentStage].consequence[index];
    if (endings[currentStage]) {
        endGame();
    } else {
        updatePage();
    }
}

function endGame() {
    const ending = endings[currentStage];
    document.getElementById('story').textContent = ending.text;
    document.getElementById('choices').innerHTML = '';
    document.getElementById('image-container').innerHTML = `<img src="${ending.image}" alt="Ending">`;
}

document.getElementById('restart').addEventListener('click', startGame);

window.onload = startGame;