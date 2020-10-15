var equipment1 = localStorage.getItem('equipment1');
var equipment2 = localStorage.getItem('equipment2');
var weapon = localStorage.getItem('weapon');
var secondsLeft = parseInt(localStorage.getItem("secondsLeft"));

var causeOfDeath = "alive";
var playerHealth = 100;
var dogHealth = 100;
var musicOn = 0;
var playerHealthDisplay = document.getElementById('playerHealthBar');
var dogHealthDisplay = document.getElementById('dogHealthBar');
var lastAttackDamageNumber = document.getElementById('lastAttackDamage');
var lastAttackRecipient = document.getElementById('recipient');

var timerShouldStop = false;
var damageDealt = 0;
var damageTaken = 0;
var bandagesUsed = false;

function fillName() {
  var spyName = localStorage.getItem("name");
  document.getElementById("printName").innerHTML = spyName;
  document.getElementById("printName2").innerHTML = spyName;
}

function cutFence() {
  if (equipment1 == "Wire Cutters" || equipment2 == "Wire Cutters") {
    document.getElementById('fenceSoundEffect').play();
    document.getElementById('fenceChoice').style.display = 'block';
    document.getElementById('main').style.display = 'none';

  } else {
    fightDog();
  }
}

function hideDog() {
  document.getElementById('attack').style.display = 'none';
}
function showDog() {
  document.getElementById('attack').style.display = 'block';
}

// method to move dog button randomly around the screen, used onhover
function moveDog() {
  var dog = document.getElementById('attack');
  var x = Math.floor(Math.random()*97);
  var y = Math.floor(Math.random()*97);
  dog.style.top = x + '%';
  dog.style.left = y + '%';
  dog.style.transition = '1s';  //code to adjust speed that dog moves away
}


function fightDog() {
  startTimer();
  startTimerDisplay();
  showDog();
  showHealthBars();
  document.getElementById('dogChoice').style.display = 'block';
  document.getElementById('main').style.display = 'none';
}

function inflictDamageToPlayer() {
  damageNumber = Math.floor(Math.random() * 20) + 5;

  if ((playerHealth - damageNumber) <= 0) {
    damageTaken += damageNumber;
    localStorage.setItem('damageDealt', damageDealt);
    localStorage.setItem('damageTaken', damageTaken);
    causeOfDeath = "Dog alerted the Guards";
    localStorage.setItem("causeOfDeath", causeOfDeath);

    playerHealthValue.style.width = 0;
    document.getElementById('dogIntro').style.display = 'none';
    document.getElementById('attack').style.display = 'none';
    document.getElementById('lostFight').style.display = 'block';

  } else {
    document.getElementById('dogBarkSoundEffect').play();
    playerHealth -= damageNumber;
    damageTaken += damageNumber;

    playerHealthValue.style.width =  playerHealth + "%";
    playerHealthLabel.innerHTML =  playerHealth + "%";
    recipient.innerHTML = "You";
    lastAttackDamage.innerHTML = damageNumber + " points of";

  }
}

function inflictDamageToDog() {
  document.getElementById('lastAttack').style.display = 'inline-block';
  damageNumber = Math.floor(Math.random() * 40) + 20;

  if ((dogHealth - damageNumber) <= 0) {
    document.getElementById('attackSoundEffect').play();
    damageDealt += damageNumber;

    dogHealthValue.style.width = 0;
    dogHealthLabel.innerHTML = "DEAD";
    document.getElementById('dogIntro').style.display = 'none';
    document.getElementById('attack').style.display = 'none';
    document.getElementById('lastAttack').style.display = 'none';
    document.getElementById('wonFight').style.display = 'block';

    timeDisappear();
    stopTimer();

  } else {
    document.getElementById('attackSoundEffect').play();
    dogHealth -= damageNumber;
    damageDealt += damageNumber;

    dogHealthValue.style.width =  dogHealth + "%";
    dogHealthLabel.innerHTML = dogHealth + "%";
    recipient.innerHTML = "The Dog";
    lastAttackDamage.innerHTML = damageNumber + " points of";
    setTimeout(inflictDamageToPlayer, 2000);
  }
}

function playMusic() {
  music = document.getElementById('dogmusic');
  music.play();
  if (musicOn == 0) {

    music.volume = 0.05;
    musicOn = 1;
    document.getElementById("musicbtn").innerHTML = "Music: On";
  }

  else if (musicOn == 1) {
    music.volume = 0.0;
    musicOn = 0;
    document.getElementById("musicbtn").innerHTML = "Music: Off";
    }

}

