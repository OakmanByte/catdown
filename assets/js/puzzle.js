
window.onload = () => {
    // Create an Image instance
    const flag = new Image();
    // Set the image source
    flag.src = './assets/images/spain_flag.png';
    // When the image is loaded, initialize the puzzle
    flag.onload = () => {
        const canvas = new headbreaker.Canvas('puzzle-container', {
            width: 800, height: 650,
            image: flag,
            preventOffstageDrag: true,
            fixed: true,
            width: 800, height: 650,
            pieceSize: 70, proximity: 10,
            borderFill: 10, strokeWidth: 2,
            lineSoftness: 0.12,
        });
        canvas.adjustImagesToPuzzleHeight();
        canvas.autogenerate({
            horizontalPiecesCount: 8,
            verticalPiecesCount: 6
        });
        canvas.shuffle(0.7);
        canvas.draw();
        canvas.attachSolvedValidator();
        canvas.onValid(() => {
            console.log("in here");
        });

        document.getElementById("solve-button").addEventListener("click", () => {
            canvas.solve();
            canvas.redraw();
        });
    };
};