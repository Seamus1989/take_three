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
let elementArray = ["P1", "P2", "P3", "P4", "P5", "P6",  "P7","P8", "P9", "P10", "Pole Driver", "Pole Time", "Team Driver", "DotD", "First Lap", "MPG", "Fastest Lap", "Strategy"]

let tableIndivElementArray = ["P1", "P2", "P3", "P4", "P5", "P6",  "P7","P8", "P9", "P10", "P11", "P12", "P13","Top Ten Score", "Winner", "Podium", "Pole Driver", "Pole Time", "Team Driver", "DotD", "First Lap", "MPG", "Fastest Lap", "Race Events", "Total"]

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Define all the modals ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let modal = document.getElementById('myModal');
let raceModal = document.getElementById("myraceModal");
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
}
function openProfile() {
  theProfileModal.style.display = "grid"
}
/*
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
}*/
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
    messageModal("Please enter a valid value for seconds (ss)", 1300)
  } else if (document.getElementById("poleTime1").value > 999) {
    messageModal("Please enter a valid value for milliseconds (SSS)", 1300)
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

function driverSelectFunction(clicked_id) {
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
  identifier = document.getElementById("Fastest");
  identifier.setAttribute("name", "");
  identifier.setAttribute("value", "Fastest Lap");
  document.getElementById("Fastest").setAttribute("class","Btn");
  document.getElementById("raceBtn").setAttribute("class", "finals")
  document.getElementById("raceBtn").setAttribute("value", "Select Race Event")
  document.getElementById("raceBtn").setAttribute("name", "")
  messageModal("All fields reset!", 1200)
}

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
        messageModal("Deadline Missed!",2000)
        document.getElementById("raceBtn").style.backgroundColor = "rgba(0, 0, 0, 0.08)"
        document.getElementById("raceBtn").setAttribute("name", "");
        document.getElementById("raceBtn").setAttribute("value", "Select Race Event")
      }
    }
  }, 1000);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function splitPoleTimeAndDriverPartDriver() {
  let allText = document.getElementById("Pole").value;
  let lengthOfWholeString = allText.length
  let justDriver = allText.substring(7, lengthOfWholeString - 12)
  return justDriver
}

function splitPoleTimeAndDriverPartTime() {
  let allText = document.getElementById("Pole").value;
  let lengthOfWholeString = allText.length;
  let justTime = allText.substring(lengthOfWholeString - 9, lengthOfWholeString);
  //alert(justTime)
  return justTime
}

function messageModal(theMessageIs, time) {
  document.getElementById("messageModalMessage").innerHTML = theMessageIs;
  document.getElementById("myMessageModal").style.display = "block";
  setTimeout(function(){theMessageModal.classList.add('show');},30)
  setTimeout(function(){
    theMessageModal.classList.remove('show');
    document.getElementById("messageModalMessage").innerHTML = "";
    setTimeout(function() {document.getElementById("myMessageModal").style.display = "none"}, 100);
  }, time);
}

function checkAllBoolean() {
  if (document.getElementById("P1").name != "" && document.getElementById("P2").name != "" && document.getElementById("P3").name != "" && document.getElementById("P4").name != "" && document.getElementById("P5").name != "" && document.getElementById("P6").name != "" && document.getElementById("P7").name != "" && document.getElementById("P8").name != "" && document.getElementById("P9").name != "" && document.getElementById("P10").name != "" && document.getElementById("Team Delta").name != "" && document.getElementById("First Lap").name != "" && document.getElementById("MPG").name != "" && document.getElementById("DotD").name != "" && document.getElementById("Fastest").name != "" && document.getElementById("poleTime").checkValidity() && document.getElementById("poleTime1").checkValidity() && document.getElementById("poleTime2").checkValidity() && document.getElementById("raceBtn").name !="") {
    return true
  } else {
    if (!(document.getElementById("P1").name != "" && document.getElementById("P2").name != "" && document.getElementById("P3").name != "" && document.getElementById("P4").name != "" && document.getElementById("P5").name != "" && document.getElementById("P6").name != "" && document.getElementById("P7").name != "" && document.getElementById("P8").name != "" && document.getElementById("P9").name != "" && document.getElementById("P10").name != "")) {
      messageModal("Check top ten inputs!",1400)
      return false
    } else if (!(document.getElementById("Team Delta").name != "" && document.getElementById("First Lap").name != "" && document.getElementById("MPG").name != "" && document.getElementById("DotD").name != "" && document.getElementById("Fastest").name != "")) {
      messageModal("Check race event inputs!",1400)
      return false
    }
    else if (!(document.getElementById("poleTime").checkValidity() && document.getElementById("poleTime1").checkValidity() && document.getElementById("poleTime2").checkValidity())) {
      messageModal("Check validity for pole position inputs!",1600)
      return false
    } else if (!(document.getElementById("raceBtn").name !="")) {
      messageModal("Please select a race event!", 1400)
      return false
    }
  }
}

