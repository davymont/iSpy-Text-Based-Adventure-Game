var secondsLeft = 300;

var weaponArrayPos = 0;
var equipmentArrayPos = 0;
var weaponList = [ "Knife", "Baton", "Pistol"];
var weaponAltTags = [];
var weaponImages = [];
weaponImages[0] = "images/knife.png";
weaponImages[1] = "images/baton.png";
weaponImages[2] = "images/pistol.png";
weaponAltTags[0] = "Image of a Knife";
weaponAltTags[1] = "Image of a Police Baton";
weaponAltTags[2] = "Image of a Pistol";

var equipmentList = ["Bandages", "Grappling Hook", "Walkie Talkie", "Stun Grenade", "Wire Cutters", "Lockpick"];
var equipmentAltTags = [];
var equipmentImages = [];
equipmentImages[0] = "images/bandages.png";
equipmentImages[1] = "images/grapple.png";
equipmentImages[2] = "images/walkietalkie.png";
equipmentImages[3] = "images/grenade.png";
equipmentImages[4] = "images/wirecutters.png";
equipmentImages[5] = "images/lockpick.png";
equipmentAltTags[0] = "Image of Bandages";
equipmentAltTags[1] = "Image of a Grappling Hook";
equipmentAltTags[2] = "Image of a Walkie Talkie";
equipmentAltTags[3] = "Image of a Stun Grenade";
equipmentAltTags[4] = "Image of Wire Cutters";
equipmentAltTags[5] = "Image of a Lockpick";

var agentWeapon = "";
var agentEquip1 = "";
var agentEquip2 = "";

var musicOn = 0;

function fillName() {
  var spyName = localStorage.getItem("name");
  document.getElementById('printName').innerHTML = spyName;
  document.getElementById('printName2').innerHTML = spyName;
}

function changeSelectedWeapon(z) {    /*Pre-defined arrays used to cycle through images using indexes*/
    var shownWeapon = document.getElementById('currentWeapon');

    if ((weaponArrayPos + z > weaponList.length-1) || (weaponArrayPos + z < 0)){

    } else {
      weaponArrayPos = weaponArrayPos + z;
      shownWeapon.innerHTML = weaponList[weaponArrayPos];
      document.getElementById('currentWeaponPicture').src = weaponImages[weaponArrayPos];
      document.getElementById('currentWeaponPicture').alt = weaponAltTags[weaponArrayPos];
    }
}

function chooseWeapon() {
  agentWeapon = document.getElementById('currentWeapon').innerHTML;
  localStorage.setItem("weapon", agentWeapon);

  document.getElementById('weaponSelection').style.display = 'none';      /*Display of elements is changed throughout to keep */
  document.getElementById('equipmentSelection').style.display = 'block';  /*selection screen on one page */
}

function changeSelectedEquipment(z) {
  var shownEquipment = document.getElementById('currentEquipment');

  if ((equipmentArrayPos + z > equipmentList.length-1) || (equipmentArrayPos + z < 0)){

  } else {
    equipmentArrayPos = equipmentArrayPos + z;
    shownEquipment.innerHTML = equipmentList[equipmentArrayPos];
    document.getElementById('currentEquipmentPicture').src = equipmentImages[equipmentArrayPos];
    document.getElementById('currentEquipmentPicture').alt = equipmentAltTags[equipmentArrayPos];
  }
}

function selectEquipment1() {
  agentEquip1 = document.getElementById('currentEquipment').innerHTML;
  localStorage.setItem("equipment1", agentEquip1);    /*Sets choice in localStorage */

  var indexOfEquipment = equipmentList.indexOf(agentEquip1);

  equipmentList.splice(indexOfEquipment, 1);
  equipmentImages.splice(indexOfEquipment, 1);  /*Removes the chosen item from arrays */
  equipmentAltTags.splice(indexOfEquipment, 1);


  document.getElementById('currentEquipment').innerHTML = equipmentList[0];
  document.getElementById('currentEquipmentPicture').src = equipmentImages[0];  /*Sets the shown picture to the first element of the array*/
  document.getElementById('currentEquipmentPicture').alt = equipmentAltTags[0]; /*Sets the shown picture's alt tag to the first element of the array*/

  document.getElementById('desc').style.display = 'none';
  document.getElementById('alreadySelected').style.display = 'initial';
  document.getElementById('firstChoice').innerHTML = agentEquip1;

  document.getElementById('equip2Button').style.display = 'initial';
  document.getElementById('equip1Button').style.display = 'none';

  equipmentArrayPos = 0;  /*Array Position must be reset along with the shown image */
}

function selectEquipment2() {
  agentEquip2 = document.getElementById('currentEquipment').innerHTML;
  localStorage.setItem("equipment2", agentEquip2);    /*Sets choice in localStorage */

  document.getElementById('equipmentSelection').style.display = 'none';
  document.getElementById('preGameInfo').style.display = 'block';

  document.getElementById('e1').innerHTML = agentEquip1;
  document.getElementById('e2').innerHTML = agentEquip2;  /*Changes text based on the user's choices */
  document.getElementById('w1').innerHTML = agentWeapon;

}

function playMusic() {
  music = document.getElementById('menumusic');
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

function nextPage() {
  localStorage.setItem("secondsLeft", secondsLeft);
  window.location='../dogFight/buttonChase.html';
}

function showHelp() {
var x = document.getElementById("hidden");
x.style.display = "block";

}

function hideHelp() {
var x = document.getElementById("hidden");
x.style.display = "none";
}

function globalTimer() {
  var globalTime = setInterval(function(){
      globalSec--;
      localStorage.setItem("time", globalSec);
      if (globalSec < 0) {
          clearInterval(globalTime);
          window.location = "../gameStatistics/statisticsScreen.html";
      }
  }, 1000);
}

function easyRead() {
 // Get the checkbox
var checkBox = document.getElementById("easyReadCheckbox");

// If the checkbox is checked, display the output text
if (checkBox.checked == true){
document.body.style.backgroundImage = "url('../whiteBackgroundImage/whitebackground.jpg')";
document.body.style.fontSize = '150%';
document.getElementById("selectionBox").style.width = "120%";
document.getElementById("selectionBox").style.marginTop = "-10px";
} else {
document.body.style.backgroundImage = null;
document.body.style.backgroundImage = "url('images/page2.jpg')";
document.body.style.fontSize = '100%';
document.getElementById("selectionBox").style.width = "100%";
document.getElementById("selectionBox").style.marginTop = "100px";
}
}
