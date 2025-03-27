let canvas;

// Helper function to initialize the canvas
function initializeCanvas(image) {
    const puzzleContainer = document.getElementById('puzzle-container');

    // Get the actual dimensions of the puzzle container
    const containerWidth = puzzleContainer.clientWidth;
    const containerHeight = puzzleContainer.clientHeight;

    canvas = new headbreaker.Canvas('puzzle-container', {
        width: containerWidth,    // Set width to match the container's width
        height: containerHeight,  // Set height to match the container's height
        image: image,
        preventOffstageDrag: true,
        fixed: false,
        pieceSize: 60,
        proximity: 10,
        borderFill: 10,
        strokeWidth: 2,
        lineSoftness: 0.12,
    });
    canvas.adjustImagesToPuzzleHeight();
    canvas.autogenerate({
        horizontalPiecesCount: 24,
        verticalPiecesCount: 18,
    });
    canvas.shuffle(0.7);
    canvas.draw();
    canvas.attachSolvedValidator();
    canvas.onValid(async () => {
        console.log("YOU WON!");
        startFireworks(); // Start fireworks after the game is won
    });
}

function loadLevel() {
    const image = new Image();
    image.src = 'assets/images/level.png'; // Load single level image
    image.onload = () => {
        initializeCanvas(image);
    };

    // Clear any existing canvas or container content
    if (canvas) {
        canvas.clear();
    }
    const puzzleContainer = document.getElementById('puzzle-container');
    if (puzzleContainer) {
        puzzleContainer.innerHTML = '';
    }
}

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
    setTimeout(() => { fireworks.stop(); }, 20000);
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

window.onload = () => {
    loadLevel(); // Load the single level on page load
};
