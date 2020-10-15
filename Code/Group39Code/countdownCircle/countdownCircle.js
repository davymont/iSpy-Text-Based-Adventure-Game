//constant for radius of circle
const FULL_DASH_ARRAY = 283;

//time that colour of circle changes
const WARNING_THRESHOLD = 15;
const ALERT_THRESHOLD = 5;

//colour for the foreground colour circle as time runs out
const COLOR_CODES = {
  initial: {
    color: "white"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

//the time limit to display on the timer
const TIME_LIMIT = 60;

let timePassed = 0;
let timeLeft = TIME_LIMIT;
var timerInterval = null;
//set initial colour of foreground circle
let remainingPathColor = COLOR_CODES.initial.color;

//insert timer into document
document.getElementById("timerDisplay").innerHTML = `
<div class="backgroundCircle">
  <svg class="backgroundCircleSvg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="foregroundCircle">
      <circle class="foregroundElapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="foregroundRemaining"
        stroke-dasharray="283"
        class="foregroundRemaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="textId" class="text">${formatTime(
    timeLeft
  )}</span>
</div>

`;

//actions called when timer reaches 0
function timesUp() {
  clearInterval(timerInterval);
  document.getElementById("timerDisplay").classList.add('shrink');
}

//initiate timer
function startTimerDisplay() {
  timerInterval = setInterval( function() {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("textId").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      timesUp();
    }
  }, 1000);
}

//format time to min:sec
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

//set foreground circle colour and make text pop when thresholds reached
function setRemainingPathColor(timeLeft) {
  const { alert, warning, initial } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document.getElementById("foregroundRemaining").classList.remove(warning.color);
    document.getElementById("foregroundRemaining").classList.add(alert.color);
    document.getElementById("textId").classList.remove('textPop');
    document.getElementById("textId").classList.add('textPop2');
  }
  else if (timeLeft <= warning.threshold)
  {
    document.getElementById("foregroundRemaining").classList.remove(initial.color);
    document.getElementById("foregroundRemaining").classList.add(warning.color);
    document.getElementById("textId").classList.remove('text');
    document.getElementById("textId").classList.add('textPop');
  }
}

//calculate time fraction for circle
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

//set foreground circle by fraction
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("foregroundRemaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

//doesn't work
/*function stopTimerDisplay() {
  clearInterval(timerInterval);
  timeLeft = 0;
  setCircleDasharray();
  setRemainingPathColor(timeLeft);
}*/
