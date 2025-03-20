const levels = [];
const numOfLevels = 5;
let currentLevel = 0;
let canvas;

// Helper function to initialize the canvas
function initializeCanvas(image) {
    canvas = new headbreaker.Canvas('puzzle-container', {
        width: 800,
        height: 650,
        image: image,
        preventOffstageDrag: true,
        fixed: false,
        pieceSize: 70,
        proximity: 10,
        borderFill: 10,
        strokeWidth: 2,
        lineSoftness: 0.12,
    });
    canvas.adjustImagesToPuzzleHeight();
    canvas.autogenerate({
        horizontalPiecesCount: 6,
        verticalPiecesCount: 6,
    });
    canvas.shuffle(0.7);
    canvas.draw();
    canvas.attachSolvedValidator();
    canvas.onValid(async () => {
        if (currentLevel + 1 < numOfLevels) {
            levels[currentLevel + 1].setUnlocked();
        } else {
            console.log("YOU WON!");
            startFireworks(); // Start fireworks after the game is won
        }
    });
}

function loadCurrentLevel() {
    const level = levels[currentLevel];

    // Clear any existing canvas or container content
    if (canvas) {
        canvas.clear();
    }
    const puzzleContainer = document.getElementById('puzzle-container');
    if (puzzleContainer) {
        puzzleContainer.innerHTML = '';
    }

    // If the image is already loaded, initialize immediately; otherwise, wait for onload.
    if (level.image.complete) {
        initializeCanvas(level.image);
    } else {
        level.image.onload = () => {
            initializeCanvas(level.image);
        };
    }

    // Update the button styles to highlight the current level
    updateButtonStyles();
}

function updateButtonStyles() {
    levels.forEach((level, index) => {
        const button = document.getElementById(level.elementId);
        if (button) {
            if (index === currentLevel) {
                // Apply the 'active' class to the current level button
                button.classList.add('active');
            } else {
                // Remove the 'active' class from other buttons
                button.classList.remove('active');
            }
        }
    });
}


class Level {
    constructor(index, name, image, elementId, unlocked) {
        this.index = index;
        this.name = name;
        this.image = image;
        this.elementId = elementId;
        this.unlocked = unlocked;
    }

    initButton() {
        const button = document.getElementById(this.elementId);
        // Check if the button was previously unlocked (if you want to persist state)
        const isUnlocked = localStorage.getItem(this.elementId);
        if (isUnlocked) {
            this.setUnlocked();
        }
        if (button) {
            button.addEventListener("click", () => {
                console.log(`Loading level: ${this.name}`);
                currentLevel = this.index; // set the current level to this one
                loadCurrentLevel();
            });
        } else {
            console.warn(`Button with id ${this.elementId} not found.`);
        }
    }

    setUnlocked() {
        const button = document.getElementById(this.elementId);
        if (button) {
            button.disabled = false;
            // Save state in localStorage if you want to persist unlocked state across reloads.
            localStorage.setItem(this.elementId, 'unlocked');
        }
    }
}

function setupLevelButtons() {
    const buttonBox = document.getElementById('level-button-box'); // Assuming you have a div with this id

    for (let i = 0; i < numOfLevels; i++) {
        const name = `level${i}`;
        const image = new Image();
        image.src = `assets/images/level${i}.png`;
        const elementId = `level${i}-button`;

        // Create the button dynamically
        const button = document.createElement('button');
        button.id = elementId;
        button.className = 'level-button';
        button.textContent = `Level ${i + 1}`;

        // Disable buttons except the first one (or based on state)
        if (i > currentLevel) {
            button.disabled = true;
        }

        // Append the button to the container
        buttonBox.appendChild(button);

        // Create a new level instance
        const level = new Level(i, name, image, elementId, false);
        levels.push(level);
        level.initButton();
    }
}

window.onload = () => {
    setupLevelButtons();
    loadCurrentLevel(); // Load the initial level
};

// Function to start the fireworks after winning
function startFireworks() {
    const container = document.getElementById('winning-screen');
    container.hidden = false;
    let fireworks = new Fireworks.default(container, {
        autoresize: true,
        boundaries: {
            width: container.clientWidth,
            height: container.clientHeight,
            intensity: 60,
        },
    });
    fireworks.start();
    setTimeout(() => { fireworks.stop() }, 20000)
}

// Play sound for Otis when clicked
document.getElementById('otis').addEventListener('click', () => {
    const otisSound = document.getElementById('otis-sound');

    // Reset the sound if it's already playing
    if (otisSound.paused) {
        otisSound.play();
    }
});

// Play sound for Eira when clicked
document.getElementById('eira').addEventListener('click', () => {
    const eiraSound = document.getElementById('eira-sound');

    // Reset the sound if it's already playing
    if (eiraSound.paused) {
        eiraSound.play();
    }
});