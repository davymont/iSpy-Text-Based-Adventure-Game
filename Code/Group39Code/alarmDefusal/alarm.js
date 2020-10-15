var weapon = localStorage.getItem("weapon");
var equipment1 = localStorage.getItem("equipment1");
var equipment2 = localStorage.getItem("equipment2");
var playerHealth = parseInt(localStorage.getItem("playerHealth"));
var causeOfDeath = localStorage.getItem("causeOfDeath");
var secondsLeft = parseInt(localStorage.getItem("secondsLeft"));
var bandagesUsed = false;

var answer = null;
var prompt = '';
var musicOn = 0;
var count = 40;
var gameStarted = 0;
var qRight = 0;
var noWrong = 0;

function fillHealthBar() {
  document.getElementById('playerHealthValue').style.width = playerHealth + "%";
}

function randomiseAlarm() {

  var random = Math.floor(Math.random()*3) + 1;

  if (random == 1) {
    answer = 1387;
    prompt = 'Multiply the square root of 121 by 8, then half it and multiply by 3. Times by 10 and add 67';
  }

  else if (random == 2) {
    answer = 8003;
    prompt = 'Multiply the fourth prime by 2, then add it to 8000 and subtract 11';
  }

  else {
   answer = 1642;
   prompt = 'Square 7, add 1, then multiply by 30 and add 142';
  }

  document.getElementById('question').innerHTML = prompt;
}

function timer() {
  count--;
  t = document.getElementById("timer");
  if (count >= 0 && gameStarted == 0 && qRight == 0) {

    t.innerHTML = count;
  }

  if ((count <= 0 && qRight == 0)) {
    causeOfDeath = "Failed to disable the Alarm";
    localStorage.setItem("causeOfDeath", causeOfDeath);

    document.getElementById("screen").style.display = "none";
    document.getElementById("btnrow1").style.display = "none";
    document.getElementById("btnrow2").style.display = "none";
    document.getElementById("btnrow3").style.display = "none";
    document.getElementById("btnrow4").style.display = "none";
    document.getElementById("inGameInfo").style.display = "none";
    document.getElementById("gameLostInfo").style.display = "block";
  }

}

function timerStart() {
  setInterval(timer, 1000);
  document.getElementById('preGameInfo').style.display = 'none';
  document.getElementById('inGameInfo').style.display = 'block';
  document.getElementById("screen").style.display = "block";
  document.getElementById("btnrow1").style.display = "block";
  document.getElementById("btnrow2").style.display = "block";
  document.getElementById("btnrow3").style.display = "block";
  document.getElementById("btnrow4").style.display = "block";
  document.getElementById("attempts").style.display = "block";

}

function submitCode() {
  var display = document.getElementById("display");
  if (display.value == answer) {
    prompt = 'Correct!';
    rightBeep();
    qRight = 1;
    document.getElementById('gameWonInfo').style.display = 'block';
    document.getElementById('inGameInfo').style.display = 'none';
  }
  else {
    prompt = 'Incorrect!'
    wrongBeep();
    noWrong++;
    if (noWrong==1) {
      document.getElementById('attempts').innerHTML = "Attempts remaining: 2";
    }

    else if (noWrong==2) {
      document.getElementById('attempts').innerHTML = "Attempts remaining: 1";
    }

    else if (noWrong==3){
      causeOfDeath = "Failed to disable the Alarm";
      localStorage.setItem("causeOfDeath", causeOfDeath);

      document.getElementById('attempts').innerHTML = "Attempts remaining: 0";
      document.getElementById("screen").style.display = "none";
      document.getElementById("btnrow1").style.display = "none";
      document.getElementById("btnrow2").style.display = "none";
      document.getElementById("btnrow3").style.display = "none";
      document.getElementById("btnrow4").style.display = "none";
      document.getElementById("inGameInfo").style.display = "none";
      document.getElementById("gameLostInfo").style.display = "block";
      document.getElementById('playerHealthValue').style.width = 0 + "%";
      alarm = document.getElementById('siren');
      alarm.volume = 0.1;
      alarm.play();
    }
  }

  document.getElementById('correct').innerHTML = prompt;
}

function continueGame() {
  if(qRight == 0) {
    localStorage.setItem("secondsLeft", secondsLeft);
    localStorage.setItem("playerHealth", playerHealth);
    window.location = '../gameStatistics/statisticsScreen.html';
  }

  else if (qRight == 1) {
    localStorage.setItem("secondsLeft", secondsLeft);
    localStorage.setItem("playerHealth", playerHealth);
    window.location = '../bossFight/BossFight.html';
  }
}

var noCount = 0;

function buttonPush1() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 1;
      noCount = noCount + 1;
    }

function buttonPush2() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 2;
      noCount = noCount + 1;
      }

function buttonPush3() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 3;
      noCount = noCount + 1;
      }

function buttonPush4() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 4;
      noCount = noCount + 1;

      }

function buttonPush5() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 5;
      noCount = noCount + 1;
      }

function buttonPush6() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 6;
      noCount = noCount + 1;
      }

function buttonPush7() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 7;
      noCount = noCount + 1;
      }

function buttonPush8() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 8;
      noCount = noCount + 1;
      }

function buttonPush9() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 9;
      noCount = noCount + 1;
      }

function buttonPush0() {
    var display = document.getElementById("display");
    if (noCount < 4)
      display.value = display.value + 0;
      noCount = noCount + 1;
      }

function clearDisplay() {
  var display = document.getElementById("display");
  display.value = null;
  noCount = 0;

}

function playMusic() {
  music = document.getElementById('bombmusic');
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

function buttonBeep() {
  beep = document.getElementById('btnbeep');
  beep.volume = 0.2;
  beep.play();
}

function rightBeep() {
  beep = document.getElementById('right');
  beep.volume = 0.2;
  beep.play();
}

function wrongBeep() {
  beep = document.getElementById('wrong');
  beep.volume = 0.2;
  beep.play();
}

function fillName() {
  var spyName = localStorage.getItem("name");
  document.getElementById("printName").innerHTML = spyName;
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
    fillHealthBar();
  }
}

function showHelp() {
var x = document.getElementById("helpSection");
x.style.display = "block";

}

function hideHelp() {
var x = document.getElementById("helpSection");
x.style.display = "none";
}

function easyRead() {
 // Get the checkbox
  var checkBox = document.getElementById("easyReadCheckbox");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
  document.body.style.backgroundImage = "url('../whiteBackgroundImage/whitebackground.jpg')";
  document.body.style.fontSize = '150%';
  } else {
  document.body.style.backgroundImage = null;
  document.body.style.backgroundImage = "url('images/newalarm.jpg')";
  document.body.style.fontSize = '100%';

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
    localStorage.setItem("secondsLeft", secondsLeft);
    causeOfDeath = "Poor Time Management";
    localStorage.setItem("causeOfDeath", causeOfDeath);
    window.location = "../gameStatistics/statisticsScreen.html";
  }
}
