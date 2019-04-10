//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Introduce two global variables used by this page  /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let driverList = ["Vettel","Leclerc","Grosjean","Magnussen","Norris","Sainz","Hamilton","Bottas","Perez","Stroll","Gasly","Verstappen","Ricciardo","Hulkenberg","Raikkonen","Giovinazzi","Albon","Kyvat","Russell","Kubica","Res1", "Res2", "Res3","Res4"];
let primary_list = ["P1","P2","P3","P4","P5","P6","P7","P8","P9","P10"];
let primary_position_list = ["Winner", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"]
let secondary_list = ["Team Delta", "First Lap","MPG","DotD","Fastest"];
let qually_list = ["Pole"];
let poleInputList = ["poleTime", "poleTime1", "poleTime2", "special"]
let seamusExtraList = ["ExtraP13", "ExtraP12", "ExtraP11"]
/////////////////////
let allListElements = ["P1","P2","P3","P4","P5","P6","P7","P8","P9","P10","Team Delta", "First Lap","MPG","DotD","Fastest","Pole", "PSSInput","raceBtn"];
let allListElementforBooleanCheck = ["P1","P2","P3","P4","P5","P6","P7","P8","P9","P10","Team Delta", "First Lap","MPG","DotD","Fastest","Pole","raceBtn"];
/////////////////////
let y = (names) => names.filter((v,i) => names.indexOf(v) === i) // gets rid of extra ones
let selection; // selection sel, and se are used for opening the same modal and controlling the content of that modal
let sel;
let se;
/////////////////////
let raceList = ["AUS","BAH", "CHI", "AZB","ESP", "MON", "CAN", "FRA", "RBR", "BRI", "GER", "HUN", "SPA", "MNZ", "MBS", "RUS","SUZ", "MEX", "USA", "BRA", "ABU"];
let headerRaceList = ["mel", "bhr", "sha", "bak","cat","mnt", "vil", "ric","spe","sil","hnh", "hgr","spf", "itl", "sing", "soch","suzu", "rodi","tex","palo","yas"];
let elementArray = ["", "P1", "P2", "P3", "P4", "P5", "P6",  "P7","P8", "P9", "P10", "P11", "P12", "P13", "Pole Driver", "Pole Time", "Team Driver", "DotD", "First Lap", "MPG", "Fastest Lap", "Strategy"]

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Define all the modals ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let modal = document.getElementById('myModal');
let raceModal = document.getElementById("myraceModal");
let myResultModal = document.getElementById("myResultModal");
let loadingWheel = document.getElementById("loadingWheel");
let ruleModal = document.getElementById("myRuleModal");
let regModal = document.getElementById("myRegModal");
let theMessageModal = document.getElementById("myMessageModal");
let theProfileModal = document.getElementById("myProfileModal");
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// Timer function for opening the page init /////////////////////////////////////////////
/////////////////// It sets timers for the races, and detects Authentication /////////////////////////////
function specialTimerThing() {
  raceList.forEach(function(element) {
    let race = document.getElementById(element);
    let raceDateTime = race.getAttribute("data-dateTime");
    if (raceDateTime != "") { //if it has a date
      //alert(raceDateTime)
      let indexOfRace = raceList.indexOf(element);
      let raceIdentify = raceList[indexOfRace];
      let headerListId = headerRaceList[indexOfRace];
      countdownTimer(headerListId, raceIdentify, raceDateTime);
    }
  })
}
async function onOpeningThePage() {
  try {
    let responseObject = await fetch('/isAuthenticated', {
      method : 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      credentials: "include"
      });
      const ourResponse = await responseObject.json();
      if(ourResponse.success === true) {
        document.getElementById("navLogin").innerHTML = "Logout";
        document.getElementById("navLogin").setAttribute( "onClick", "Boo()" );
        if (ourResponse.isSeamus === true) {
          document.getElementById("SeamusSpecial").style.display = "block";
          document.getElementById("ExtraP11").style.display = "block";
          document.getElementById("ExtraP12").style.display = "block";
          document.getElementById("ExtraP13").style.display = "block";

        } else if (ourResponse.isSeamus === false) {
          specialTimerThing();
          document.getElementById("SeamusSpecial").style.display = "none"
          document.getElementById("ExtraP11").style.display = "none";
          document.getElementById("ExtraP12").style.display = "none";
          document.getElementById("ExtraP13").style.display = "none";
        }
      } else if (ourResponse.success === false) {
        specialTimerThing();
        document.getElementById("navLogin").setAttribute( "onClick", "openReg()");
        document.getElementById("navLogin").innerHTML = "Login";
      }
    }
    catch(error) {
  }
}
function findIndex(list,searchElement) {
  for (i = 0; i < 1+list.length; i++) {
    if (list[i] === searchElement) {
      return i;
    }
  }
}


function clearButtonFunction() {
  document.getElementById("clearDriver").style.display = "none"
  modal.style.display = "none";
  document.getElementById(selection).setAttribute("name","");
  checkNameEmptyBtnClicked(selection)
  let indexOfElement = findIndex(primary_list, selection)
  let stringofElement = primary_position_list[indexOfElement]
  document.getElementById(selection).setAttribute("value", stringofElement)
}
//onload top ten, make it visible. Default is invisible. Onclosing the modal. Make it go away.

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Opening all the modals  /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function openRaceModal(identify) { // Changes function fired of race, depending on sumbission or GET.
  raceModal.style.display = "grid";
  raceList.forEach(function(element) {
    if (identify === "raceBtn") {
      document.getElementById(element).setAttribute("onClick", "raceSelectFunction(this.id)")
    } else if (identify === "getBtn") {
      document.getElementById(element).setAttribute("onClick", "getItMate(this.id)")
    }
  })
}


function openRules() {
  ruleModal.style.display = "grid"
}

function openReg() {
  regModal.style.display = "grid"
  document.getElementById("loginUsername").focus();
}
function openProfile() {
  theProfileModal.style.display = "grid"
}
async function profileStats() {
  try {
    let responseObject = await fetch('/isAuthenticated', {
      method : 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      credentials: "include"
      });
      const ourResponse = await responseObject.json();
      if(ourResponse.success === true) {
        theProfileModal.style.display = "grid"
      } else if (ourResponse.success === false) {
        messageModal("Log on in to check this lot")
      }
    }
    catch(error) {
  }
}
function showAllDrivers() {
  driverList.forEach(function(element) {
    document.getElementById(element).hidden = false;
  })
}
///////////////////////////////////////////////////////////////////onclick = "raceSelectFunction(this.id)" onclick = "getItMate(this.id)"
// This will open different modals depending on what is clicked ///
///////////////////////////////////////////////////////////////////
function checkedPrimaryList(select) {  // This fires after success = true for primary (top ten list), hides selected drivers
  document.getElementById("positionTitle").innerHTML = select;
  document.getElementById("Top Ten Points").style.display = "inline"
  document.getElementById("clearDriver").style.display = "block"
  showAllDrivers()
  primary_list.forEach(function(element) {
    var twat =  document.getElementById(element).name;
    if (checkInList(driverList, twat) === true) {
      document.getElementById(twat).hidden = true;
    }
  })
}
function checkSeamusList(select) {
  document.getElementById("positionTitle").innerHTML = select;
  showAllDrivers()
  primary_list.forEach(function(element) {
    var twat =  document.getElementById(element).name;
    if (checkInList(driverList, twat) === true) {
      document.getElementById(twat).hidden = true;
    }
  })
  seamusExtraList.forEach(function(element) {
    var twaty =  document.getElementById(element).name;
    if (checkInList(driverList, twaty) === true) {
      document.getElementById(twaty).hidden = true;
    }
  })
}
function closePrimaryList() { // for closing modals of the primary (top ten) list
  document.getElementById("positionTitle").innerHTML = "";
  document.getElementById("Top Ten Points").style.display = "none"
  document.getElementById("clearDriver").style.display = "none"
}
function closeSeamusList() {
  document.getElementById("positionTitle").innerHTML = "";
  document.getElementById("clearDriver").style.display = "none"
}
function checkedSecondList(select) { //unhide all drivers, hide descriptions and show alternative descriptions/headers(n)
  sel = select + "D"; // To create separate ID's for header and footer of the Modal
  se = select + "B";
  showAllDrivers()
  primary_list.forEach(function(element) {
    let driverName = document.getElementById(element).name;
    if (driverName) {
      document.getElementById(driverName).hidden = false;
    }
  })
  document.getElementById("Top Ten Points").style.display = "none"
  document.getElementById("positionTitle").innerHTML = "";
  document.getElementById(sel).style.display = "inline";
  document.getElementById(se).style.display = "inline";
}
function closeSecondList() { //for closing modals of the second list
  document.getElementById(sel).style.display = "none";
  document.getElementById(se).style.display = "none";
}
function checkQually(select) {
  showAllDrivers()
  sel = select + "D"; // To create separate ID's for header and footer of the Modal
  se = select + "B";
  primary_list.forEach(function(element) {
    let driverName = document.getElementById(element).name;
    if (driverName) {
      document.getElementById(driverName).hidden = false;
    }
  })
  document.getElementById("Top Ten Points").style.display = "none"
  document.getElementById("poleTime").style.display = "inline";
  document.getElementById("poleTime1").style.display = "inline";
  document.getElementById("poleTime2").style.display = "inline";
  document.getElementById("special").style.display = "inline";
  document.getElementById("positionTitle").innerHTML = "";
  document.getElementById(sel).style.display = "inline";
  document.getElementById(se).style.display = "inline";
}
function closeQuallyList() {
  document.getElementById(sel).style.display = "none";
  document.getElementById(se).style.display = "none";
  document.getElementById("poleTime").style.display = "none";
  document.getElementById("poleTime1").style.display = "none";
  document.getElementById("poleTime2").style.display = "none";
  document.getElementById("special").style.display = "none";
}

function openFunction(x) {
  modal.style.display = "grid";
  selection = x;
  poleInputList.forEach(function(element) { // switches pole time input to not display
    document.getElementById(element).style.display = "none";
  })
  changeClass(x, "BtnClicked"); // Changes appearance to button clicked, SON
  if (checkInList(primary_list, x)) {
    checkedPrimaryList(x)
  } else if (checkInList(secondary_list, x)) {
    checkedSecondList(x)
  } else if (checkInList(qually_list, x)) {
    checkQually(x)
  } else if (checkInList(seamusExtraList, x)) {
    checkSeamusList(x)
  }
}

/////////////////////value = "00:01:23.456"/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Closing all the modals  /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function closeRaceFunction() {
  raceModal.style.display = "none";
}
function closeRuleFunction() {
  ruleModal.style.display = "none";
}
function closeRegFunction() {
  regModal.style.display = "none";
}
function closeProfileFunction() {
  theProfileModal.style.display = "none"
}
function raceSelectFunction(identify) {
  raceModal.style.display = "none";
  var raceElement = document.getElementById(identify);
  var raceName = raceElement.name;
  var selectButton = document.getElementById("raceBtn")
  selectButton.setAttribute("class", "raceBtnClicked");
  selectButton.setAttribute("value", raceName);
  selectButton.setAttribute("name", raceName);
}
function checkNameEmptyBtnClicked(selectionId) {
  if (document.getElementById(selectionId).name) {
    changeClass(selectionId, "BtnClicked");
  } else {
    changeClass(selectionId, "Btn")
  }
}
////////////////     This is the X icon at the modal top that closes it //////////////////////////
function closeFunction(y) {
  modal.style.display = "none";
  if (checkInList(primary_list, selection)) {
    closePrimaryList()
  } else if (checkInList(secondary_list, selection)) {
    closeSecondList()
  } else if (checkInList(qually_list, selection)) {
    closeQuallyList()
    if (document.getElementById("poleTime").checkValidity() && document.getElementById("poleTime1").checkValidity() && document.getElementById("poleTime2").checkValidity()) {
      //SAVE
    }

  } else if (checkInList(seamusExtraList, selection)) {
    closeSeamusList()
  }
  checkNameEmptyBtnClicked(selection);
}

