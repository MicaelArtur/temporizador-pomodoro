let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("curto-timer")
let long = document.getElementById("longo-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("cronometro-curto")
let longBreak = document.getElementById("cronometro-longo")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let timerMsg = document.getElementById("menssagem_timer")
let button = document.querySelector(".button")

//Pega elementos da interface para controlar o DOM (mostrar/ocultar, iniciar contagem etc).

let currentTimer = null

let myInterval = null

function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
}

showDefaultTimer()

function hideAll() {
    timers.forEach((timer) => (
        timer.style.display = "none"
    ))
}
// Ao clicar em um botão, ele ativa o timer correspondente e guarda qual foi selecionado no codigo a baixo.
session.addEventListener("click", () => {
    hideAll()

    pomodoro.style.display = "block"

    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoro
})

shortBreak.addEventListener("click", () => {
    hideAll()

    short.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = short
})

longBreak.addEventListener("click", () => {
    hideAll()

    long.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")

    currentTimer = long
})

// essa parte vai ser feito todo o calculo do sistema do temporizador 
function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval);
      }

      timerDuration = timerDisplay
        .getAttribute("data-duration")
        .split(":")[0];

    let durationinmiliseconds = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationinmiliseconds;

    myInterval = setInterval(function () {
        const timeRemaining = new Date(endTimestamp - Date.now());

        if (timeRemaining <= 0) {
          clearInterval(myInterval);
          timerDisplay.textContent = "00:00";
          const alarm = new Audio(
            "https://www.epidemicsound.com/pt/sound-effects/tracks/2d0ea179-afde-436a-8bee-e03369e53db3/");//O som é para ficar esperto quando acabar kkkkk, mas pod ser alterado
          alarm.play();
        } else {
          const minutes = Math.floor(timeRemaining / 60000);
          const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
          const formattedTime = `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
          timerDisplay.textContent = formattedTime;
        }
      }, 1000);
}

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
        timerMsg.style.display = "none"
    } else {
        timerMsg.style.display = "block"
    }
})

stopBtn.addEventListener("click", () => {
    if(currentTimer) {
        clearInterval(myInterval)
    }
})