function setSoundEffect() {
  var audioTag = document.getElementById('attackSoundEffect');
  if (weapon == "Pistol") {
    audioTag.src = "audio/gun_silencer.mp3";
  }
  else if (weapon == "Baton") {
    audioTag.src = "audio/baton_impact.mp3";
  }
  else {
    audioTag.src = "audio/knife_slash.wav";
  }

}

function disableAttackButton() {
  document.getElementById('attack').disabled = true;
  setTimeout(enableAttackButton, 2000);
}

function enableAttackButton() {
  document.getElementById('attack').disabled = false;
}

function showHealthBars() {
  //put a delay in here. could fade into view
  document.getElementById('dogCol1').style.visibility = "visible";
  document.getElementById('dogCol2').style.visibility = "visible";
}

function showHelp() {
  var help = document.getElementById("hidden");
  help.style.display = "block";
}

function hideHelp() {
  var help = document.getElementById("hidden");
  help.style.display = "none";
}

function nextPage(){
  localStorage.setItem('damageTaken', damageTaken);
  localStorage.setItem('playerHealth', playerHealth);
  localStorage.setItem('secondsLeft', secondsLeft);
  localStorage.setItem('damageDealt', damageDealt);
  localStorage.setItem('causeOfDeath', causeOfDeath);

  window.location = '../alarmDefusal/alarm.html';
}

function nextPageLoss() {
  localStorage.setItem('secondsLeft', secondsLeft);
  localStorage.setItem('damageDealt', damageDealt);
  localStorage.setItem('damageTaken', damageTaken);
  localStorage.setItem('causeOfDeath', causeOfDeath);

  window.location = '../gameStatistics/statisticsScreen.html';
}

function timeDisappear() {
 document.getElementById("timerDisplay").classList.add('dissapear');
}

function startTimer() {
    var sec = 60;
    var timer = setInterval(function(){
        sec--;
        if (timerShouldStop) {
          clearInterval(timer);
        }
        else if (sec < 0) {
            clearInterval(timer);
            causeOfDeath = "Dog alerted the Guards";
            localStorage.setItem("causeOfDeath", causeOfDeath);

            playerHealth = 0;
            playerHealthValue.style.width =  playerHealth + "%";
            playerHealthLabel.innerHTML =  playerHealth + "%";
            document.getElementById('dogIntro').style.display = 'none';
            document.getElementById('attack').style.display = 'none';
            document.getElementById('lastAttack').style.display = 'none';
            document.getElementById('lostFight').style.display = 'block';
        }
    }, 1000);
}

function stopTimer() {
  timerShouldStop = true;
}

function fillInventory() {
  if (equipment1 == "Bandages" || equipment2 == "Bandages") {
    document.getElementById('useBandageButton').style.display = 'block';
  }
  document.getElementById('userWeapon').innerHTML = weapon;
  document.getElementById('userEquipment1').innerHTML = equipment1;
  document.getElementById('userEquipment2').innerHTML = equipment2;
}

function showInventory() {
  document.getElementById('inventorySection').style.display = 'block';
}

function hideInventory() {
  document.getElementById('inventorySection').style.display = 'none';
}

function useBandages() {
  if (!bandagesUsed) {
    if (playerHealth <= 80) {
      playerHealth = playerHealth + 20;
    }
    else {
      playerHealth = 100;
    }
    bandagesUsed = true;
    document.getElementById('useBandageButton').style.display = 'none';
    playerHealthValue.style.width =  playerHealth + "%";
    playerHealthLabel.innerHTML =  playerHealth + "%";
  }
}

function easyRead() {
 // Get the checkbox
  var checkBox = document.getElementById("easyReadCheckbox");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    document.body.style.backgroundImage = "url('../whiteBackgroundImage/whitebackground.jpg')";
    document.body.style.fontSize = '150%';
    document.getElementById("centreBox").style.marginTop = "-15%";
  } else {
    document.body.style.backgroundImage = null;
    document.body.style.backgroundImage = "url('images/dog.jpg')";
    document.body.style.fontSize = '100%';
    document.getElementById("centreBox").style.marginTop = "-10%";
  }
}

function myTimer() {
    setInterval(decreaseSeconds, 1000);
}

function decreaseSeconds() {
  if (secondsLeft > 0) {
    secondsLeft = secondsLeft - 1;
  }
  else {
    localStorage.setItem('secondsLeft', secondsLeft);
    localStorage.setItem('damageDealt', damageDealt);
    localStorage.setItem('damageTaken', damageTaken);
    causeOfDeath = "Poor Time Management";
    localStorage.setItem('causeOfDeath', causeOfDeath);
    window.location = "../gameStatistics/statisticsScreen.html";
  }
}