/////// Closes modal when we click on the exterior window ///////////////
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    if (checkInList(primary_list, selection)) {
      closePrimaryList();
      checkNameEmptyBtnClicked(selection);
    } else if (checkInList(secondary_list, selection)) {
      closeSecondList();
      checkNameEmptyBtnClicked(selection);
    } else if (checkInList(seamusExtraList, selection)) {
      closeSeamusList()
    } else if (checkInList(qually_list, selection)) {
      closeQuallyList();
      if (document.getElementById("poleTime").checkValidity() && document.getElementById("poleTime1").checkValidity() && document.getElementById("poleTime2").checkValidity()) {
        //save pole time.
        //add driver selected to
      } else {

      }
      if (document.getElementById("poleTime").value != "") {
        changeClass(selection, "BtnClicked");
      } else {
        changeClass(selection, "Btn")
      }
    }
  } else if (event.target == ruleModal) {
    ruleModal.style.display = "none";
  } else if (event.target == regModal) {
    regModal.style.display = "none";
  } else if (event.target == raceModal) {
    raceModal.style.display = "none";
  } else if (event.target == theProfileModal) {
    theProfileModal.style.display = "none"
  }
}
//The first person we click is foreever losttttttt, maybe switch them all back on in opening. THEN, each decides to show or not.
//So each time we open up, it restarts from afresh MATE
// When entering time and clicking the box, it closes the pole modal and resets fields ////////
function specialPoleFunction() {
  var defaultVal = document.getElementById("Pole").name;
  let theFirstBit = document.getElementById("poleTime").value
  let theSecondBit = document.getElementById("poleTime1").value
  let theThirdBit = document.getElementById("poleTime2").value
  if (theFirstBit.length > 1) {
    theFirstBit = theFirstBit.substr(1);

  }
  if (theSecondBit.length === 1) {
    theSecondBit = "0"+theSecondBit
  }
  if (theThirdBit.length === 1) {
    theThirdBit = theThirdBit + "00"
  } else if (theThirdBit.length === 2) {
    theThirdBit = theThirdBit + "0"
  }
  let newTimeData = "0" + theFirstBit + ":" + theSecondBit + "." + theThirdBit;
  if (document.getElementById("poleTime").checkValidity() && document.getElementById("poleTime1").checkValidity() && document.getElementById("poleTime2").checkValidity()) {
    modal.style.display = "none";
    document.getElementById("Pole").setAttribute("data-random", newTimeData);
    document.getElementById("Pole").setAttribute("value","Pole : " + defaultVal + " - " + newTimeData)
    closeQuallyList()
  } else if (document.getElementById("poleTime1").value > 59) {
    messageModal("Please enter a valid value for seconds (ss)")
  } else if (document.getElementById("poleTime1").value > 999) {
    messageModal("Please enter a valid value for milliseconds (SSS)")
  }

  checkNameEmptyBtnClicked(selection)
}
function specialPoleFunctionEvent(identify) {
  setTimeout(function(){
    if (identify === "poleTime") {
      if (document.getElementById(identify).value.length > 0) {
        document.getElementById("poleTime1").focus();
      };
    } else if (identify === "poleTime1") {
      if (document.getElementById(identify).value.length > 1) {
        document.getElementById("poleTime2").focus();
      };
    };
  }, 1);
}