async function submitTheForm() {
  let newDriverString = splitPoleTimeAndDriverPartDriver();
  let newTimeString = splitPoleTimeAndDriverPartTime();
  let listDataToSendInForm = [document.getElementById("raceBtn").name, document.getElementById("P1").name, document.getElementById("P2").name, document.getElementById("P3").name, document.getElementById("P4").name, document.getElementById("P5").name, document.getElementById("P6").name, document.getElementById("P7").name, document.getElementById("P8").name, document.getElementById("P9").name, document.getElementById("P10").name, newDriverString, newTimeString,
  document.getElementById("Team Delta").name, document.getElementById("DotD").name, document.getElementById("First Lap").name, document.getElementById("MPG").name, document.getElementById("Fastest").name, "N/A"]
  let objectDataToSendInForm = predictionArrayIntoObject(listDataToSendInForm)
  const data = JSON.stringify(objectDataToSendInForm);
  let points = 0;
  if (checkAllBoolean() === false) {
  } else if (checkAllBoolean() === true) {
    try {
      let responseObject = await fetch('/formPredictionSubmission', {
        method : 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include",
        body : JSON.stringify(objectDataToSendInForm)});
        const ourResponse = await responseObject.json();
        if(ourResponse.success === false) {
          messageModal("Please login!", 1400)
        } else if (ourResponse.success === true) {
          messageModal("Predictions Saved!", 2400)
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
 /*    REG MODAL FUNCTIONS AND FRIENDS     */
/*    REG MODAL FUNCTIONS AND FRIENDS     */
function inputFunction(identity) {
  var x = document.getElementById(identity).value;
  document.getElementById(identity).setAttribute("name", identity + ": " + x)
}

function registerScrollFunction(identity) {// need to make it smaller again maybe?
  document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' });
  document.getElementById("changableHeader").innerHTML = "Register";
  document.getElementById("regModalId").style.height = "80vh";
}
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
          messageModal(theMessage, 1600);
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
            messageModal(theMessage, 1800)
          } else if (ourResponse.success === false) {
            messageModal(theMessage, 1500)
            document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
      catch(error) {
    }
  } else if (!document.getElementById("username").checkValidity()) {
    document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' })
    setTimeout(function() {
      document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' })
      messageModal("Username Invalid!", 1400);
  }, 180)
  } else if (document.getElementById("psw").value != document.getElementById("psw2").value) {
    document.getElementById("Hole").scrollIntoView({ behavior: 'smooth' })
    setTimeout(function() {
      messageModal("Passwords do not match!", 1400);
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
        messageModal(theMessage, 1400);
        if (ourResponse.success === true) {
          document.getElementById("SeamusSpecial").style.display = "none"
          document.getElementById("navLogin").innerHTML = "Login";
          document.getElementById("navLogin").setAttribute( "onClick", "openReg()");
          document.getElementById("ExtraP11").style.display = "none";
          document.getElementById("ExtraP12").style.display = "none";
          document.getElementById("ExtraP13").style.display = "none";
        } else if (ourResponse.success === false) {

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
    let responseObject = await fetch('/getUserPredictionToEdit', {
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
            //////////////////////////////////////*/
            messageModal("Predictions loaded!", 1400)
            //////////////////////////////////////
          } else if (getPredictionObject.success === false) {
            theMessage = getPredictionObject.message
            messageModal(theMessage, 1400);
          }
        }
    }
    catch(error) {
    }
}

async function getOldPredictions(raceString) {
  let url = createRaceTableURLResults("getOldPredictionForTable/?", raceString)
  try {
    let responseObject = await fetch(url, {
      method : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include"
      });
        if (responseObject.ok) {
          const getOldPredictionObject = await responseObject.json();
          if (getOldPredictionObject.success === true) {
            let tableData = getOldPredictionObject.data;
            createTable(tableData)
            document.getElementById("clickForTable").setAttribute("onClick", "deleteTable('myTable', 'clickForTable','getOldPredictions()')")
            //

            ////////////////////////////////////////////////////////////////////////////
          } else if (getOldPredictionObject.success === false) {
            theMessage = getOldPredictionObject.message
            messageModal(theMessage, 1400);
          }
        }
    }
    catch(error) {
    }
}
async function getScores() {
  try {
    let responseObject = await fetch('/getScore', {
      method : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include"});
        if (responseObject.ok) {
          const getScores = await responseObject.json();
          if (getScores.success === true) {
            let allScores = getScores.scores
            createAllUserTable(allScores)
            document.getElementById("clickForLeague").setAttribute('onClick', "deleteTable('myLeagueTable', 'clickForLeague', 'getScores()')")
          } else if (getScores.success === false) {
            theMessage = getScores.message
            messageModal(theMessage, 1400)
          }
        }
    } catch(error) {
    }
}
//,"scores":{"MayTheDownForceBeWithYou":{"UserID":"MayTheDownForceBeWithYou","TTRESum":"69","latestCV":"-
function createAllUserTable(allResults) {
  let userRowStringArray = Object.keys(allResults)
  let columnDataCount = 4 // /TT/RE/CV/TOTAL   // + more for total.
  let rowCount = (userRowStringArray.length)
  let leagueTable = document.createElement('table')
  //////////////////////////////////////////////////
  leagueTable.setAttribute("id", "myLeagueTable")
  document.getElementById("league-data-list").appendChild(leagueTable);
  let headers = leagueTable.createTHead();
  let rows = headers.insertRow(-1)
  let tableBody = document.createElement('tbody')
  leagueTable.style.borderSpacing = "0px"
  leagueTable.style.margin = "20px 10px 20px 20px"
  leagueTable.style.borderRadius = "20px"
  leagueTable.style.border = "0.5px solid black"
  document.getElementById("league-data-list").style.overflowX = "scroll"
  leagueTable.appendChild(tableBody)
  for (let i = 1; i<columnDataCount +1; i++) {// add total later.
    let headerCell = document.createElement('th')
    headerCell.style.width = "80px";
    headerCell.style.borderBottom = "1px solid black"
    headerCell.style.padding = "1px 13px 4px 12px"
    if (i === 1) {
      headerCell.innerText = "Username";
      headerCell.style.textAlign = "left"
      rows.appendChild(headerCell);
    } else if (i===3) {
      headerCell.innerText = "Race Events & Top Ten"
      rows.appendChild(headerCell);
      headerCell.style.padding = "0 5px"
      headerCell.style.textAlign = "center"
    } else if (i===4){
      headerCell.innerText = "Championship Variance"
      rows.appendChild(headerCell);
      headerCell.style.padding = "0 5px"
      headerCell.style.textAlign = "center"
    } else if (i===2) {
      headerCell.innerText = "Total"
      rows.appendChild(headerCell);
      headerCell.style.padding = "0 5px"
      headerCell.style.textAlign = "center"
    }
  }
  for (let j=0 ; j<rowCount ; j++) {
    rows = tableBody.insertRow(-1);
    for (let k = 0; k<columnDataCount;k++) {
      let cell = rows.insertCell(-1);
      if (k===0) {
        cell.style.textAlign = "left"
        cell.style.padding = "1px 3px 4px 12px"
        cell.innerText = userRowStringArray[j]
      } else if (k===2) {
        cell.innerText = allResults[userRowStringArray[j]]["TTRESum"]
      } else if (k===3) {
        cell.innerText = allResults[userRowStringArray[j]]["latestCV"]
      } else if (k===1) {
        cell.innerText = allResults[userRowStringArray[j]]["sum"]
      }
    }
  }

}

async function submitTheSeamus() {
  messageModal("Offline only!", 3000);
  /*let newDriverString = splitPoleTimeAndDriverPartDriver();
  let newTimeString = splitPoleTimeAndDriverPartTime();
  let listDataToSendInForm = [document.getElementById("raceBtn").name, document.getElementById("P1").name, document.getElementById("P2").name, document.getElementById("P3").name, document.getElementById("P4").name, document.getElementById("P5").name, document.getElementById("P6").name, document.getElementById("P7").name, document.getElementById("P8").name, document.getElementById("P9").name, document.getElementById("P10").name,
  document.getElementById("ExtraP11").name, document.getElementById("ExtraP12").name, document.getElementById("ExtraP13").name, newDriverString, newTimeString,
  document.getElementById("Team Delta").name, document.getElementById("DotD").name, document.getElementById("First Lap").name, document.getElementById("MPG").name, document.getElementById("Fastest").name, "N/A"]
  let objectDataToSendInForm = seamusResultIntoJSON(listDataToSendInForm)
  const data = JSON.stringify(objectDataToSendInForm);
  if ((checkAllBoolean() === false) || (document.getElementById("ExtraP11").hasAttribute("name") === false)|| (document.getElementById("ExtraP12").hasAttribute("name") === false)|| (document.getElementById("ExtraP13").hasAttribute("name") === false)) {
    messageModal("Please fill in all input fields!", 1300)
  } else if ((checkAllBoolean() === true) && (document.getElementById("ExtraP11").name != "") && (document.getElementById("ExtraP12").name != "") && (document.getElementById("ExtraP13").name !="")) {
    try {
      let responseObject = await fetch('/SeamusResultsSend', {
        method : 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include",
        body : JSON.stringify(objectDataToSendInForm)});
        const ourResponse = await responseObject.json();
        if (ourResponse.success === false) {
          let theMessage = ourResponse.message
          messageModal(theMessage, 1000)
        } else if (ourResponse.success === true) {
          let theMessage = ourResponse.message
          messageModal(theMessage, 1000);
        }
      }
      catch(error) {
    }
  }*/
}
//,"data":{"Bahrain":{"Name":"SeamoMotherfuckinReevo","First":"Leclerc","Seco
function createTable(info) {
  let raceSelected = Object.keys(info)[0]
  let innerInfo = info[raceSelected]
  let username = innerInfo[Object.keys(innerInfo)[0]]
  let columnNumber = 2;
  let actualDataKeys = Object.keys(innerInfo)
  let actualDataValues = Object.values(innerInfo)
  let rowNumber = actualDataKeys.length
  let table = document.createElement('table');
  table.setAttribute("id", "myTable")
  table.style.borderSpacing = "0px"
  document.getElementById("data-list").appendChild(table);
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  let header = table.createTHead();
  let row = header.insertRow(-1);
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  let tBody = document.createElement('tbody');
  table.style.padding = "10px 10px 10px 20px"
  table.appendChild(tBody);
  for (var i = 0; i < columnNumber; i++) {
    var headerCell = document.createElement('th');
    headerCell.style.border = "1px solid black"
    headerCell.style.padding = "3px 10px 3px 10px"
    if (i === 0) {
      headerCell.innerText = "Selection";
      headerCell.style.borderTopLeftRadius = "10px"
      headerCell.style.borderRight = "none"
      row.appendChild(headerCell);
    } else if (i===1) {
      headerCell.style.borderTopRightRadius = "10px"
      headerCell.innerText = "Prediction";
      row.appendChild(headerCell);
    }
  }
  for (var i = 1; i < rowNumber-1; i++) { // each row
    row = tBody.insertRow(-1);
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    for (var j = 0; j < columnNumber; j++) { // each column
      let cell = row.insertCell(-1);
      if (j===0) {
        cell.style.fontSize = "85%"
        cell.style.padding = "2px 10px 1px 10px"
        cell.style.borderLeft = "1px solid black"
        cell.style.borderBottom = "1px solid black"
        cell.innerText = elementArray[i-1]
        cell.style.fontStyle = "italic"
        if (i===(rowNumber-2)) {
          cell.style.borderBottomLeftRadius = "10px"
        }
      } else if (j===1) {
        cell.style.fontSize = "92%"
        cell.style.borderRight = "1px solid black"
        cell.style.padding = "2px 10px 1px 4px"
        cell.style.borderLeft = "1px solid black"
        cell.style.borderBottom = "1px solid black"
        cell.style.fontWeight = "bold"
        cell.innerText = actualDataValues[i]
        if (i===(rowNumber-2)) {
          cell.style.borderBottomRightRadius = "10px"
        }
      }
    }
  }
}
function deleteTable(table, parent, exFunction) {
  let removeTab = document.getElementById(table);
  var parentEl = removeTab.parentElement;
  parentEl.removeChild(removeTab);
  document.getElementById(parent).setAttribute("onClick", exFunction)
}

var loginOnEnter = document.getElementById("loginPassword");
loginOnEnter.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        submitTheLoginForm()
    }
});
function createRaceTableURLResults(urlBaseString, raceString) {
  let key = 'race='
  let race = raceString
  let resultURL = urlBaseString+key+race
  return resultURL
}

async function raceRequest(arg) {
  let urlRequest = createRaceTableURLResults("user_results/?", arg)
  try {
    let responseObject = await fetch(urlRequest, {
      method : 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      credentials: "include"
      });
      const getScores = await responseObject.json();
      if (responseObject.ok) {
        let message = getScores.message
        if (getScores.success === true) {
          let tableData = getScores.data
          createIndividualRaceTable(tableData)
          document.getElementById("mySelect").setAttribute("onClick", "deleteTable('indivTable', 'mySelect','raceRequest(arg)')")
        } else if (getScores.success === false) {
          messageModal(getScores.message, 2000)
        }
      }
    }
    catch(error) {
    }
}
function createIndividualRaceTable(tableData) {
  let columnNumber = 4;
  let theRace = (tableData.results.Race)
  let allRows = Object.keys(tableData.scores);
  let rowNumbers = (allRows.length);
  let user = tableData.scores.Username;
  let firstRowArray = Object.keys(tableData.results)
  let individualTable = document.createElement('table');
  individualTable.setAttribute("id", "indivTable");
  document.getElementById("indiv-data-list").appendChild(individualTable);
  let headers = individualTable.createTHead();
  let rows = headers.insertRow(-1);
  let indivTBody = document.createElement('tbody');
  individualTable.appendChild(indivTBody);
  individualTable.style.borderSpacing = "0px"
  individualTable.style.margin = "20px 10px 20px 20px"
  individualTable.style.borderRadius = "20px"
  individualTable.style.border = "1px solid black"
  document.getElementById("indiv-data-list").style.overflowX = "scroll"
  for (var i = 0; i < columnNumber; i++) {
    let headerCell = document.createElement('th');
    headerCell.style.width = "80px";
    headerCell.style.borderBottom = "1px solid black"
    headerCell.style.textAlign = "center"
    if (i===0) {
      headerCell.innerText = theRace
      rows.appendChild(headerCell);
    } else if (i===1) {
      headerCell.innerText = "Result"
      rows.appendChild(headerCell);
    } else if (i===2) {
      headerCell.innerText = "Prediction"
      rows.appendChild(headerCell);
    } else if (i===3) {
      headerCell.innerText = "Score"
      rows.appendChild(headerCell);
    }
  }
  for (let j=1 ; j<11 ; j++) {
    rows = indivTBody.insertRow(-1);
    for (let k = 0; k<columnNumber;k++) {
      let cell = rows.insertCell(-1);
      if (k===0) {
        cell.innerText = allRows[j]
        cell.style.borderRight = "1px solid black"
        cell.style.paddingLeft = "5px"
        cell.style.fontStyle = "italic"
        cell.style.textAlign = "left"
      } else if (k===1) {
        cell.innerText = tableData.results[firstRowArray[j]]
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "5px"
      } else if (k===2) {
        cell.innerText = tableData.prediction[firstRowArray[j]]
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "5px"
      } else if (k===3) {
        cell.innerText = tableData.scores[firstRowArray[j]]
      }
    }
  }
  let plusArray = ["Eleventh", "Twelth", "Thirteenth", "Top Ten", "Winner", "Podium"]
  for (let j=0 ; j<6 ; j++) {
    rows = indivTBody.insertRow(-1);
    for (let k = 0; k<columnNumber;k++) {
      let cell = rows.insertCell(-1);
      if (k===0) {
        cell.style.paddingLeft = "5px"
        cell.style.borderRight = "1px solid black"
        cell.style.textAlign = "left"
        cell.style.fontStyle = "italic"
        cell.innerText = plusArray[j]
        if (j===3) {
          cell.style.fontWeight = "bold"
          cell.style.fontStyle = "normal"
          cell.style.borderTop = "1px solid black"
          cell.style.borderBottom = "1px solid black"
        }
      } else if (k===1  && j<3) {
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "5px"
        cell.innerText = tableData.results[plusArray[j]]
      } else if (k===1  && j!=3) {
        cell.innerText = " - - "
      } else if(k===1  && j===3) {
        cell.style.borderTop = "1px solid black";
        cell.style.borderBottom = "1px solid black";
      } else if(k===2 && j!=3) {
        cell.innerText = " - - "
      } else if(k===2  && j===3) {
        cell.style.borderTop = "1px solid black";
        cell.style.borderBottom = "1px solid black";
      } else if(k===3 && j===3) {
        cell.style.fontWeight = "bold";
        cell.innerText = tableData.scores["TTen"];
        cell.style.borderTop = "1px solid black";
        cell.style.borderBottom = "1px solid black";
      } else if(k===3 && j===4) {
        if (tableData.scores["Winner"]==="1") {
          cell.innerText = "8"
        } else {
          cell.innerText = "0"
        }
      } else if(k===3 && j===5) {
        if (tableData.scores["Podium"]==="1") {
          cell.innerText = "8"
        } else {
          cell.innerText = "0"
        }
      } else if (k===3) {
        cell.innerText = "0"
      }
    }
  }
  let rEArray = ["PoleD","PoleT","TeamDriver","DriverDay","BestFirst","MostPG","FastestLap"]
  for (let z = 0; z<rEArray.length; z++) {
    rows = indivTBody.insertRow(-1);
    for (let k = 0; k<columnNumber;k++) {
      let cell = rows.insertCell(-1);
      if (k===0) {
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "5px"
        cell.style.borderRight = "1px solid black"
        cell.style.fontStyle = "italic"
        cell.innerText = rEArray[z]
      } else if (k===1) {
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "5px"
        cell.innerText = tableData.results[rEArray[z]]
      } else if (k===2) {
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "5px"
        cell.innerText = tableData.prediction[rEArray[z]]
      } else if (k===3) {
        cell.innerText = tableData.scores[rEArray[z]]
      }
    }
  }
  row = indivTBody.insertRow(-1);
  for (let l = 0; l<columnNumber;l++) {
    cell = row.insertCell(-1);
    if (l===0) {
      cell.style.fontWeight = "bold"
      cell.innerText ="Race Events"
      cell.style.borderTop = "1px solid black"
      cell.style.borderRight = "1px solid black"
    } else if (l===3) {
      cell.style.borderTop = "1px solid black"
      cell.style.fontWeight = "bold"
      cell.innerText = tableData.scores["REvent"]
    } else {
      cell.style.borderTop = "1px solid black"
      cell.innerText =""
    }
  }
  rows = indivTBody.insertRow(-1);
  for (let k = 0; k<columnNumber;k++) {
    let cell = rows.insertCell(-1);
    if (k===0) {
      cell.innerText ="Total"
      cell.style.borderTop = "1px solid black"
      cell.style.fontWeight = "bold"
    } else if (k===3) {
      cell.style.borderTop = "1px solid black"
      cell.style.fontWeight = "bold"
      cell.innerText = tableData.scores["Total"]
    } else {
      cell.innerText =""
      cell.style.borderTop = "1px solid black"
    }
  }
}
function showSelectMenu() {
  document.getElementById("indiv-data-list").style.display = "block"
  document.getElementById("profileSelection").style.display = "block"
  document.getElementById("changeFuncProHeader").setAttribute("onclick", "hideSelectMenu()")
}
function hideSelectMenu() {
  document.getElementById("profileSelection").style.display = "none"
  document.getElementById("indiv-data-list").style.display = "none"
  document.getElementById("changeFuncProHeader").setAttribute("onclick", "showSelectMenu()")
}


function showSelectMenu2() {
  document.getElementById("indiv-league-data-list").style.display = "block"
  document.getElementById("profileSelection2").style.display = "block"
  document.getElementById("changeFuncProHeader2").setAttribute("onclick", "hideSelectMenu2()")
}
function hideSelectMenu2() {
  document.getElementById("profileSelection2").style.display = "none"
  document.getElementById("indiv-league-data-list").style.display = "none"
  document.getElementById("changeFuncProHeader2").setAttribute("onclick", "showSelectMenu2()")
}


function showSelectMenu3() {
  document.getElementById("data-list").style.display = "block"
  document.getElementById("profileSelection3").style.display = "block"
  document.getElementById("clickForTable").setAttribute("onclick", "hideSelectMenu3()")
}
function hideSelectMenu3() {
  document.getElementById("profileSelection3").style.display = "none"
  document.getElementById("data-list").style.display = "none"
  document.getElementById("clickForTable").setAttribute("onclick", "showSelectMenu3()")
}

async function raceRequestLeague(raceforURL) {
  let theURLRequest = createRaceTableURLResults("league_results/?", raceforURL);
  try {
    let responseObject = await fetch(theURLRequest, {
      method : 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
      credentials: "include"
      });
      const getScores = await responseObject.json();
      if (responseObject.ok) {
        if (getScores.success === true) {
          let usernameArray = Object.keys(getScores.scores)
          if ((usernameArray.length) > 0) {
            let tableData = getScores.scores
            createLeagueRaceTable(tableData)
            document.getElementById("mySelect2").setAttribute("onClick", "deleteTable('indivLeagueTable', 'mySelect2','raceRequestLeague(raceforURL)')")
          } else if (usernameArray.length ===0) {
            messageModal("No scores for selected event!", 2000)
          }
        } else if (getScores.success === false) {
          messageModal("Please Log in", 2000)
        }
      }
    }
    catch(error) {
    }
}
function createLeagueRaceTable(data) {
  let usernames = Object.keys(data);
  let columnNumbers = 4;//user, RE, TT, Total
  let rowNumbers = usernames.length;
  let rACE = data[usernames[0]]["race"]
  ////////////////////////////////////////////////////////
  let individualLeagueTable = document.createElement('table');
  individualLeagueTable.setAttribute("id", "indivLeagueTable");
  document.getElementById("indiv-league-data-list").appendChild(individualLeagueTable);
  let theHeaders = individualLeagueTable.createTHead();
  let rows = theHeaders.insertRow(-1);
  let theBody = document.createElement('tbody')
  individualLeagueTable.appendChild(theBody);
  document.getElementById("indiv-league-data-list").style.overflowX = "scroll"
  individualLeagueTable.style.borderSpacing = "0px"
  individualLeagueTable.style.margin = "20px 10px 20px 20px"
  individualLeagueTable.style.borderRadius = "10px"
  individualLeagueTable.style.border = "1px solid black"
  ////////////////////////////////////////////////////////
  for (var i = 0; i < columnNumbers; i++) {
    let headerCell = document.createElement('th');
    headerCell.style.width = "80px";
    headerCell.style.borderBottom = "1px solid black"
    headerCell.style.textAlign = "center"
    if (i===0) {
      headerCell.innerText = rACE
      rows.appendChild(headerCell);
    } else if (i===1) {
      headerCell.innerText = "Top Ten"
      rows.appendChild(headerCell);
    } else if (i===2) {
      headerCell.innerText = "Race Events"
      rows.appendChild(headerCell);
    } else if (i===3) {
      headerCell.innerText = "Total"
      rows.appendChild(headerCell);
    }
  }


  for (let j=0 ; j<rowNumbers ; j++) {
    rows = theBody.insertRow(-1);
    for (let k = 0; k<columnNumbers; k++) {
      let cell = rows.insertCell(-1);
      if (k===0) {
        cell.innerText = usernames[j]
        cell.style.borderRight = "1px solid black"
        cell.style.paddingLeft = "5px"
        cell.style.textAlign = "left"
      } else if (k===1) {
        cell.innerText = data[usernames[j]]["TT"]
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "10px"
      } else if (k===2) {
        cell.innerText = data[usernames[j]]["RE"]
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "10px"
      } else if (k===3) {
        cell.innerText = data[usernames[j]]["Total"]
        cell.style.fontWeight = "bold"
      }
    }
  }
}
async function champVarRequest() {
  try {
    let responseObject = await fetch('/getChampVar', {
      method : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        credentials: "include"
      });
        if (responseObject.ok) {
          const champVarObject = await responseObject.json();
          if (champVarObject.success === true) {
            createChampVarTable(champVarObject.data)
            document.getElementById("champVarListElement").setAttribute("onclick", "deleteTable('champVarianceTable','champVarListElement','champVarRequest()')")

          }
        }
      }
      catch(e) {
        alert(e)
      }
}
function createChampVarTable(info) {
  let listToSum = []
  let realChamp = info.actual;
  let username = Object.keys(info)[0]
  let driverList = Object.keys(info[username])
  let columnNumbers = 5;
  let rowNumbers = (driverList.length)-1;
  ////////////////////////////////////////////////////////
  let champVarTable = document.createElement('table');
  champVarTable.setAttribute("id", "champVarianceTable");
  document.getElementById("data-champ-var").appendChild(champVarTable);
  let theHeaders = champVarTable.createTHead();
  let rows = theHeaders.insertRow(-1);
  let theBody = document.createElement('tbody')
  champVarTable.appendChild(theBody);
  document.getElementById("data-champ-var").style.overflowX = "scroll"
  champVarTable.style.borderSpacing = "0px"
  champVarTable.style.margin = "20px 10px 20px 20px"
  champVarTable.style.borderRadius = "10px"
  champVarTable.style.border = "1px solid black"
  champVarTable.style.fontSize = "70%"
  for (var i = 0; i < columnNumbers; i++) {
    let headerCell = document.createElement('th');
    headerCell.style.borderBottom = "1px solid black"
    headerCell.style.textAlign = "center"
    headerCell.style.fontSize = "80%"
    if (i===0) {
      headerCell.style.width = "60px";
      headerCell.innerText = "Driver"
      rows.appendChild(headerCell);
    } else if (i===1) {
      headerCell.style.width = "60px";
      headerCell.innerText = "Actual Championship Points"
      rows.appendChild(headerCell);
    } else if (i===2){
      headerCell.style.width = "60px";
      headerCell.innerText = "User Championship Points"
      rows.appendChild(headerCell);
    } else if (i===3){
      headerCell.innerText = "Point Delta"
      headerCell.style.width = "40px";
      rows.appendChild(headerCell);
    } else if (i===4){
      headerCell.innerText = "Delta Value Squared"
      rows.appendChild(headerCell);
      headerCell.style.width = "40px";
    }
  }
  for (let j=0 ; j<rowNumbers ; j++) {
    rows = theBody.insertRow(-1);
    for (let k = 0; k<columnNumbers; k++) {
      let cell = rows.insertCell(-1);
      if (k===0) {
        cell.style.textAlign = "left"
        cell.style.paddingLeft = "6px"
        cell.style.paddingRight = "4px"
        cell.style.borderRight = "1px solid black";
        cell.innerText = driverList[j+1]
      } else if (k===1) {
        cell.innerText = realChamp[driverList[j+1]];
        cell.style.borderRight = "1px solid black";
        if (j!=rowNumbers-1) {
          cell.style.borderBottom = "1px solid black";
        }
      } else if (k===2) {
        cell.innerText = info[username][driverList[j+1]];
        cell.style.borderRight = "1px solid black";
        if (j!=rowNumbers-1) {
          cell.style.borderBottom = "1px solid black";
        }
      } else if (k===3) {
        cell.style.borderRight = "1px solid black";
        if ((info[username][driverList[j+1]]-realChamp[driverList[j+1]])>0) {
          cell.innerText = "+"+(info[username][driverList[j+1]]-realChamp[driverList[j+1]]);
        } else {
          cell.innerText = (info[username][driverList[j+1]]-realChamp[driverList[j+1]]);
        }
      } else if (k===4) {
        let varSq = (realChamp[driverList[j+1]]-info[username][driverList[j+1]]);
        cell.innerText = Math.pow(varSq, 2);
        let varSqq = Math.pow(varSq, 2);
        listToSum.push(varSqq)
      }
    }
  }
  for (let a=0 ; a<3 ; a++) {
    rows = theBody.insertRow(-1);
    for (let b = 0; b<columnNumbers; b++) {
      let cell = rows.insertCell(-1);
      if (b===0) {
        cell.innerText = ""
        if (a===0) {
          cell.style.borderTop = "1px solid black";
        }
      } else if (b===1) {
        cell.innerText = ""
        if (a===0) {
          cell.style.borderTop = "1px solid black";
        }
      } else if (b===2) {
        cell.style.borderRight = "1px solid black";
        cell.innerText = ""
        if (a===0) {
          cell.style.borderTop = "1px solid black";
        }
      } else if (b===3) {
        cell.style.fontWeight = "bold";
        cell.style.borderTop = "1px solid black";
        cell.style.borderRight = "1px solid black";
        if (a===0) {
          cell.style.textAlign = "left"
          cell.style.paddingLeft = "5px"
          cell.style.fontSize = "75%"
          cell.innerText = "Value Summed"
        } else if (a===1) {
          cell.style.textAlign = "left"
          cell.style.paddingLeft = "5px"
          cell.style.fontSize = "75%"
          cell.innerText = "Square Root"
        } else if (a===2) {
          cell.style.textAlign = "left"
          cell.style.paddingLeft = "5px"
          cell.style.fontSize = "75%"
          cell.innerText = "Rounded"
        }
      } else if (b===4) {
        cell.style.borderTop = "1px solid black";
        let total = listToSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        let sqRoot = Math.sqrt(total);
        var decimal = sqRoot.toFixed(2);
        var rounded = sqRoot.toFixed(0);
        if (a===0) {
          cell.innerText = total
        } else if (a===1) {
          cell.innerText = decimal;
        } else if (a===2) {
          cell.style.fontSize = "110%";
          cell.style.fontWeight = "bold"
          cell.innerText = rounded;
        }
      }
    }
  }
}

/*
document.getElementById("mySelect2").setAttribute("onClick", "deleteTable('indivLeagueTable', 'mySelect2','raceRequestLeague(raceforURL)')"
*/
