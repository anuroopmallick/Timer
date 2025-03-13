const timerInput = document.querySelector("#timer_container");
const hrsInput = document.querySelector("#hrs");
const minsInput = document.querySelector("#min");
const secsInput = document.querySelector("#sec");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");

// Convert out input into seconds
// timerInput
// 1. our input should not take more than 2 digit input
// 2. adjust the timer before starting
// start btn -> pause btn -> start

let timerId;

startBtn.addEventListener("click", function (event) {
  let hrs = hrsInput.value || 0;
  let mins = minsInput.value || 0;
  let secs = secsInput.value || 0;

  // Convert to numbers and ensure valid values
  hrs = Math.min(Math.max(parseInt(hrs) || 0, 0), 99);
  mins = Math.min(Math.max(parseInt(mins) || 0, 0), 59);
  secs = Math.min(Math.max(parseInt(secs) || 0, 0), 59);

  console.log(hrs, mins, secs);

  let timeInSeconds = timeInseconds(hrs, mins, secs);
  console.log(timeInSeconds);

  if (startBtn.innerText == "Start") {
    timer(timeInSeconds);
    startBtn.innerText = "Pause";
  } else if (startBtn.innerText == "Pause") {
    clearInterval(timerId);
    startBtn.innerText = "Start";
  }
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerId);
  hrsInput.value = 0;
  minsInput.value = 0;
  secsInput.value = 0;
});

function timer(timeInSeconds) {
  displayTime(timeInSeconds);
  if (timeInSeconds == 0) return;
  timerId = setInterval(function () {
    timeInSeconds--;
    displayTime(timeInSeconds);
    if (timeInSeconds == 0) clearInterval(timerId);
  }, 1000);
}

function displayTime(timeInSeconds) {
  let hrs = parseInt(timeInSeconds / 3600);
  let remainingMins = parseInt(timeInSeconds % 3600);
  let mins = parseInt(remainingMins / 60);
  let secs = parseInt(remainingMins % 60);

  hrsInput.value = hrs;
  minsInput.value = mins;
  secsInput.value = secs;
}

function timeInseconds(hrs, mins, secs) {
  return parseInt(hrs) * 3600 + parseInt(mins) * 60 + secs;
}