//////////// This function closes the modal when selecting a driver    ////closeSecondList() closePrimaryList() closeQuallyList()
function myFunction(driver,clicked_id) {
  if (checkInList(primary_list, selection)) {
    document.getElementById(selection).setAttribute("value", selection +": " + clicked_id);
    modal.style.display = "none";
    document.getElementById(selection).setAttribute("name", clicked_id);
    closePrimaryList()
  } else if (checkInList(secondary_list, selection)) {
    modal.style.display = "none";
    document.getElementById(selection).setAttribute("value", selection +": " + clicked_id);
    document.getElementById(selection).setAttribute("name", clicked_id);
    closeSecondList()
  } else if (checkInList(qually_list, selection)) {
    document.getElementById("poleTimeDiv").scrollIntoView({ behavior: 'smooth' });
    document.getElementById("poleTime").focus();
    document.getElementById(selection).setAttribute("value", selection +": " + clicked_id + " - no time set!");
    document.getElementById(selection).setAttribute("name", clicked_id);
    specialPoleFunction()
  } else if (checkInList(seamusExtraList, selection)) {
    document.getElementById(selection).setAttribute("value", selection +": " + clicked_id);
    modal.style.display = "none";
    document.getElementById(selection).setAttribute("name", clicked_id);
    closeSeamusList();
  }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// Random functions used throughout //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkInList(list, element) {
  var firstVar = list.indexOf(element);
  if (firstVar > -1) {
    return true
  } else {
    return false
  }
}
function changeFunction(idd,someVal) {
  document.getElementById(idd).setAttribute("value", someVal)
  document.getElementById(idd).setAttribute("class", "selectedBtn")
}
////////////////////// Removes an item from a list, anywhere in the list ///////////////
/*
function removeFromList(list, element) {
  var removeVar = list.indexOf(element);
  if (removeVar > -1) {
    splice(removeVar, 1)
    return list
  } else if (removeVar === -1){
    return list;
  }
}
*/
function deleteEntireList(list) {
  for (i = 0; i = list.length; i++) {
    list.splice(0, 1);
  }
  return list
}
////////////////////// Change Class of Element ////////////////////////////////////////////
function changeClass(ofThisId, toThisValue) {
  return document.getElementById(ofThisId).setAttribute("class",toThisValue);
}

