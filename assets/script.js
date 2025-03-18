// Countdown logic example
console.log("Script loaded");

const countdown = () => {
    console.log("inside countdown");
    const targetDate = new Date(2025, 3, 1, 0, 0, 0, 0).getTime(); // April 1st, 2025 ms
    const currentDate = new Date().getTime(); //ms

    const timeLeft = targetDate - currentDate; //ms

    if (timeLeft < 0) {
        document.getElementById("countdown").innerHTML = "WE ARE GOING TO BARCELONA!!";
        return;
    }

    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    timeLeft %= (1000 * 60 * 60 * 24);
    var hours = Math.floor(timeLeft / (1000 * 60 * 60));
    timeLeft %= (1000 * 60 * 60);
    var minutes = Math.floor(timeLeft / (1000 * 60));
    timeLeft %= (1000 * 60);
    var seconds = Math.floor(timeLeft / (1000));

    var countdownString = `${days} : ${hours} : ${minutes} : ${seconds}`;

    document.getElementById("countdown").innerHTML = countdownString;

}
countdown();
setInterval(countdown, 500);