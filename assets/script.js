// Countdown logic example
console.log("Script loaded");

const countdown = () => {
    console.log("inside countdown");
    const targetDate = new Date(2025, 3, 1, 0, 0, 0, 0).getTime(); // April 1st, 2025 ms
    const currentDate = new Date().getTime(); //ms

    let timeLeft = targetDate - currentDate; //ms

    if (timeLeft < 0) {
        document.getElementById("countdown").innerHTML = "WE ARE GOING TO BARCELONA!!";
        return;
    }

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    timeLeft %= (1000 * 60 * 60 * 24);
    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    timeLeft %= (1000 * 60 * 60);
    let minutes = Math.floor(timeLeft / (1000 * 60));
    timeLeft %= (1000 * 60);
    let seconds = Math.floor(timeLeft / (1000));

    let countdownString = `${days} : ${hours} : ${minutes} : ${seconds}`;

    document.getElementById("countdown").innerHTML = countdownString;

}
countdown();
setInterval(countdown, 500);