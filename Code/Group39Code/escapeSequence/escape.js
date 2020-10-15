var pText = "";
var eStage = 0;
var playerDead = false;
var playerEscaped = false;

var weapon = localStorage.getItem("weapon");
var equipment1 = localStorage.getItem("equipment1");
var equipment2 = localStorage.getItem("equipment2");
var playerHealth = parseInt(localStorage.getItem("playerHealth"));
var causeOfDeath = localStorage.getItem("causeOfDeath");
var secondsLeft = parseInt(localStorage.getItem("secondsLeft"));

var damageTaken = parseInt(localStorage.getItem("damageTaken"));

var timerShouldStop = false;
var bandagesUsed = false;

var musicOn = 0;

function updateHealthBar() {
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
    updateHealthBar();
  }
}

function loadEscape() {
  pText = "As you gaze at the body of your deceased target, a triumphant sense of satisfaction coursing through your veins, <em>suddenly, the lights turn off!</em> Your heart sinks as a deafening siren begins to blare. Over the intercom you hear the roars of an army of guards rallying towards you: <em>you need to move fast!</em>";
  document.getElementById('pText').innerHTML = pText;
  document.getElementById('button1').style.display = 'none';
  document.getElementById('button2').style.display = 'none';
  document.getElementById('button3').style.display = 'none';
  document.getElementById('button4').style.display = 'none';
}