//////////////////////////////////////////////// RESET BUTTON //////////////////////////////////////////////////
////////////////// RESET BUTTON ////////////////////// RESET BUTTON ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// RESET BUTTON ///////////////////////// RESET BUTTON //////////////////////////////
////////////////////// RESET BUTTON ////////////////////////////////// RESET BUTTON ////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function resetAll() {
  let identifier = document.getElementById("P1");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Winner");
  document.getElementById("P1").setAttribute("class","Btn");
  identifier = document.getElementById("P2");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Second");
  document.getElementById("P2").setAttribute("class","Btn");
  identifier = document.getElementById("P3");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Third");
  document.getElementById("P3").setAttribute("class","Btn");
  identifier = document.getElementById("P4");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Fourth");
  document.getElementById("P4").setAttribute("class","Btn");
  identifier = document.getElementById("P5");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Fifth");
  document.getElementById("P5").setAttribute("class","Btn");
  identifier = document.getElementById("P6");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Sixth");
  document.getElementById("P6").setAttribute("class","Btn");
  identifier = document.getElementById("P7");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Seventh");
  document.getElementById("P7").setAttribute("class","Btn");
  identifier = document.getElementById("P8");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Eighth");
  document.getElementById("P8").setAttribute("class","Btn");
  identifier = document.getElementById("P9");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Ninth");
  document.getElementById("P9").setAttribute("class","Btn");
  identifier = document.getElementById("P10");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Tenth");
  document.getElementById("P10").setAttribute("class","Btn");
  identifier = document.getElementById("Pole");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Pole Position");
  identifier.setAttribute("class","Btn");
  identifier.setAttribute("data-random", "");
  document.getElementById("poleTime").setAttribute("value", "");
  document.getElementById("poleTime1").setAttribute("value", "");
  document.getElementById("poleTime2").setAttribute("value", "");
  identifier = document.getElementById("Team Delta");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Team Delta");
  document.getElementById("Team Delta").setAttribute("class","Btn");
  identifier = document.getElementById("First Lap");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Best First Lap");
  document.getElementById("First Lap").setAttribute("class","Btn");
  identifier = document.getElementById("MPG");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "MPG");
  document.getElementById("MPG").setAttribute("class","Btn");
  identifier = document.getElementById("DotD");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Driver of the Day");
  document.getElementById("DotD").setAttribute("class","Btn");
  /*identifier = document.getElementById("PSSInput");
  identifier.setAttribute("value", "");
  identifier.setAttribute("name", "");
  document.getElementById("idForPSSGet").innerHTML = "Winning Strategy";
  document.getElementById("PSSInput").setAttribute("class","selectBtn");*/
  identifier = document.getElementById("Fastest");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Fastest Lap");
  document.getElementById("Fastest").setAttribute("class","Btn");
  document.getElementById("raceBtn").setAttribute("class", "finals")
  document.getElementById("raceBtn").setAttribute("value", "Select Race Event")
  document.getElementById("raceBtn").setAttribute("name", "")
  messageModal("All fields reset!")
}
//////// TIMER /////////////////////////// TIMER ////////////////////////////////// TIMER ///////////////////////////////////////////////////
//id of some empty element underneath the race, should have class/value/name equal to the id of the fuckin timer ////////////////////////////
////////////////////////// TIMER FUNCTION INNIT SONE MATE////////////////// TIMER ///////////////////////////////////////////////////////////
///////////// TIMER //////////////// TIMER /////////////////// TIMER /////////////////// TIMER //////////////////////////////////////////////
function countdownTimer(idOfDestination, raceId, deadline) { // "Jan 5, 2021 15:37:25"           of the form Wed Jan 30 2019 01:44:12 GMT+0000 (Greenwich Mean Time)
  setInterval(function() {
    var todaysDate = new Date();
    var timeNow = todaysDate.getTime();
    var countDownDate = new Date(deadline)
    var countDownDateTime = countDownDate.getTime();
    var timeDelta = countDownDateTime - timeNow;
    var days = Math.floor(timeDelta / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDelta % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDelta % (1000 * 60)) / 1000);
    var display = days +  "d " + hours + "h " + minutes + "m " + seconds + "s ";
    document.getElementById(idOfDestination).innerHTML = display;
    if (timeDelta < 0) {
      clearInterval(timeDelta);
      document.getElementById(idOfDestination).innerHTML = "Time to Papaya";
      document.getElementById(raceId).disabled = true;
      if (document.getElementById(raceId).name === document.getElementById("raceBtn").name) {
        messageModal("Deadline Missed!")
        document.getElementById("raceBtn").style.backgroundColor = "rgba(0, 0, 0, 0.08)"
        document.getElementById("raceBtn").setAttribute("name", "");
        document.getElementById("raceBtn").setAttribute("value", "Select Race Event")
      }
    }
  }, 1000);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// XML FORM REQUEST FUNCTIONS ////////////////////////////////////////////////////////////////////////
//////////////// XML FORM REQUEST FUNCTIONS ////////////////////////////////////////////////////////////////////////
//////////////// XML FORM REQUEST FUNCTIONS ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function splitPoleTimeAndDriverPartDriver() {
  let allText = document.getElementById("Pole").value;
  let lengthOfWholeString = allText.length
  let justDriver = allText.substring(7, lengthOfWholeString - 12)
  //alert(justDriver)
  return justDriver
}

function splitPoleTimeAndDriverPartTime() {
  let allText = document.getElementById("Pole").value;
  let lengthOfWholeString = allText.length;
  let justTime = allText.substring(lengthOfWholeString - 9, lengthOfWholeString);
  //alert(justTime)
  return justTime
}

function messageModal(theMessageIs) {
  document.getElementById("messageModalMessage").innerHTML = theMessageIs;
  document.getElementById("myMessageModal").style.display = "block";
  setTimeout(function(){theMessageModal.classList.add('show');},30)
  setTimeout(function(){
    theMessageModal.classList.remove('show');
    document.getElementById("messageModalMessage").innerHTML = "";
    setTimeout(function() {document.getElementById("myMessageModal").style.display = "none"}, 100);
  }, 2000);
}

function checkAllBoolean() {
  if (document.getElementById("P1").name != "" && document.getElementById("P2").name != "" && document.getElementById("P3").name != "" && document.getElementById("P4").name != "" && document.getElementById("P5").name != "" && document.getElementById("P6").name != "" && document.getElementById("P7").name != "" && document.getElementById("P8").name != "" && document.getElementById("P9").name != "" && document.getElementById("P10").name != "" && document.getElementById("Team Delta").name != "" && document.getElementById("First Lap").name != "" && document.getElementById("MPG").name != "" && document.getElementById("DotD").name != "" && document.getElementById("Fastest").name != "" && document.getElementById("poleTime").checkValidity() && document.getElementById("poleTime1").checkValidity() && document.getElementById("poleTime2").checkValidity() && document.getElementById("raceBtn").name !="") {
    return true
  } else {
    if (!(document.getElementById("P1").name != "" && document.getElementById("P2").name != "" && document.getElementById("P3").name != "" && document.getElementById("P4").name != "" && document.getElementById("P5").name != "" && document.getElementById("P6").name != "" && document.getElementById("P7").name != "" && document.getElementById("P8").name != "" && document.getElementById("P9").name != "" && document.getElementById("P10").name != "")) {
      messageModal("Check top ten inputs!")
      return false
    } else if (!(document.getElementById("Team Delta").name != "" && document.getElementById("First Lap").name != "" && document.getElementById("MPG").name != "" && document.getElementById("DotD").name != "" && document.getElementById("Fastest").name != "")) {
      messageModal("Check race event inputs!")
      return false
    }
    else if (!(document.getElementById("poleTime").checkValidity() && document.getElementById("poleTime1").checkValidity() && document.getElementById("poleTime2").checkValidity())) {
      messageModal("Check validity for pole position inputs!")
      return false
    } else if (!(document.getElementById("raceBtn").name !="")) {
      messageModal("Please select a race event!")
      return false
    }
  }
}

