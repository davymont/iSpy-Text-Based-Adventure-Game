var damageDealt = parseInt(localStorage.getItem('damageDealt'));
var damageTaken = parseInt(localStorage.getItem('damageTaken'));
var causeOfDeath = localStorage.getItem("causeOfDeath");
var secondsLeft = parseInt(localStorage.getItem("secondsLeft"));

var timeLeft = 300 - secondsLeft;

var musicOn = 0;

function loadStatistics() {
  if (causeOfDeath == "alive") {
    document.getElementById('lostOrWon').innerHTML = "You Escaped!";
  }
  else {
    document.getElementById('lostOrWon').innerHTML = "You Died...";
    document.getElementById('deathP').style.display = 'block';
  }

  document.getElementById('damageReceived').innerHTML = damageTaken;
  document.getElementById('damageGiven').innerHTML = damageDealt;
  document.getElementById('timeElapsed').innerHTML = timeLeft;
  document.getElementById('causeOfDeath').innerHTML = causeOfDeath;
}

function playMusic() {
  if (causeOfDeath == "alive") {
    music = document.getElementById('victorymusic');
  }
  else {
    music = document.getElementById('lossmusic');
  }

  music.play();
  if (musicOn == 0) {

    music.volume = 0.2;
    musicOn = 1;
    document.getElementById("musicbtn").innerHTML = "Music: On";
  }

  else if (musicOn == 1) {
    music.volume = 0.0;
    musicOn = 0;
    document.getElementById("musicbtn").innerHTML = "Music: Off";
    }

}
