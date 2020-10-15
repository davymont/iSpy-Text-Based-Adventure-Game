var weapon = localStorage.getItem("weapon");
var equipment1 = localStorage.getItem("equipment1");
var equipment2 = localStorage.getItem("equipment2");
var playerHealth = parseInt(localStorage.getItem("playerHealth"));
var causeOfDeath = localStorage.getItem("causeOfDeath");
var secondsLeft = parseInt(localStorage.getItem("secondsLeft"));

var hasStun = false;

var enemyHealth = 100;
var bandagesUsed = false;

var damageDealt = parseInt(localStorage.getItem('damageDealt'));
var damageTaken = parseInt(localStorage.getItem('damageTaken'));

var reactionTimer;
var timeToReact = 800;

var musicOn = 0;

function fillHealthBar() {
  document.getElementById('playerHealthValue').style.width = playerHealth + "%";
}

function fillInventory() {
  if (equipment1 == "Bandages" || equipment2 == "Bandages") {
    document.getElementById('useBandageButton').style.display = 'block';
  }
  document.getElementById('userWeapon').innerHTML = weapon;
  document.getElementById('userEquipment1').innerHTML = equipment1;
  document.getElementById('userEquipment2').innerHTML = equipment2;
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
    playerHealthLabel.innerHTML = playerHealth + "%";
  }
}

function fillName() {
  var spyName = localStorage.getItem("name");
  document.getElementById("printName").innerHTML = spyName;
}

function stunOption() {
  if (equipment1 == "Stun Grenade" || equipment2 == "Stun Grenade") {
    hasStun = true;
  }
  startFight();
}

function playMusic() {
  music = document.getElementById('bossmusic');
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

function startFight() {
  if (hasStun) {
    timeToReact = 1500;
    document.getElementById('stunInfo').style.display = 'block';
  }

  document.getElementById('main').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('playerHealthLabel').innerHTML = playerHealth + "%";
  document.getElementById('healthBar').style.display = 'none';
  document.getElementById('attack').style.display = 'block';
}

function damageToPlayer() {
  var random = Math.floor(Math.random()*3) + 1;

  if (random == 1) {
    document.getElementById('blockCol1').style.visibility = 'visible';
    reactionTimer = setTimeout(blockMissed, timeToReact);
  }
  else if (random == 2) {
    document.getElementById('blockCol2').style.visibility = 'visible';
    reactionTimer = setTimeout(blockMissed, timeToReact);
  }
  else {
    document.getElementById('blockCol3').style.visibility = 'visible';
    reactionTimer = setTimeout(blockMissed, timeToReact);
  }

}

function blockSuccessful() {
  clearTimeout(reactionTimer);
  document.getElementById('blockCol1').style.visibility = 'hidden';
  document.getElementById('blockCol2').style.visibility = 'hidden';
  document.getElementById('blockCol3').style.visibility = 'hidden';

  document.getElementById('attackBlocked').style.display = 'block';
  document.getElementById('attack').style.display = 'block';
}

function blockMissed() {
  document.getElementById('blockCol1').style.visibility = 'hidden';
  document.getElementById('blockCol2').style.visibility = 'hidden';
  document.getElementById('blockCol3').style.visibility = 'hidden';

  var damageNumber = Math.floor(Math.random() * 20) + 5;
  if ((playerHealth - damageNumber) <= 0) {
    document.getElementById('oof').play();

    damageTaken += damageNumber;
    localStorage.setItem('damageTaken', damageTaken);
    localStorage.setItem('damageDealt', damageDealt);

    causeOfDeath = "Killed by The Viper";
    localStorage.setItem('causeOfDeath', causeOfDeath);

    playerHealthValue.style.width = 0;
    playerHealthLabel.innerHTML = "DEAD";

    document.getElementById('playerCol').style.display = 'none';
    document.getElementById('enemyCol').style.display = 'none';
    document.getElementById('attack').style.display = 'none';
    document.getElementById('lastAttack').style.display = 'none';
    document.getElementById('lostFight').style.display = 'block';

  }
  else {
    document.getElementById('oof').play();
    playerHealth -= damageNumber;
    damageTaken += damageNumber;

    playerHealthValue.style.width =  playerHealth + "%";
    playerHealthLabel.innerHTML = playerHealth + "%";
    recipient.innerHTML = "You";
    lastAttackDamage.innerHTML = damageNumber + " points of";

    document.getElementById('attack').style.display = 'block';
  }
}

function inflictDamageToEnemy() {
  document.getElementById('attackBlocked').style.display = 'none';
  document.getElementById('dropInfo').style.display = 'none';
  document.getElementById('lastAttack').style.display = 'block';
  document.getElementById('attack').style.display = 'none';
  var damageNumber = Math.floor(Math.random() * 40) + 10;

  if ((enemyHealth - damageNumber) <= 0) {
    document.getElementById('scream').volume = 0.5;
    document.getElementById('scream').play();
    damageDealt += damageNumber;


    enemyHealthValue.style.width = 0;
    enemyHealthLabel.innerHTML = "DEAD";

    document.getElementById('playerCol').style.display = 'none';
    document.getElementById('enemyCol').style.display = 'none';
    document.getElementById('attack').style.display = 'none';
    document.getElementById('lastAttack').style.display = 'none';
    document.getElementById('wonFight').style.display = 'block';
  }
  else {
    document.getElementById('attackSoundEffect').play();

    enemyHealth -= damageNumber;
    damageDealt += damageNumber;

    enemyHealthValue.style.width =  enemyHealth + "%";
    enemyHealthLabel.innerHTML = enemyHealth + "%";
    recipient.innerHTML = "Quirino";
    lastAttackDamage.innerHTML = damageNumber + " points of";
    reactionTimer = setTimeout(damageToPlayer, 2000);
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
  audioTag.volume = 0.5;
}

function winNextPage() {
  localStorage.setItem('playerHealth', playerHealth);
  localStorage.setItem('damageDealt', damageDealt);
  localStorage.setItem('damageTaken', damageTaken);
  localStorage.setItem("secondsLeft", secondsLeft);
  window.location='../escapeSequence/escape.html';
}

function lossNextPage() {
  localStorage.setItem('damageDealt', damageDealt);
  localStorage.setItem('damageTaken', damageTaken);
  localStorage.setItem('secondsLeft', secondsLeft)
  window.location='../gameStatistics/statisticsScreen.html';
}

function showHelp() {
  var x = document.getElementById('helpSection');
  x.style.display = 'block';
}

function hideHelp() {
  var x = document.getElementById('helpSection');
  x.style.display = 'none';
}

function showInventory() {
  document.getElementById('inventorySection').style.display = 'block';
}

function hideInventory() {
  document.getElementById('inventorySection').style.display = 'none';
}

function easyRead() {
 // Get the checkbox
  var checkBox = document.getElementById("easyReadCheckbox");

// If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    document.body.style.backgroundImage = "url('../whiteBackgroundImage/whitebackground.jpg')";
    document.body.style.fontSize = '150%';
    document.getElementById("centreBox").style.marginTop = "0%";
  } else {
    document.body.style.backgroundImage = null;
    document.body.style.backgroundImage = "url('images/iSPYbackground.jpg')";
    document.body.style.fontSize = '100%';
    document.getElementById("centreBox").style.marginTop = "10%";
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