async function submitTheForm() {
  let newDriverString = splitPoleTimeAndDriverPartDriver();
  let newTimeString = splitPoleTimeAndDriverPartTime();
  let listDataToSendInForm = [document.getElementById("raceBtn").name, document.getElementById("P1").name, document.getElementById("P2").name, document.getElementById("P3").name, document.getElementById("P4").name, document.getElementById("P5").name, document.getElementById("P6").name, document.getElementById("P7").name, document.getElementById("P8").name, document.getElementById("P9").name, document.getElementById("P10").name, newDriverString, newTimeString,
  document.getElementById("Team Delta").name, document.getElementById("DotD").name, document.getElementById("First Lap").name, document.getElementById("MPG").name, document.getElementById("Fastest").name, "N/A"]
  // Sending and receiving data in JSON format using POST method https://stackoverflow.com/questions/24468459/sending-a-json-to-server-and-retrieving-a-json-in-return-without-jquery
  let objectDataToSendInForm = predictionArrayIntoObject(listDataToSendInForm)
  const data = JSON.stringify(objectDataToSendInForm);
  //ORDER Race, (P1 -- P10), pole driver, pole time, delta, DotD, first lap, mpg, fastest, PSS.
  let points = 0;
  if (checkAllBoolean() === false) {
    //messageModal("Please fill in all input fields!")
  } else if (checkAllBoolean() === true) {
    try {
      //alert("2")
      let responseObject = await fetch('/formSend', {
        method : 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include",
        body : JSON.stringify(objectDataToSendInForm)});
        const ourResponse = await responseObject.json();
        if(ourResponse.success === false) {
          messageModal("Please login!")
        } else if (ourResponse.success === true) {
          myResultModal.style.display = "grid"
          setTimeout(function(){
            myResultModal.style.display = "none"
          }, 2250);
        }
      }
      catch(error) {
    }
  }
}


function predictionArrayIntoObject(chosenArray) {
  let predictionObject = {
      "Race" : chosenArray[0],
      "P1" : chosenArray[1],
      "P2" : chosenArray[2],
      "P3" : chosenArray[3],
      "P4" : chosenArray[4],
      "P5" : chosenArray[5],
      "P6" : chosenArray[6],
      "P7" : chosenArray[7],
      "P8" : chosenArray[8],
      "P9" : chosenArray[9],
      "P10" : chosenArray[10],
      "Pole Driver" : chosenArray[11],
      "Pole Time" : chosenArray[12],
      "Team Driver Delta" : chosenArray[13],
      "Driver of the Day" : chosenArray[14],
      "Best First Lap" : chosenArray[15],
      "Most Positions Gained" : chosenArray[16],
      "Fastest Lap of the Race" : chosenArray[17],
      "Winning Pit Stop Strategy" : chosenArray[18]
    }
    return predictionObject
}
function seamusResultIntoJSON(chosenArray) {
  let predictionObject = {
    "Race" : chosenArray[0],
    "P1" : chosenArray[1],
    "P2" : chosenArray[2],
    "P3" : chosenArray[3],
    "P4" : chosenArray[4],
    "P5" : chosenArray[5],
    "P6" : chosenArray[6],
    "P7" : chosenArray[7],
    "P8" : chosenArray[8],
    "P9" : chosenArray[9],
    "P10" : chosenArray[10],
    "P11" : chosenArray[11],
    "P12" :  chosenArray[12],
    "P13" : chosenArray[13],
    "Pole Driver" : chosenArray[14],
    "Pole Time" : chosenArray[15],
    "Team Driver Delta" : chosenArray[16],
    "Driver of the Day" : chosenArray[17],
    "Best First Lap" : chosenArray[18],
    "Most Positions Gained" : chosenArray[19],
    "Fastest Lap of the Race" : chosenArray[20],
    "Winning Pit Stop Strategy" : chosenArray[21]
  }
  return predictionObject
}



/*    REG MODAL FUNCTIONS AND FRIENDS   let predictionObject = {
  "Race" : chosenArray[0],
  "P1" : chosenArray[1],
  "P2" : chosenArray[2],
  "P3" : chosenArray[3],
  "P4" : chosenArray[4],
  "P5" : chosenArray[5],
  "P6" : chosenArray[6],
  "P7" : chosenArray[7],
  "P8" : chosenArray[8],
  "P9" : chosenArray[9],
  "P10" : chosenArray[10],
  "P11" : chosenArray[11],
  "P12" :  chosenArray[12],
  "P13" : chosenArray[13],
  "Pole Driver" : chosenArray[14],
  "Pole Time" : chosenArray[15],
  "Team Driver Delta" : chosenArray[16],
  "Driver of the Day" : chosenArray[17],
  "Best First Lap" : chosenArray[18],
  "Most Positions Gained" : chosenArray[19],
  "Fastest Lap of the Race" : chosenArray[17],
  "Winning Pit Stop Strategy" : chosenArray[18]
}  */  /*    REG MODAL FUNCTIONS AND FRIENDS     */
/*    REG MODAL FUNCTIONS AND FRIENDS     */  /*    REG MODAL FUNCTIONS AND FRIENDS     */
/*    REG MODAL FUNCTIONS AND FRIENDS     */  /*    REG MODAL FUNCTIONS AND FRIENDS     */

function inputFunction(identity) {
  var x = document.getElementById(identity).value;
  document.getElementById(identity).setAttribute("name", identity + ": " + x)
}
/*
function inputUserFunction(identity) {
  var x = document.getElementById(identity).value;
  document.getElementById(identity).setAttribute("name", identity + ": " + x)
  if (!document.getElementById("username").checkValidity()) {
    document.getElementById("check2").innerHTML = "Username must be at least 8 characters long, and contain no spaces."
  } else if (document.getElementById("username").checkValidity()) {
    document.getElementById("check2").innerHTML = "Thank you!"
    setTimeout(function(){ document.getElementById("check2").innerHTML = "&#10004"; document.getElementById("check2").style.color = "green"; }, 500);
    setTimeout(function(){ document.getElementById("check2").innerHTML = ""; document.getElementById("check2").style.color = "black";}, 1000);
  }
}*/
/*
function inputFirstPassword(idd) {
  var a = document.getElementById(idd).value;
  var b = document.getElementById("psw2").value;
  if (a.length > 7) {
    document.getElementById(idd).setAttribute("name", idd + ": " + a);
    if (a === b) {
      document.getElementById("check").innerHTML = "Ohhh yes they do!";
      setTimeout(function(){ document.getElementById("check").innerHTML = "&#10004"; document.getElementById("check").style.color = "green"; }, 500);
      setTimeout(function(){ document.getElementById("check").innerHTML = ""; document.getElementById("check").style.color = "black";}, 1000);
    } else if (a != b){
        document.getElementById("check").innerHTML = "Passwords do not match"
    }
    } else {
      document.getElementById("check").innerHTML = "Password must be 8 characters long, contain one number and one uppercase letter."
  }
}

function inputSecondPassword(identity) {
  var x = document.getElementById("psw").value;
  var y = document.getElementById(identity).value;
  if (y.length > 7) {
    document.getElementById(identity).setAttribute("name", identity + ": " + y);
    if (y === x) {
      document.getElementById("check").innerHTML = "Ohhh yes they do!";
      setTimeout(function(){ document.getElementById("check").innerHTML = "&#10004";document.getElementById("check").style.color = "green"; }, 500);
      setTimeout(function(){ document.getElementById("check").innerHTML = ""; document.getElementById("check").style.color = "black";}, 1000);
    } else if (y != x) {
        document.getElementById("check").innerHTML = "Passwords do not match"
    }
  } else {
    document.getElementById("check").innerHTML = "Password must be 8 characters long, contain one number and one uppercase letter."
  }
}
*/