function playMusic() {
  music = document.getElementById('escapemusic');
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

function continueGame() {
  eStage++;

  if (playerDead) {
    document.getElementById('gameLost').style.display = 'block';
    document.getElementById('gameInProgress').style.display = 'none';
    timeDisappear();
    stopTimer();
  }
  else if (playerEscaped) {
    document.getElementById('gameWon').style.display = 'block';
    document.getElementById('gameInProgress').style.display = 'none';
    timeDisappear();
    stopTimer();
  }

  if (eStage == 2)
  {
    document.getElementById('button1').innerHTML = 'Go up the stairs!';
    document.getElementById('button2').innerHTML = 'Go down the stairs!';
    document.getElementById('button3').style.display = 'none';
  }

  else if (eStage == 3) {
    document.getElementById('button1').innerHTML = 'Try to enter the barracks!';
    document.getElementById('button2').innerHTML = 'Make a run for it!';
  }

  else if (eStage == 4) {
    document.getElementById('button1').innerHTML = 'Search the locker!';
    document.getElementById('button2').innerHTML = 'Hide under a bed!';
  }

  else if (eStage == 5) {
    document.getElementById('button1').innerHTML = 'Montreya';
    document.getElementById('button2').innerHTML = 'Montessa';
    document.getElementById('button3').style.display = 'block';
    document.getElementById('button3').innerHTML = "Montoya";
    document.getElementById('button4').style.display = 'block';
    document.getElementById('button4').innerHTML = "McDowell";
  }
}

function beginEscape() {
  startTimer();
  startTimerDisplay();
  if (eStage == 0) {
    pText = "There is a door to each side of you. Alternatively, if you have been resourceful, you could grapple back up into the ventilation shaft. <em>Your heart is pounding in your chest as the footsteps get louder and louder!</em> What do you do?";
    document.getElementById('pText').innerHTML = pText;
    document.getElementById('button1').style.display = 'block';
    document.getElementById('button2').style.display = 'block';
    document.getElementById('button3').style.display = 'block';
    document.getElementById('button1').innerHTML = 'Take the Left Door!';
    document.getElementById('button2').innerHTML = 'Take the Right Door!';
    document.getElementById('button3').innerHTML = 'Return to the vent! (Requires Grappling Hook)';
    eStage++;
  }
}

function btn1() {
  if (eStage == 1) { /*This code runs if the user takes the left door*/
    document.getElementById('noGrapplingHook').style.display = 'none';
    document.getElementById('pText').innerHTML = 'You rush through the left door and come to two sets of stairs. You wonder; if you had a walkie talkie perhaps you could call for a helicopter pickup. Which way do you go?';
    continueGame();
  }

  else if (eStage == 2) { /*The code runs if the user goes up the stairs*/

    if (equipment1 == "Walkie Talkie" || equipment2 == "Walkie Talkie") {
      playerEscaped = true;
      document.getElementById('winInfo').innerHTML = 'Frantically adjusting the dial on your walkie talkie, you shout into the microphone that you need an immediate pickup. Racing up through the stairs, you reach the roof of the building, where you can already see your escape helicopter approaching. Yay win!';
      continueGame();
    }
    else {
      document.getElementById('pText').innerHTML = "You reach the roof, but it is overrun by guards! You take a shot to the leg as you run back down the way you came. After dextrously leaping down several flights of stairs you land in a t-junction; There is a door with a heavily padlocked door labelled 'Barracks'. It looks like you'll need lockpicks to get in here, or hurt yourself breaking the door open. There is also an open door leading outside to the rest of the compound. Through the door you can see soldiers running around looking for you. You could make a run for it this way, but only if you think you can take enough hits to get out alive.";
      document.getElementById('gunSound').play();
      playerHealth -= 10;
      damageTaken += 10;
      updateHealthBar();
      if (playerHealth <= 0) {
        causeOfDeath = "Shot by guards on the Roof";
        localStorage.setItem("causeOfDeath", causeOfDeath);

        document.getElementById('lossInfo').innerHTML = "You reach the roof, but it is overrun by guards! You take a shot to the leg as you run back down the way you came. You drop to the floor, too weak to carry yourself downstairs. Lying propped against the wall, the urge to close your eyes is too strong as you fall unconscious. It's over...";
        playerDead = true;
      }
      continueGame();
    }
  }

  else if (eStage == 3) {
    if (equipment1 == "Lockpick" || equipment2 == "Lockpick") {
      document.getElementById('enterBarracks').innerHTML = "You put your training to use as you rapidly pick the lock on the door.";
    }
    else {
      document.getElementById('enterBarracks').innerHTML = "With no other way in, you charge at the door and break it off the old, rusted hinges it was swinging on. Your shoulder is numb and hard to move, but you have no time to worry.";
      document.getElementById('doorSound').play();
      playerHealth -= 10;
      damageTaken += 10;
      updateHealthBar();
      if (playerHealth <= 0) {
        causeOfDeath = "Blunt force trauma";
        localStorage.setItem("causeOfDeath", causeOfDeath);

        document.getElementById('lossInfo').innerHTML = "You were weak and with blurred vision, you gave it your all to break down the door, falling to the floor after the second charge. Your vision fades to black. It's over...";
        playerDead = true;
      }
    }
    document.getElementById('pText').innerHTML = "The barracks are empty, but probably not for long. Out of all the lockers in the room, there is one that appears to have not been emptied, labelled with the name 'Y. Montoya'. Perhaps you could find a disguise? Alternatively, you could hide under a bed in the barracks to avoid detection. Which route shall you take?";
    continueGame();
  }

  else if (eStage == 4) {
    document.getElementById("guard").play();
    document.getElementById('enterBarracks').style.display = 'none';
    document.getElementById('pText').innerHTML = "You hastily put on the soldier's uniform, which luckily fits perfectly. Just as you affix the helmet, you hear a voice from the door: A soldier is standing in the doorway looking at you. He eyes the number on your shoulder. 'State your name!' What do you say?";
    continueGame();
  }

  else if (eStage == 5) {
    document.getElementById('lossInfo').innerHTML = "The soldier's eyes narrow. He raises the barrel of his rifle to aim at you. 'There is no one with this name in the compound.' You close your eyes...";
    causeOfDeath = "Poor deception skills";
    localStorage.setItem("causeOfDeath", causeOfDeath);
    playerDead = true;
    continueGame();
  }


}

function btn2() {
  if (eStage == 1) { /*This code runs if the user takes the right door*/
    document.getElementById('noGrapplingHook').style.display = 'none';
    document.getElementById('pText').innerHTML = 'After walking out the right door you walk headfirst into a soldier! Surprised, he clubs you across the face with the butt of his gun. Your nose bloodied and throbbing with pain, you manage to rush back inside and go the other way, but not without sustaining some damage to your person. You rush through the other door and come to two sets of stairs. You wonder; if you had a walkie talkie perhaps you could call for a helicopter pickup. Which way do you go?';
    document.getElementById('whackSound').play();
    playerHealth -= 10;
    damageTaken += 10;
    updateHealthBar();
    if (playerHealth <= 0) {
      causeOfDeath = "Bludgeoned by Guard";
      localStorage.setItem("causeOfDeath", causeOfDeath);

      document.getElementById('lossInfo').innerHTML = "After walking out the right door you walk headfirst into a soldier! Surprised, he clubs you across the face with the butt of his gun. This is enough to knock you to the ground, as your vision fades to black. It's over...";
      playerDead = true;
    }

    continueGame();
  }

  else if (eStage == 2) {
    document.getElementById('pText').innerHTML = "After dextrously leaping down several flights of stairs you land in a t-junction; There is a door with a heavily padlocked door labelled 'Barracks'. It looks like you'll need lockpicks to get in here, or hurt yourself breaking the door open. There is also an open door leading outside to the rest of the compound. Through the door you can see soldiers running around looking for you. You could make a run for it this way, but only if you think you can take enough hits to get out alive.";
    continueGame();
  }

  else if (eStage == 3) {
    if (playerHealth >= 26) {
      document.getElementById('winInfo').innerHTML = "Gritting your teeth, you run full-pelt through the door and into the yard towards the front gate. You can hear gunshots and feel impacts hitting your body, but the adrenaline in your veins prevents any pain you would be feeling from the wounds. The frantic shouting and alarms has drawn the gate guards away from their position, and you can slip out through the front of the compund.";
      playerEscaped = true;
      playerHealth -= 25;
      damageTaken += 25;
      updateHealthBar();
      continueGame();
    }
    else {
      document.getElementById('lossInfo').innerHTML = "Gritting your teeth, you run full-pelt through the door and into the yard towards the front gate. You can hear gunshots and feel impacts hitting your body. A well-placed shot to the back of your left leg drops you instantly. Through your blurred vision and the dazing spotlights you see the guards rushing towards you. It's over...";
      causeOfDeath = "Riddled by bullets";
      localStorage.setItem("causeOfDeath", causeOfDeath);

      playerDead = true;
      continueGame();
    }
  }

  else if (eStage == 4) {
    document.getElementById('enterBarracks').style.display = 'none';
    playerDead = true;
    causeOfDeath = "Not enough Hide and Seek experience";
    localStorage.setItem("causeOfDeath", causeOfDeath);

    document.getElementById('lossInfo').innerHTML = "You hold your breath as you hear a group of guards stomping down the hallway. They enter the Barracks, tearing the room apart. One of them takes a step over to your only shelter and throws the mattress off the flimsy metal bedframe. He quickly raises his rifle and points it right at you. It's over...";
    continueGame();
  }

  else if (eStage == 5) {
    document.getElementById('lossInfo').innerHTML = "The soldier's eyes narrow. He raises the barrel of his rifle to aim at you. 'There is no one with this name in the compound.' You close your eyes...";
    playerDead = true;
    causeOfDeath = "Poor deception skills";
    localStorage.setItem("causeOfDeath", causeOfDeath);
    continueGame();
  }

}

function btn3() {
  if (eStage == 1 && (equipment1 == "Grappling Hook" || equipment2 == "Grappling Hook")) {
    playerEscaped = true;
    document.getElementById('winInfo').innerHTML = "You frantically clamber back into the vents just as you hear the doors to the lounge bust open beneath you. The vents provide an easy escape out the back of the compound, as you slip away undetected!";
    continueGame();
  }
  else if (eStage == 1){
    document.getElementById('noGrapplingHook').style.display = 'block';
    document.getElementById('button3').style.display = 'none';
  }
  else if (eStage == 5) {
    playerEscaped = true;
    document.getElementById('winInfo').innerHTML = "The soldier eases up. 'Well get out there and find this intruder before he escapes!' He points behind him to the open door leading to the yard. Not believing your luck, you walk past him into the yard and after waiting for the right moment, slip out through the front get of the compound undetected...";
    continueGame();
  }

}

function btn4() {
  if (eStage == 5) {
    document.getElementById('lossInfo').innerHTML = "The soldier's eyes narrow. He raises the barrel of his rifle to aim at you. 'There is no one with this name in the compound.' You close your eyes...";
    playerDead = true;
    causeOfDeath = "Poor deception skills";
    localStorage.setItem("causeOfDeath", causeOfDeath);
    continueGame();
  }
}

function nextPage() {
  localStorage.setItem("damageTaken", damageTaken);
  localStorage.setItem('secondsLeft', secondsLeft);
  window.location='../gameStatistics/statisticsScreen.html';
}

function showInventory() {
  document.getElementById('inventorySection').style.display = 'block';
}

function hideInventory() {
  document.getElementById('inventorySection').style.display = 'none';
}

function showHelp() {
  var help = document.getElementById("helpSection");
  help.style.display = "block";
}

function hideHelp() {
  var help = document.getElementById("helpSection");
  help.style.display = "none";
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
            document.getElementById('gameInProgress').style.display = 'none';
            document.getElementById('gameLost').style.display = 'block';
        }
    }, 1000);
}

function stopTimer() {
  timerShouldStop = true;
}

function timeDisappear() {
 document.getElementById("timerDisplay").classList.add('dissapear');
}

function easyRead() {
 // Get the checkbox
var checkBox = document.getElementById("easyReadCheckbox");

// If the checkbox is checked, display the output text
if (checkBox.checked == true){
document.body.style.backgroundImage = "url('../whiteBackgroundImage/whitebackground.jpg')";
document.body.style.fontSize = '150%';
document.getElementById("centreBox").style.marginTop = "-7%";
} else {
document.body.style.backgroundImage = null;
document.body.style.backgroundImage = "url('images/2guards.jpg')";
document.body.style.fontSize = '100%';
document.getElementById("centreBox").style.marginTop = "0%";
}
}

function fillName() {
  var spyName = localStorage.getItem("name");
  document.getElementById('printName').innerHTML = spyName;
  document.getElementById('printName2').innerHTML = spyName;
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
    localStorage.setItem('damageTaken', damageTaken);
    causeOfDeath = "Poor Time Management";
    localStorage.setItem("causeOfDeath", causeOfDeath);
    window.location = "../gameStatistics/statisticsScreen.html";
  }
}