function registerScrollFunction(identity) {// need to make it smaller again maybe?
  document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' });
  document.getElementById("changableHeader").innerHTML = "Register";
  document.getElementById("regModalId").style.height = "80vh";
  setTimeout(function() {
    document.getElementById("username").focus();
  }, 250)

}
//           LOGIN FUNCTION       //  //           LOGIN FUNCTION       //
//           LOGIN FUNCTION       //  //           LOGIN FUNCTION       //
//           LOGIN FUNCTION       //  //           LOGIN FUNCTION       //
async function submitTheLoginForm() {
  let variable1 = document.getElementById("loginUsername").value;
  let variable2 = document.getElementById("loginPassword").value;
  let dataLogin = {
    "uname" : variable1,
    "psw": variable2
  };
  try {
    let responseObject = await fetch('/login', {
      method : 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      credentials: "include",
      body : JSON.stringify(dataLogin)});
      if (responseObject.ok) {
        const ourResponse = await responseObject.json();
        let theMessage = ourResponse.message;
        if (ourResponse.success === true) {
          document.getElementById("loginUsername").setAttribute("value", "");
          document.getElementById("loginPassword").setAttribute("value", "");
          document.getElementById("loginUsername").setAttribute("name", "");
          document.getElementById("loginPassword").setAttribute("name", "");
          regModal.style.display = "none";
          document.getElementById("navLogin").innerHTML = "Logout";
          document.getElementById("navLogin").setAttribute( "onClick", "Boo()" );
          messageModal(theMessage);
          if (ourResponse.isSeamus === true) {
            document.getElementById("SeamusSpecial").style.display = "block";
            document.getElementById("ExtraP11").style.display = "block";
            document.getElementById("ExtraP12").style.display = "block";
            document.getElementById("ExtraP13").style.display = "block";
          }
        } else if (ourResponse.success === false) {
          document.getElementById("check3").innerHTML = theMessage;
          //document.getElementById("loginUsername").scrollIntoView({ behavior: 'smooth' })
          setTimeout(function() {document.getElementById("check3").innerHTML = "";}, 2000)
        }
      }
  }
  catch(error) {
  }
}

//           Register FUNCTION       //  //           Register FUNCTION       //
//           Register FUNCTION       //  //           Register FUNCTION       //
//           Register FUNCTION       //  //           Register FUNCTION       //
async function registrationSendFunction() {
  let regVariable1 = document.getElementById("username").value;
  let regVariable2 = document.getElementById("psw2").value;
  let regVariable3 = document.getElementById("city").value;
  let regVariable4 = document.getElementById("email").value;
  let regVariable5 = document.getElementById("nationality").value;
  let regVariable6 = document.getElementById("favourite").value;
  const dateYear = new Date();
  const nowYear = dateYear.getFullYear();
  let registrationDetails = {
    "uname2" : regVariable1,
    "psw2" : regVariable2,
    "city" : regVariable3,
    "emailAddress" : regVariable4,
    "nationality" : regVariable5,
    "favourite" : regVariable6,
    "yearJoined" : nowYear
  }
  if (document.getElementById("username").checkValidity() && document.getElementById("psw").value === document.getElementById("psw2").value) {
    try {
      let responseObject = await fetch('/register', {
        method : 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include",
        body : JSON.stringify(registrationDetails)});
        if (responseObject.ok) {
          const ourResponse = await responseObject.json();
          let theMessage = ourResponse.message;
          if (ourResponse.success === true) {
            document.getElementById("username").setAttribute("value", "");
            document.getElementById("psw2").setAttribute("value", "");
            document.getElementById("psw").setAttribute("value", "");
            document.getElementById("city").setAttribute("value", "");
            document.getElementById("email").setAttribute("value", "");
            document.getElementById("nationality").setAttribute("value", "");
            document.getElementById("favourite").setAttribute("value", "");
            document.getElementById("username").setAttribute("name", "");
            document.getElementById("psw2").setAttribute("name", "");
            document.getElementById("psw").setAttribute("name", "");
            document.getElementById("city").setAttribute("name", "");
            document.getElementById("email").setAttribute("name", "");
            document.getElementById("nationality").setAttribute("name", "");
            document.getElementById("favourite").setAttribute("name", "");
            regModal.style.display = "none";
            document.getElementById("navLogin").innerHTML = "Logout";
            document.getElementById("navLogin").setAttribute( "onClick", "Boo()" );
            document.getElementById("messageModalMessage").innerHTML = theMessage;
            messageModal(theMessage)
          } else if (ourResponse.success === false) {
            messageModal(theMessage)
            document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' })
            //document.getElementById("username").focus()
            setTimeout(function() {document.getElementById("username").focus();}, 5)
          }
        }
      }
      catch(error) {
    }
  } else if (!document.getElementById("username").checkValidity()) {
    document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' })
    setTimeout(function() {
      document.getElementById("username").focus();
      messageModal("Username Invalid!");
  }, 180)
  } else if (document.getElementById("psw").value != document.getElementById("psw2").value) {
    document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' })
    setTimeout(function() {
      document.getElementById("psw").focus();
      messageModal("Passwords do not match!");
    }, 180)
  }
}



function Boo() {
  if (document.getElementById("navLogin").innerHTML === "Logout") {
    logoutFunction();
  }
}
async function logoutFunction() {
  try {
    let responseObject = await fetch('/logout', {
      method : 'POST',
      credentials: "include"});
      if (responseObject.ok) {
        const ourResponse = await responseObject.json();
        let theMessage = ourResponse.message;
        document.getElementById("messageModalMessage").innerHTML = theMessage;
        messageModal(theMessage);
        if (ourResponse.success === true) {
          //regModal.style.display = "none"
          //new modal animation
          document.getElementById("SeamusSpecial").style.display = "none"
          document.getElementById("navLogin").innerHTML = "Login";
          document.getElementById("navLogin").setAttribute( "onClick", "openReg()");
          document.getElementById("ExtraP11").style.display = "none";
          document.getElementById("ExtraP12").style.display = "none";
          document.getElementById("ExtraP13").style.display = "none";
        } else if (ourResponse.success === false) {
          //modal to display the ERROR Message;

        }
      }
    }
    catch(error) {
  }
}

async function getItMate(race) {
  let raceToGet = race;
  let raceName = document.getElementById(race).name
  try {
    let responseObject = await fetch('/getPrediction', {
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include",
        body : JSON.stringify({Race : raceToGet})});
        if (responseObject.ok) {
          const getPredictionObject = await responseObject.json();
          if (getPredictionObject.success === true) {
            let Race = raceName
            raceModal.style.display = "none"
            document.getElementById("raceBtn").setAttribute("name", Race);
            document.getElementById("raceBtn").setAttribute("value", Race);
            let P1 = getPredictionObject.row.First;
            document.getElementById("P1").setAttribute("name", P1);
            document.getElementById("P1").setAttribute("value","P1: "+ P1);
            let P2 = getPredictionObject.row.Second;
            document.getElementById("P2").setAttribute("name", P2);
            document.getElementById("P2").setAttribute("value","P2: "+  P2);
            let P3 = getPredictionObject.row.Third;
            document.getElementById("P3").setAttribute("name", P3);
            document.getElementById("P3").setAttribute("value","P3: "+  P3);
            let P4 = getPredictionObject.row.Fourth;
            document.getElementById("P4").setAttribute("name", P4);
            document.getElementById("P4").setAttribute("value","P4: "+  P4);
            let P5 = getPredictionObject.row.Fifth;
            document.getElementById("P5").setAttribute("name", P5);
            document.getElementById("P5").setAttribute("value","P5: "+  P5);
            let P6 = getPredictionObject.row.Sixth;
            document.getElementById("P6").setAttribute("name", P6);
            document.getElementById("P6").setAttribute("value","P6: "+  P6);
            let P7 = getPredictionObject.row.Seventh;
            document.getElementById("P7").setAttribute("name", P7);
            document.getElementById("P7").setAttribute("value","P7: "+  P7);
            let P8 = getPredictionObject.row.Eighth;
            document.getElementById("P8").setAttribute("name", P8);
            document.getElementById("P8").setAttribute("value","P8: "+  P8);
            let P9 = getPredictionObject.row.Ninth;
            document.getElementById("P9").setAttribute("name", P9);
            document.getElementById("P9").setAttribute("value","P9: "+  P9);
            let P10 = getPredictionObject.row.Tenth;
            document.getElementById("P10").setAttribute("name", P10);
            document.getElementById("P10").setAttribute("value", "P10: "+ P10);
            let PoleD = getPredictionObject.row.PoleD;
            let PoleT = getPredictionObject.row.PoleT;
            let firstPole = PoleT.substring(0,2);
            let secondPole = PoleT.substring(3,5);
            let thirdPole = PoleT.substring(6,9);
            document.getElementById("poleTime").setAttribute("value", firstPole);
            document.getElementById("poleTime1").setAttribute("value", secondPole);
            document.getElementById("poleTime2").setAttribute("value", thirdPole);
            document.getElementById("Pole").setAttribute("name", PoleD);
            document.getElementById("Pole").setAttribute("value", "Pole : "+PoleD + " - " + PoleT);
            document.getElementById("Pole").setAttribute("data-random", PoleT);
            let driverDelta  = getPredictionObject.row.TeamDriver
            document.getElementById("Team Delta").setAttribute("name", driverDelta);
            document.getElementById("Team Delta").setAttribute("value", "Delta: "+ driverDelta);
            let DotD  = getPredictionObject.row.DriverDay
            document.getElementById("DotD").setAttribute("name", DotD);
            document.getElementById("DotD").setAttribute("value", "DotD: "+ DotD);
            let BFL = getPredictionObject.row.BestFirst
            document.getElementById("First Lap").setAttribute("name", BFL);
            document.getElementById("First Lap").setAttribute("value","First Lap: "+  BFL);
            let MPG  = getPredictionObject.row.MostPG
            document.getElementById("MPG").setAttribute("name", MPG);
            document.getElementById("MPG").setAttribute("value", "MPG: "+ MPG);
            let FL  = getPredictionObject.row.FastestLap
            document.getElementById("Fastest").setAttribute("name", FL);
            document.getElementById("Fastest").setAttribute("value","Fastest: "+  FL);
            /*let pit = getPredictionObject.row.Pit
            document.getElementById("PSSInput").setAttribute("name", pit);
            document.getElementById("PSSInput").setAttribute("value", pit);
            document.getElementById("idForPSSGet").innerHTML = "Strategy: "+pit;
            //////////////////////////////////////*/
            messageModal("Predictions loaded!")
            //////////////////////////////////////
          } else if (getPredictionObject.success === false) {
            theMessage = getPredictionObject.message
            messageModal(theMessage);
          }
        }
    }
    catch(error) {
    }
}
async function getOldPredictions() {
  try {
    let responseObject = await fetch('/getOldPrediction', {
      method : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include"
      });
        if (responseObject.ok) {
          const getOldPredictionObject = await responseObject.json();
          if (getOldPredictionObject.success === true) {
            if (!getOldPredictionObject.prediction && !getOldPredictionObject.result) {
              theMessage = getOldPredictionObject.message;
              messageModal(theMessage)
            } else if (getOldPredictionObject.prediction && getOldPredictionObject.result) {
              let predictionObject = getOldPredictionObject.prediction
              let resultObject = getOldPredictionObject.result
              createTable(predictionObject, resultObject)
              document.getElementById("clickForTable").setAttribute("onClick", "deleteTable()")
            }
            //////////////////////////////////////
            //////////////////////////////////////
          } else if (getOldPredictionObject.success === false) {
            theMessage = getOldPredictionObject.message
            messageModal(theMessage);
          }
        }
    }
    catch(error) {
    }
}
function getScore() {
  messageModal("Coming soon buthole")
  /*  async
  try {
    let responseObject = await fetch('/getScore', {
      method : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include",
        body : JSON.stringify({Race : raceToGet})});
        if (responseObject.ok) {
          const getOldPredictionObject = await responseObject.json();
          if (getOldPredictionObject.success === true) {
            //////////////////////////////////////
            //////////////////////////////////////
          } else if (getPredictionObject.success === false) {
            theMessage = getPredictionObject.message
            messageModal(theMessage);
          }
        }
    }
    catch(error) {
    }



  */
}
async function submitTheSeamus() {
  let newDriverString = splitPoleTimeAndDriverPartDriver();
  let newTimeString = splitPoleTimeAndDriverPartTime();
  let listDataToSendInForm = [document.getElementById("raceBtn").name, document.getElementById("P1").name, document.getElementById("P2").name, document.getElementById("P3").name, document.getElementById("P4").name, document.getElementById("P5").name, document.getElementById("P6").name, document.getElementById("P7").name, document.getElementById("P8").name, document.getElementById("P9").name, document.getElementById("P10").name,
  document.getElementById("ExtraP11").name, document.getElementById("ExtraP12").name, document.getElementById("ExtraP13").name, newDriverString, newTimeString,
  document.getElementById("Team Delta").name, document.getElementById("DotD").name, document.getElementById("First Lap").name, document.getElementById("MPG").name, document.getElementById("Fastest").name, "N/A"]
  let objectDataToSendInForm = seamusResultIntoJSON(listDataToSendInForm)
  const data = JSON.stringify(objectDataToSendInForm);
  if ((checkAllBoolean() === false) || (document.getElementById("ExtraP11").hasAttribute("name") === false)|| (document.getElementById("ExtraP12").hasAttribute("name") === false)|| (document.getElementById("ExtraP13").hasAttribute("name") === false)) {
    messageModal("Please fill in all input fields!")
  } else if ((checkAllBoolean() === true) && (document.getElementById("ExtraP11").name != "") && (document.getElementById("ExtraP12").name != "") && (document.getElementById("ExtraP13").name !="")) {
    try {
      //alert("2")
      let responseObject = await fetch('/SeamusSend', {
        method : 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include",
        body : JSON.stringify(objectDataToSendInForm)});
        const ourResponse = await responseObject.json();
        if (ourResponse.success === false) {
          let theMessage = ourResponse.message
          messageModal(theMessage)
        } else if (ourResponse.success === true) {
          let theMessage = ourResponse.message
          messageModal(theMessage);
        }
      }
      catch(error) {
    }
  }
}
function createTable(pred, res) {
  // table headings
  let columnHeadingResults = Object.keys(res)
  // Get the count of columns.
  let columnCount = columnHeadingResults.length;
  // The count of rows.
  let rowCount = Object.keys(res[columnHeadingResults[0]]).length;
  // the strings of the rows
  let rowStrings = Object.keys(res[columnHeadingResults[0]])
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  let table = document.createElement('table');
  table.setAttribute("id", "myTable")
  document.getElementById("data-list").appendChild(table);
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  let header = table.createTHead();
  let row = header.insertRow(-1);
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  let tBody = document.createElement('tbody');
  table.appendChild(tBody);
 //////////////////////////////////////////////////////////////////////////////////////////////////////
 for (var i = 0; i < (2*(columnCount)+1); i++) {
   var headerCell = document.createElement('th');
   if (i === 0) {
     headerCell.innerText = "";
     row.appendChild(headerCell);
     headerCell.style.boxShadow =  "0 rgba(0,0,0,0),0 rgba(0,0,0,0)";
     headerCell.style.zIndex = "0"
     headerCell.setAttribute("id", "descriptionHeader")
   } else if (i === 1) {
     headerCell.innerText = columnHeadingResults[(i-1)/2]
     row.appendChild(headerCell);
     headerCell.setAttribute("id", "raceHeader")
     document.getElementById("raceHeader").colSpan = "2"
     headerCell.style.paddingLeft = "10px"
   } else if ((i%2 === 1) && (i!= 0) && (i!=1)){
     headerCell.innerText = columnHeadingResults[(i-1)/2];
     row.appendChild(headerCell);
     let headerString = "header" + i;
     headerCell.setAttribute("id", headerString)
     document.getElementById(headerString).colSpan = "2"
   }
 }
 ////////////////////////////////////////////////////////////////////////////////////////////////////
 for (var i = 0; i < rowCount - 1; i++) { // each row
   row = tBody.insertRow(-1);
   ///////////////////////////////////////////////////////////////////////////////////////////////////
   for (var j = 0; j < columnCount + 1; j++) { // each column
     let cell = row.insertCell(-1);
     let cell2 = row.insertCell(-1);
     if (j === 0 && i===0) {
       cell.style.backgroundColor = ""
     } else if (j === 0 && i!=0) {
       cell.setAttribute('data-label', columnHeadingResults[j].toUpperCase());
       cell2.setAttribute('data-label', columnHeadingResults[j].toUpperCase());
       cell.innerText = elementArray[i]
       cell.setAttribute("id", "firstRowOfTable")
       cell.style.paddingLeft = "5px"
       cell.style.paddingRight = "5px"
       cell.style.zIndex = "1"
       cell.style.fontStyle = "italic"
       cell.style.boxShadow =  "0.5px 3px 3px rgba(0,0,0,0.1)";
       //cell2.innerText = ""
     } else if (i===0) {
       cell.innerText = "Result"
       cell2.innerText = "Prediction"
       cell.style.fontStyle = "italic"
       cell2.style.fontStyle = "italic"
       cell2.style.paddingRight = "5px"
     } else if (i === 15) {
       cell.setAttribute('data-label', columnHeadingResults[j-1].toUpperCase());
       cell2.setAttribute('data-label', columnHeadingResults[j-1].toUpperCase());
       driverString = res[columnHeadingResults[j-1]][rowStrings[i]];
       driverSubString = driverString.substring(1,9)
       cell.innerText = driverSubString.toUpperCase()
       ////////////////////////////////////////////////////////////////////////////////////
       driverString1 = pred[columnHeadingResults[j-1]][rowStrings[i]];
       driverSubString1 = driverString1.substring(1,9)
       cell2.innerText = driverSubString1.toUpperCase()
     } else if ((i!=11) && (i!=12) && (i!= 13)) {
       cell.setAttribute('data-label', columnHeadingResults[j-1].toUpperCase());
       cell2.setAttribute('data-label', columnHeadingResults[j-1].toUpperCase());
       driverString = res[columnHeadingResults[j-1]][rowStrings[i]];
       driverSubString = driverString.substring(0,3)
       cell.innerText = driverSubString.toUpperCase()
       driverString1 = pred[columnHeadingResults[j-1]][rowStrings[i]];
       driverSubString1 = driverString1.substring(0,3)+ "         "
       cell2.innerText = driverSubString1.toUpperCase()
     } else if ((i===11) || (i===12) || (i===13)) {
       cell.setAttribute('data-label', columnHeadingResults[j-1].toUpperCase());
       cell2.setAttribute('data-label', columnHeadingResults[j-1].toUpperCase());
       driverString = res[columnHeadingResults[j-1]][rowStrings[i]];
       driverSubString = driverString.substring(0,3)
       cell.innerText = driverSubString.toUpperCase()
       cell2.innerText = "  - - "
     }
   }
 }
}
function deleteTable() {
  let removeTab = document.getElementById('myTable');
  var parentEl = removeTab.parentElement;
  parentEl.removeChild(removeTab);
  document.getElementById("clickForTable").setAttribute("onClick", "getOldPredictions()")
}
