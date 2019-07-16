const express = require('express');
const app = express();
const port = 3001;
const path = require('path')
const bodyParser = require('body-parser');
//const engines = require('consolidate');
const sqlite3 = require('sqlite3')//
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { spawn } = require('child_process') //////////////////////////////// NOT ON SERVER
////////////////////////////////////////////////////////////////////////////////
var cookieParser = require('cookie-parser') //////////////////// NOT ON SERVER

app.use(cookieParser())
////////////////////////////////////////////////////////////////////////////////
app.listen(port, function(){
  console.log('Port listening');
});
////////////////////////////////////////////////////////////////////////////////
let db = new sqlite3.Database('./db.sqlite');
////////////////////////////////////////////////////////////////////////////////

db.run('CREATE TABLE IF NOT EXISTS tableUsers (Username TEXT, superSecret TEXT, EmailAddress TEXT, Nationality TEXT, Favourite TEXT, City TEXT, Year TEXT)');
/*arrayOfResultTables = ["AustraliaUserResults","BahrainUserResults","ChinaUserResults", "BakuUserResults","SpainUserResults","MonacoUserResults"]

db.serialize(function() {
  arrayOfResultTables.forEach(function(element) {
    db.run('CREATE TABLE IF NOT EXISTS '+element+' (Usernames TEXT, Results TEXT)');
  })
})*/
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
//app.engine('html', engines.mustache);
//app.set('view engine', 'html');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'formula_papaya.html'));
});
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Configuring Passport //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const expressSession = require('express-session');
var sqlLiteStore = require('connect-sqlite3')(expressSession);
app.use(expressSession({
  store : new sqlLiteStore,
  secret: 'mysuperSecretKey that legit nobody knows all about, oh look a friend. HEY FRIEND!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly:false,
    maxAge: 26784000000 // 310 days
  }
}));

app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Predictions /////////////////////////////////////////
////////////////// Is user Authenticated ///////////////////////////////////////
app.post('/isAuthenticated', function (req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please log in to submit race predictions."})
  } else if (req.user) {
    if (req.user === "SeamoMotherfuckinReevo") {
      res.send({success : true, message : "Prediction saved!", isSeamus:true})
    } else if (req.user != "SeamoMotherfuckinReevo") {
      res.send({success : true, message : "Prediction saved!", isSeamus:false});
    }
  }
})
////////////////////////////////////////////////////////////////////////////////
//////////// ATTEMPTS TO REWRITE INTO FUNCTIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function getRacePrediction(raceKey, userId, response) {
  let theRaceString = frontEndRaceKeyString[raceKey]
  db.get("SELECT * FROM "+theRaceString+" WHERE Name = ?", (userId), function(err, row) {
    if (!row) {
      response.send({success : false, message : "No predictions found for selected event!"})
    } else if (row) {
      response.send({success : true, row})
    }
  });
}
let frontEndRaceKeyString = {
  "AUS" : "Australia",
  "BAH" : "Bahrain",
  "CHI" : "CHINA",
  "AZB" : "Baku",
  "ESP" : "Spain",
  "MON" : "Monaco",
  "CAN" : "Canada",
  "FRA":"France",
  "RBR":"Austria",
  "BRI" : "Britain",
  "GER" : "Germany",
  "HUN" : "Hungary"
}
app.post('/getUserPredictionToEdit', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please login before requesting predictions!"});
  } else if (req.user) {
    let userIdentify = req.user;
    let events = req.body.Race
    getRacePrediction(events, userIdentify, res)
  }
})

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////     This creates a result table, only for Seamus    ///////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////     This creates a result table, only for Seamus    ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////     This creates a result table, only for Seamus    ///////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
raceObject = {
  "The Australian Grand Prix, Albert Park" : "Australia",
  "The Bahrain Grand Prix, Bahrain International Circuit" : "Bahrain",
  "The Chinese Grand Prix, Shanghai International Circuit" : "China",
  "The Azerbaijan Grand Prix, Baku City Circuit" : "Baku",
  "The Spanish Grand Prix, Circuit de Barcelona-Catalyuna" : "Spain",
  "The Monaco Grand Prix, Monte Carlo" : "Monaco",
  "The Canadian Grand Prix, Circuit Gilles Villneuve": "Canada",
  "The French Grand Prix, Circuit Paul Ricard" : "France",
  "The Austrian Grand Prix, Red Bull Ring" : "Austria",
  "The British Grand Prix, Silverstone Circuit" : "Britain",
  "The German Grand Prix, Hockenheimring" : "Germany",
  "The Hungarian Grand Prix, Hungaroring" : "Hungary"
}
app.post('/SeamusResultsSend', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Ain't nobody got time for that"});
  } else if (req.user === "SeamoMotherfuckinReevo") {
    res.send({success:true, message:"Something is happening"})
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    let userVariable = req.user;
    let raceEventMain = req.body.Race;
    let raceEvent = raceObject[raceEventMain]
    let first = req.body.P1;
    let second = req.body.P2;
    let third = req.body.P3;
    let fourth = req.body.P4;
    let fifth = req.body.P5;
    let sixth = req.body.P6;
    let seventh = req.body.P7;
    let eighth = req.body.P8;
    let ninth = req.body.P9;
    let tenth = req.body.P10;
    let eleventh = req.body.P11;
    let twelth = req.body.P12;
    let thirteenth = req.body.P13;
    let poleD = req.body["Pole Driver"];
    let poleT = req.body["Pole Time"];
    let TDD = req.body["Team Driver Delta"];
    let DotD = req.body["Driver of the Day"];
    let BFL = req.body["Best First Lap"];
    let MPG = req.body["Most Positions Gained"];
    let FL = req.body["Fastest Lap of the Race"];
    let pit =  req.body["Winning Pit Stop Strategy"];
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    db.serialize(function() {
      db.run('CREATE TABLE IF NOT EXISTS Results (Race TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, Eleventh TEXT, Twelth TEXT, Thirteenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
      db.get('SELECT * FROM Results WHERE Race = ?', (raceEvent), function(err, row) {
        if(err) {
          console.log(err)
          //res.send({success : false, message : "An error occured, please try again."})
        } else if (!row) {
          db.run('INSERT INTO Results (Race, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, Eleventh, Twelth, Thirteenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [raceEvent, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, eleventh, twelth, thirteenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit], function(err, row) {
            //res.send({success : true, message : "Saved! you can change if you need to."});
          });
        } else if (row) {
          db.serialize(function() {
            db.run('DELETE FROM Results WHERE Race = ?', (raceEvent));
            db.run('INSERT INTO Results (Race, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, Eleventh, Twelth, Thirteenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [raceEvent, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth,  eleventh, twelth, thirteenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit], function(err, row) {
            });
          })
        }
    })
    db.all("SELECT Username FROM tableUsers", function(err, rows) {
        let resultObjectToSend = {}
        let individualUser
        let returnCalculation = {}
        rows.forEach(function (row) { //switch this in the future to db.each()
          let predictionObjectToSend= {}
          let individualUser = row.Username
          db.serialize(function() {
            db.all("SELECT * FROM Results", function(err, row) {
              resultObjectToSend["main"] = row
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM Australia Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Australia"] = false//{"Name":"N/A","First":" - - ","Second":" - - ","Third":" - - ","Fourth":" - - ","Fifth":" - - ","Sixth":" - - ","Seventh":" - - ","Eighth":" - - ","Ninth":" - - ","Tenth":" - - ","PoleD":" - - ","PoleT":"00:00.000","TeamDriver":" - - ","DriverDay":" - - ","BestFirst":" - - ","MostPG":" - - ","FastestLap":" - - ","Pit":" - - "}
              } else if (row) {
                predictionObjectToSend["Australia"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM Bahrain Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Bahrain"] = predictionObjectToSend["Australia"];
              } else if (row) {

                predictionObjectToSend["Bahrain"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM China Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["China"] = predictionObjectToSend["Bahrain"]
              } else if (row) {
                predictionObjectToSend["China"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM Baku Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Baku"] = predictionObjectToSend["China"];
              } else if (row) {
                predictionObjectToSend["Baku"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM Spain Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Spain"] = predictionObjectToSend["Baku"];
              } else if (row) {
                predictionObjectToSend["Spain"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM Monaco Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Monaco"] = predictionObjectToSend["Spain"];
              } else if (row) {
                predictionObjectToSend["Monaco"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM Canada Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Canada"] = predictionObjectToSend["Monaco"];
              } else if (row) {
                predictionObjectToSend["Canada"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM France Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["France"] = predictionObjectToSend["Canada"];
              } else if (row) {
                predictionObjectToSend["France"] = row;
              }
            })
            /////////////////////////////////////////////////////////////////////////////////////
            db.get("SELECT * FROM Austria Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Austria"] = predictionObjectToSend["France"]
              } else if (row) {
                predictionObjectToSend["Austria"] = row;
              }
            })
            db.get("SELECT * FROM Britain Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Britain"] = predictionObjectToSend["France"];
              } else if (row) {
                predictionObjectToSend["Britain"] = row;
              }
            })
            db.get("SELECT * FROM Germany Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Germany"] = predictionObjectToSend["Britain"];
              } else if (row) {
                predictionObjectToSend["Germany"] = row;
              }
            })
            db.get("SELECT * FROM Hungary Where Name = ?", (individualUser), function(err, row) {
              if(!row) {
                predictionObjectToSend["Hungary"] = predictionObjectToSend["Germany"];
                if (predictionObjectToSend["Australia"] != false) {
                  //console.log(predictionObjectToSend)
                  testing(resultObjectToSend, predictionObjectToSend, raceEvent)
                }
              } else if (row) {
                predictionObjectToSend["Hungary"] = row;
                if (predictionObjectToSend["Australia"] != false) {
                  //console.log(predictionObjectToSend)
                  testing(resultObjectToSend, predictionObjectToSend, raceEvent)
                }
              }
            })
          })// inner db.serialse ends here
          })//end of forEach loop here.
          //Still inside the ALL HERE
        });
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    })
  } else if (req.user) {
    res.send({success : false, message : "Ain't nobody got time for that"})
  }
})
///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Submitting Predictions here mate //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
app.post('/formPredictionSubmission', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please login before submitting predictions!"});
  } else if (req.user) {
    let userVariable = req.user;
    let first = req.body.P1;
    let second = req.body.P2;
    let third = req.body.P3;
    let fourth = req.body.P4;
    let fifth = req.body.P5;
    let sixth = req.body.P6;
    let seventh = req.body.P7;
    let eighth = req.body.P8;
    let ninth = req.body.P9;
    let tenth = req.body.P10;
    let poleD = req.body["Pole Driver"];
    let poleT = req.body["Pole Time"];
    let TDD = req.body["Team Driver Delta"];
    let DotD = req.body["Driver of the Day"];
    let BFL = req.body["Best First Lap"];
    let MPG = req.body["Most Positions Gained"];
    let FL = req.body["Fastest Lap of the Race"];
    let pit =  req.body["Winning Pit Stop Strategy"];
    if (req.body.Race === "The Australian Grand Prix, Albert Park") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Australia (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Australia WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Australia (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Australia WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Australia (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Bahrain Grand Prix, Bahrain International Circuit") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Bahrain (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Bahrain WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Bahrain (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Bahrain WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Bahrain (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Chinese Grand Prix, Shanghai International Circuit") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS China (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM China WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO China (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM China WHERE Name = ?', (userVariable));
              db.run('INSERT INTO China (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Azerbaijan Grand Prix, Baku City Circuit") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Baku (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Baku WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Baku (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Baku WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Baku (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Spanish Grand Prix, Circuit de Barcelona-Catalyuna") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Spain (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Spain WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Spain (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Spain WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Spain (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Monaco Grand Prix, Monte Carlo") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Monaco (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Monaco WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Monaco (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Monaco WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Monaco (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Canadian Grand Prix, Circuit Gilles Villneuve") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Canada (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Canada WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Canada (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Canada WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Canada (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The French Grand Prix, Circuit Paul Ricard") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS France (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM France WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO France (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM France WHERE Name = ?', (userVariable));
              db.run('INSERT INTO France (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Austrian Grand Prix, Red Bull Ring") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Austria (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Austria WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Austria (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Austria WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Austria (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The British Grand Prix, Silverstone Circuit") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Britain (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Britain WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Britain (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Britain WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Britain (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The German Grand Prix, Hockenheimring") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Germany (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Germany WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Germany (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Germany WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Germany (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    } else if (req.body.Race === "The Hungarian Grand Prix, Hungaroring") {
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Hungary (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Hungary WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            res.send({success : true, message : "First Submission Saved!"})
            db.run('INSERT INTO Hungary (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Hungary WHERE Name = ?', (userVariable));
              db.run('INSERT INTO Hungary (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
            })
          };
        });
      });
    }
  };
});
////////////////////////////////////////////////////////////
///////// Hash function for passwords //////////////////////
////////////////////////////////////////////////////////////
let createHash = function(password) {
  return bcrypt.hashSync(password, saltRounds);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN //////////////////////////////////////////////////////
///////////////////////////////////////// STRATEGY /////////////////////////////////////////////////////////////////////
passport.use('login', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'uname',
    passwordField: 'psw'
  },

  function(req, username, password, done) {
    db.get('SELECT superSecret FROM tableUsers WHERE Username = ?', username, function(err, row) { // THIS DONT WORK IF USER AINT THERE
      if (err) {
        console.log(err)
        return done(err)
      }
      if (!row) {
        return done(null, false, {message : "Username not found! Please check your credentials!"})
      }
      if (!bcrypt.compareSync(password, row.superSecret)) {
        return done(null, false, {message : "Incorrect password for "+username+"!"});
      }
      return done(null, username);
    })
  }));
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// REGISTER STRATEGY //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

  passport.use('signup', new LocalStrategy({
      passReqToCallback : true,
      usernameField: 'uname2',
      passwordField: 'psw2'
    },
    function(req, username, password, done) {
        findOrCreateUser = function() {
          let valueToCheck = req.body.uname2;
          db.get('SELECT Username FROM tableUsers WHERE Username = ?', (valueToCheck), function(err, row) {
            if (err) {
              console.log(err)
              return done(err);
            }
            if (row) { //user existsin
              //console.log("Username already exists!")
              return done(null, false);
            } else {
              let firstInput = req.body.uname2;
              let secondInput = req.body.psw2;
              let emailAddress = req.body.emailAddress;
              let nationality = req.body.nationality;
              let fave = req.body.favourite;
              let city = req.body.city;
              let year = req.body.yearJoined;
              let hash = createHash(secondInput);
              if (firstInput.length < 30 && secondInput.length < 30 && emailAddress.length < 30 && nationality.length < 30 && fave.length < 30 && city.length < 30 && year.length < 10) {
                db.run('INSERT INTO tableUsers (Username, superSecret, EmailAddress, Nationality, Favourite, City, Year) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstInput, hash, emailAddress, nationality, fave, city, year], function(error) {
                //db.run('INSERT INTO tableUsers (Username, superSecret, EmailAddress, Nationality, Favourite, city, year) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstInput, hash, emailAddress, nationality, fave, city, year], function(error) {
                  if (err) {
                    throw err;
                  }
                  return done(null, firstInput);
                });
              } else {

              }
            };
          });
        };
        process.nextTick(findOrCreateUser);
      }));

////////////////////////////////////////////////////////////////////////////
///////////  Serialize and DEserialize for requests ////////////////////////
////////////////////////////////////////////////////////////////////////////
passport.serializeUser(function(user, done) {
  return done(null, user);
});
////////////////////////////////////////////////////////////////////////////
passport.deserializeUser(function(user, done) {
  db.get('SELECT Username FROM tableUsers WHERE Username = ?', user, function(err, row) {
    if (!row) {
      return done(null, false);
    }
    return done(null, user); // row is undefined apparently
  });
});
////////////////////////////////////////////////////////////////////////////
////////////// requests for registration ///////////////////////////////////
/////////////// uses the strategy earlier defined //////////////////////////
app.post('/register', function(req, res, next) {
  passport.authenticate('signup', function(err, user, info) {
    if (err) {
      res.send({success : false, message : "Error, please refresh and try again."})
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.send({ success : false, message : 'That username already exists, please try again.' });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      let welcomeMessage = "Welcome " + user +"!"
      return res.send({ success : true, message : welcomeMessage });
    });
  })(req, res, next);
});
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Route for Login /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
app.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) {
    if (err) {
      res.send({success : false, message : "Error connecting with the server, please try again."})
      return next(err);
    }
    if (!user) {
      return res.send({ success : false, message : info.message })
    };
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      let thisWelcomeMessage = "Welcome back, " + user + "!"
      if (user === "SeamoMotherfuckinReevo") {
        let thisWelcomeMessageChamp = thisWelcomeMessage + " Legend"
        return res.send({ success : true, message : thisWelcomeMessageChamp, isSeamus:true });
      } else if (user != "SeamoMotherfuckinReevo") {
        return res.send({ success : true, message : thisWelcomeMessage, isSeamus:false });
      }
    });
  })(req, res, next);
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////// LOG OUT SON /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/logout', function(req, res){
  req.logout();
  res.send({ success : true, message : "Logged Out!"})
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Request for creation of client side table, this sends all results and ///////////////////////////////////////////////////////////////////////
////////////////////////// User predictions to the client, so they can view ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getOldPredictionForTable', function(req, res, next) {
  let theRaceStringRequest = req.query.race
  if (!req.user) {
    res.send({success : false, message : "Please login before loading profile details!"});
  } else if (req.user) {
    let userIdentify = req.cookies.chosenUser
    let predictionObjectToSend = {};
    let resultObjectToSend = {};
    db.get("SELECT * FROM "+theRaceStringRequest+" Where Name = ?", (userIdentify), function(err, row) {
      if(!row) {
        res.send({success : false, message : "Predictions not saved, load previous race!"});
      } else if (row) {
        predictionObjectToSend[theRaceStringRequest] = row;
        res.send({success : true, message : "Success", data :predictionObjectToSend });
      }
    })
  }
})
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// db.get('SELECT * FROM wholeScoresTable WHERE UserID = ?', [usernameIdentifier], function(err, row) {
app.get('/getScore', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please login before loading profile details!"});
  } else if (req.user) {
    let scoreObjectToSend = {}
    db.serialize(function() {//SELECT * FROM COMPANY ORDER BY SALARY ASC;
      db.each('SELECT * FROM wholeScoresTable ORDER BY sum DESC', function(err, row) {
        if (err) {
          console.log(err)
        } else if (row) {
          let individualUser = row.UserID
          if ((individualUser!= "Orbogink") && (individualUser!= "luciereev13") && (individualUser!= "Joshgt87") && (individualUser!= "Kayossf1Team") && (individualUser!= "Jamantmill") && (individualUser!= "SeamoReevus")) {
            scoreObjectToSend[individualUser] = row
          }
        }
      }, function() {
        res.send({success:true, message:"Success!",scores:scoreObjectToSend})
      })
    })
  }
})


///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// Caclulator JS functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
const logOutput = (name) => (message) => console.log(`[${name}] ${message}`)
///////////////////////////////////////////////////
function runAsyncCalc(resultPyPass, predPyPass, firedEvent) {
  return new Promise((resolve, reject) => {
    let resultRaceArray = Object.keys(resultPyPass)
    const process = spawn('python', ['pyScripts/mainCalculator.py', JSON.stringify(resultPyPass), JSON.stringify(predPyPass), firedEvent]);
    const out = []
    process.stdout.on(
      'data',
      (data) => {
        out.push(data);
        //logOutput('stdout')(data);
      }
    );
    const err = []
    process.stderr.on(
      'data',
      (data) => {
        err.push(data);
        //logOutput('stderr')(data);
      }
    );

    process.on('exit', (code, signal) => {
      //logOutput('exit')(`${code} (${signal})`)
      if (code !== 0) {
        reject(new Error(err.join('\n')))
        return
      }
      try {
        //console.log(out[0])
        resolve(JSON.parse(out[0]))
      } catch(e) {
        reject(e);
      }
    });
  });
}
///////////////////////////////////////////////////
async function getTheScore(results, predictions, firedEvent) {
  try {
    const output = await runAsyncCalc(results, predictions, firedEvent)
    //console.log(output)  // KEEEP THI ONE FOR THE MOMENT
    return output
    //process.exit(0) // exit without errors
  } catch (e) {
    console.error('Error during script execution ', e.stack);
    process.exit(1); // exit with error
  }
}
///////////////////////////////////////////////////
async function testing(res, pred, firedEvent) {
  try {
    let outputScoreObject = await getTheScore(res, pred, firedEvent)
    let usernameIdentifier = outputScoreObject["USER"]////////////////////////////////////////// Username
    if (usernameIdentifier != "N/A") {
      let theLatestRace = outputScoreObject["RACE"]
      ///////////////////////////////////////////////////////
      let champVarStringJSON = outputScoreObject["ChampVar"]
      let champVarObject = JSON.parse(champVarStringJSON)
      let latestChampVar = champVarObject[theLatestRace]
      ///////////////////////////////////////////////////////
      //   These contain each driver inside User/Actual /////
      let champVarObjectsJSON = JSON.parse(outputScoreObject["champVarObjects"]);
      let champVarObjectUser = champVarObjectsJSON[usernameIdentifier]
      let champVarObjectActual = champVarObjectsJSON["actual"]
      ///////////////////////////////////////////////////////
      let scoreStringJSON = outputScoreObject["SCORE"]
      let parsedScore = JSON.parse(scoreStringJSON)
      let raceScore = parsedScore["RE"]
      let tenScore = parsedScore["TT"]
      let indiviudalRaceScore = Number(raceScore+tenScore)
      let tTRESum = outputScoreObject["totalSum"] // total scoretotalSum"
      let wholeScore = Number(tTRESum+latestChampVar)
      let objectToSave = {"TT" : tenScore, "LCV" : latestChampVar, "RE" : raceScore, "TOTAL" : wholeScore, "Winner" : parsedScore["Winner"], "Podium" : parsedScore["Podium"], "username" : usernameIdentifier}
      //////////////////////////////////////////////////////////
      let newWholeObject = Object.assign(objectToSave, parsedScore[theLatestRace])
      let mainObjectKeys = Object.keys(parsedScore[theLatestRace])
      var promiseItsLongEnough = new Promise((resolve, reject) => {
        mainObjectKeys.forEach(function(element) {
          objectToSave[element] = parsedScore[theLatestRace][element];
          if (Object.keys(objectToSave).length === 24) {
            resolve();
          }
        });
      });
      promiseItsLongEnough.then(() => {
        //////////////////////////////////////////////////////////
        let p1 = objectToSave["First"];
        let p2 = objectToSave["Second"];
        let p3 = objectToSave["Third"];
        let p4 = objectToSave["Fourth"];
        let p5 = objectToSave["Fifth"];
        let p6 = objectToSave["Sixth"];
        let p7 = objectToSave["Seventh"];
        let p8 = objectToSave["Eighth"];
        let p9 = objectToSave["Ninth"];
        let p10 = objectToSave["Tenth"];
        let tT = objectToSave["TT"];
        let win = objectToSave["Winner"];
        let pod = objectToSave["Podium"];
        let pD = objectToSave["PoleD"];
        let pT = objectToSave["PoleT"];
        let tDelta = objectToSave["TeamDriver"];
        let dotD = objectToSave["DriverDay"];
        let firstLap = objectToSave["BestFirst"];
        let mPG = objectToSave["MostPG"];
        let fastest = objectToSave["FastestLap"];
        let rEvent = objectToSave["RE"];
        //////////////////////////////////////////////////////////
        db.serialize(function() {
          db.run('CREATE TABLE IF NOT EXISTS '+theLatestRace+'ResultScoresNew'+' (Username TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, TTen TEXT, Winner TEXT, Podium TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, REvent TEXT, Total TEXT)')//(Usernames TEXT, Australia TEXT, Bahrain TEXT, China TEXT, Baku TEXT, Spain TEXT, Monaco TEXT, Canada TEXT, France TEXT, Austria TEXT, Britain TEXT, Germany TEXT, Hungary TEXT, Belgium TEXT, Italy TEXT, Singapore TEXT, Russia TEXT, Japan TEXT, Mexico TEXT, USA TEXT, Brazil TEXT, Abu-Dhabi TEXT)')
          db.get('SELECT * FROM '+theLatestRace+'ResultScoresNew'+' WHERE Username = ?', (usernameIdentifier), function(err, row) {
            if (err) {
              console.log(err)
            } else if (!row) {
              db.run('INSERT INTO '+theLatestRace+'ResultScoresNew'+' (Username, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, TTen, Winner, Podium, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, REvent, Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [usernameIdentifier, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, tT, win, pod, pD, pT, tDelta, dotD, firstLap, mPG, fastest, rEvent, indiviudalRaceScore], function(error) {
                if (error) {
                  console.log(error)
                }
              })
            } else if (row) {
              db.run('DELETE FROM '+theLatestRace+'ResultScoresNew'+' WHERE Username = ?', (usernameIdentifier));
              db.run('INSERT INTO '+theLatestRace+'ResultScoresNew'+' (Username, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, TTen, Winner, Podium, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, REvent, Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [usernameIdentifier, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, tT, win, pod, pD, pT, tDelta, dotD, firstLap, mPG, fastest, rEvent, indiviudalRaceScore], function(error) {
                if (err) {
                  console.log(err)
                }
              })
            }
          })
          db.run('CREATE TABLE IF NOT EXISTS wholeScoresTable (UserID TEXT, TTRESum TEXT, latestCV TEXT, sum INTEGER)')
          db.get('SELECT * FROM wholeScoresTable WHERE UserID = ?', (usernameIdentifier), function(err, row) {
            if (err) {
              console.log(err)
            } else if (!row) {
              db.run('INSERT INTO wholeScoresTable (UserID, TTRESum, latestCV, sum) VALUES (?, ?, ?, ?)', [usernameIdentifier, tTRESum, latestChampVar, wholeScore], function(err, rowE) {
                if (err) {
                  console.log(err)
                }
              })
            } else if (row) {
              db.serialize(function() {
                db.run('DELETE FROM wholeScoresTable WHERE UserID = ?', (usernameIdentifier));
                db.run('INSERT INTO wholeScoresTable (UserID, TTRESum, latestCV, sum) VALUES (?, ?, ?, ?)', [usernameIdentifier, tTRESum, latestChampVar, wholeScore], function(err, rowE) {
                  if (err) {
                    console.log(err)
                  }
                })
              })
            }
          })
          db.run('CREATE TABLE IF NOT EXISTS champVarCompleteTable (User INTEGER, Hamilton INTEGER,  Bottas INTEGER,  Vettel INTEGER,  Leclerc INTEGER,  Kubica INTEGER,  Russell INTEGER,  Perez INTEGER,  Stroll INTEGER,  Verstappen INTEGER,  Gasly INTEGER,  Kyvat INTEGER,  Albon INTEGER,  Giovinazzi INTEGER,  Raikkonen INTEGER,  Sainz INTEGER,  Norris INTEGER,  Hulkenberg INTEGER,  Ricciardo INTEGER,  Magnussen INTEGER,  Grosjean INTEGER)')
          db.get('SELECT * FROM champVarCompleteTable WHERE User = ?', (usernameIdentifier) , function(err, row) {
            if (err) {
              console.log(err)
            } else if (!row) {
              db.run('INSERT INTO champVarCompleteTable (User, Hamilton, Bottas, Vettel, Leclerc, Kubica, Russell, Perez, Stroll, Verstappen, Gasly, Kyvat, Albon, Giovinazzi, Raikkonen, Sainz, Norris, Hulkenberg, Ricciardo, Magnussen, Grosjean) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[usernameIdentifier, champVarObjectUser["Hamilton"], champVarObjectUser["Bottas"], champVarObjectUser["Vettel"], champVarObjectUser["Leclerc"], champVarObjectUser["Kubica"], champVarObjectUser["Russell"], champVarObjectUser["Perez"], champVarObjectUser["Stroll"], champVarObjectUser["Verstappen"], champVarObjectUser["Gasly"], champVarObjectUser["Kyvat"], champVarObjectUser["Albon"], champVarObjectUser["Giovinazzi"], champVarObjectUser["Raikkonen"], champVarObjectUser["Sainz"], champVarObjectUser["Norris"], champVarObjectUser["Hulkenberg"], champVarObjectUser["Ricciardo"], champVarObjectUser["Magnussen"], champVarObjectUser["Grosjean"]] , function(err) {
                if (err) {
                  console.log(err)
                }
              })
            } else if (row) {
              db.serialize(function() {
                db.run('DELETE FROM champVarCompleteTable Where User = ?', (usernameIdentifier));
                db.run('INSERT INTO champVarCompleteTable (User, Hamilton, Bottas, Vettel, Leclerc, Kubica, Russell, Perez, Stroll, Verstappen, Gasly, Kyvat, Albon, Giovinazzi, Raikkonen, Sainz, Norris, Hulkenberg, Ricciardo, Magnussen, Grosjean) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[usernameIdentifier, champVarObjectUser["Hamilton"], champVarObjectUser["Bottas"], champVarObjectUser["Vettel"], champVarObjectUser["Leclerc"], champVarObjectUser["Kubica"], champVarObjectUser["Russell"], champVarObjectUser["Perez"], champVarObjectUser["Stroll"], champVarObjectUser["Verstappen"], champVarObjectUser["Gasly"], champVarObjectUser["Kyvat"], champVarObjectUser["Albon"], champVarObjectUser["Giovinazzi"], champVarObjectUser["Raikkonen"], champVarObjectUser["Sainz"], champVarObjectUser["Norris"], champVarObjectUser["Hulkenberg"], champVarObjectUser["Ricciardo"], champVarObjectUser["Magnussen"], champVarObjectUser["Grosjean"]], function(err) {
                  if (err) {
                    console.log(err)
                  }
                })
              })
            }
          })
          db.get('SELECT * FROM champVarCompleteTable WHERE User = ?', ("actualChampionshipResults6089") , function(err, row) {
            if (err) {
              console.log(err)
            } else if (!row) {
              db.run('INSERT INTO champVarCompleteTable (User, Hamilton, Bottas, Vettel, Leclerc, Kubica, Russell, Perez, Stroll, Verstappen, Gasly, Kyvat, Albon, Giovinazzi, Raikkonen, Sainz, Norris, Hulkenberg, Ricciardo, Magnussen, Grosjean) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',["actualChampionshipResults6089", champVarObjectActual["Hamilton"], champVarObjectActual["Bottas"], champVarObjectActual["Vettel"], champVarObjectActual["Leclerc"], champVarObjectActual["Kubica"], champVarObjectActual["Russell"], champVarObjectActual["Perez"], champVarObjectActual["Stroll"], champVarObjectActual["Verstappen"], champVarObjectActual["Gasly"], champVarObjectActual["Kyvat"], champVarObjectActual["Albon"], champVarObjectActual["Giovinazzi"], champVarObjectActual["Raikkonen"], champVarObjectActual["Sainz"], champVarObjectActual["Norris"], champVarObjectActual["Hulkenberg"], champVarObjectActual["Ricciardo"], champVarObjectActual["Magnussen"], champVarObjectActual["Grosjean"]] , function(err) {
                if (err) {
                  console.log(err)
                }
              })
            } else if (row) {
              db.serialize(function() {
                db.run('DELETE FROM champVarCompleteTable Where User = ?', ("actualChampionshipResults6089"));
                db.run('INSERT INTO champVarCompleteTable (User, Hamilton, Bottas, Vettel, Leclerc, Kubica, Russell, Perez, Stroll, Verstappen, Gasly, Kyvat, Albon, Giovinazzi, Raikkonen, Sainz, Norris, Hulkenberg, Ricciardo, Magnussen, Grosjean) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',["actualChampionshipResults6089", champVarObjectActual["Hamilton"], champVarObjectActual["Bottas"], champVarObjectActual["Vettel"], champVarObjectActual["Leclerc"], champVarObjectActual["Kubica"], champVarObjectActual["Russell"], champVarObjectActual["Perez"], champVarObjectActual["Stroll"], champVarObjectActual["Verstappen"], champVarObjectActual["Gasly"], champVarObjectActual["Kyvat"], champVarObjectActual["Albon"], champVarObjectActual["Giovinazzi"], champVarObjectActual["Raikkonen"], champVarObjectActual["Sainz"], champVarObjectActual["Norris"], champVarObjectActual["Hulkenberg"], champVarObjectActual["Ricciardo"], champVarObjectActual["Magnussen"], champVarObjectActual["Grosjean"]] , function(err) {
                  if (err) {
                    console.log(err)
                  }
                })
              })
            }
          })
        })
      });
      //stil inside the try.
    }
  } catch(error) {
    console.log(error)
  }
}

app.get('/user_results', function(req, res, next) {
  if (!req.user) {
    res.send({success:false, message : "Please Log In"})
  } else if (req.user) {
    let individualUser = req.cookies.chosenUser
    let race = req.query.race
    let returnObject = {};
    db.serialize(function() {
      db.get("SELECT * FROM Results WHERE Race = ?", (race), function(err, row) {
        if (row) {
          returnObject["results"] = row
        } else if (err) {
          console.log(err)
        } else if(!row) {
        }
      })
      db.get('SELECT * FROM '+race+'ResultScoresNew'+' WHERE Username = ?', (individualUser), function(err, row) {
        if (row) {
          returnObject["scores"] = row;
        } else if (err){
        }
      })
      db.get("SELECT * FROM "+race+" Where Name = ?", (individualUser), function(err, row) {
        if (err) {
          res.send({success : false, message : "Error, no predictions"})
        } else if (!row) {
          res.send({success : false, message : "None found for selected event"})
        } else if (row) {
          returnObject["prediction"] = row
          if (returnObject["scores"] && returnObject["results"]) {
            res.send({success : true, message:"Scores Loaded!", data:returnObject})
          }
        }
      })
    })
  }
})

app.get('/league_results', function(req, res, next) {
  if (!req.user) {
    res.send({success:false, message : "Please Log In"})
  } else if (req.user) {
    let race = req.query.race
    let returnObject = {};
    db.each('SELECT * FROM '+race+'ResultScoresNew ORDER BY Total DESC', function(err, row) {
      if (err) {
        console.log(err)
      } else if (!row) {
      } else if (row) {
        let individualUser = row.Username;
        if ((individualUser!= "Orbogink") && (individualUser!= "luciereev13") && (individualUser!= "Joshgt87") && (individualUser!= "Kayossf1Team") && (individualUser!= "Jamantmill") && (individualUser!= "SeamoReevus")) {
          let intermediateObject = {
            "RE" : row.REvent,
            "TT" : row.TTen,
            "Total" :row.Total,
            "race" : race
          };
          returnObject[individualUser] = intermediateObject
        }
      }
    }, function() {
      res.send({success:true, message:"Success!",scores:returnObject})
    })
  }
})

app.get("/getChampVar", function(req, res, next) {
  if (!req.user) {
    res.send({success:false, message : "Please Log In"})
  } else if (req.user) {
    let requiredUser = req.cookies.chosenUser
    let returnData = {}
    db.serialize(function() {
      db.get('SELECT * FROM champVarCompleteTable WHERE User = ?' ,(requiredUser), function(err, row) {
        if (err) {
          console.log(err)
        } else if (row) {
          returnData[requiredUser] = row;
        }
      })
      db.get('SELECT * FROM champVarCompleteTable WHERE User = ?',("actualChampionshipResults6089"), function(err, row) {
        if (err) {
          console.log(err)
        } else if (!row) {
          res.send({success:false})
        } else if (row) {
          returnData["actual"] = row;
          res.send({success:true, data : returnData})
        }
      })

    })
  }
})
/*
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// Each time we add races, we need to do the big old list of the following.
// 1. FRONT END - times and disabled -> enable.

//2. Server get prediction (copy/paste with new race names)
    // OR write a function (in the future) that deals with each race.

//3.  formSend - copy/paste to save users new Predictions
// THEN LASTLY... Table request (currently table showing predictions/outcome)
//    We have table load, we need to copy paste and change (!row) to previous race.
    // We can also write a get err second callback function. Write this whole thing into promises.
    // get rid of the final res.send in monaco() YEEEE.

//4. also add to the server side raceObject = {Melbourne, the australian gp : Australia} for other races.
      // also edit frontEndRaceKeyString

// 5. There is a list on the back end PYTHON we need to add to,[ orderedRaceArray] in python calculator. It gives order to the races.
// as they come from the result table in a random order.

 7. // front end, we have the select list. So when I upload results.
 // Need to also add onto the front end.
 // Race list BELOW
//Australia, Bahrain, China, Baku, Spain, Monaco, Canada, France, Austria, Britain, Germany, Hungary, Belgium, Italy, Singapore, Russia, Japan, Mexico, USA, Brazil, Abu-Dhabi

8. We have the table front end, with races as selctions. Need to add to that dont we.
  OR What happens if we click on one and it doesnt exist yet? Can we do that?
 .//////////////////////////////////////////////////////////////////////////////////

 ALSO GOT the front end select menus - these do work for all races though innit SON.
*/


/////send.o set cookie thing on login, or page load, or is authenticated or whatevers.
  //    then creatce request on user name click,
  //    then for each profile request change it do cookie.user or whatever

  // https://stackoverflow.com/questions/48126998/sort-json-by-value-in-descending-order

  // alos check that lot motherfucker.

  // the profile click table system is a bitch son

  //getOldPredictionForTable/?, user_results/?, /getChampVar

  // AND
app.post('/requestParticularUser', function(req, res, next) {
  if(!req.user) {
    res.send({success : false, message : "Please login before loading profile details!", currentUser:"Not Logged In", differentUser : false, score : false});
  } else if(req.user) {
    if (req.body.specifiedUser === "no user") {
      let currentSpecifiedUser = req.user
      res.cookie('chosenUser', currentSpecifiedUser)
      db.get('SELECT * FROM wholeScoresTable WHERE UserID = ?',[currentSpecifiedUser], function(err, row) {
        if (err) {
          console.log(err)
          res.send({success:false, message:"Error", currentUser:req.user, differentUser : false, score : false})
        } else if (!row) {
          res.send({success:false, message : "Profile not found", currentUser:req.user, differentUser : false, score : false})
        } else if (row) {
          res.send({success:true, differentUser:false, message : "Loaded "+currentSpecifiedUser +"'s profile!", currentUser:req.user, score : row})
        }
      })
    } else if (req.body.specifiedUser != "no user") {
      let currentSpecifiedUser = req.body.specifiedUser
      res.cookie('chosenUser', currentSpecifiedUser)
      db.get('SELECT * FROM wholeScoresTable WHERE UserID = ?',[currentSpecifiedUser], function(err, row) {
        if (err) {
          console.log(err)
          res.send({success:false, message:"Error", currentUser:req.user, differentUser : false, score : false})
        } else if (!row) {
          res.send({success:false, message : "Profile not found", currentUser:req.user, differentUser : false, score : false})
        } else if (row) {
          res.send({success:true, differentUser:true,message : "Loaded "+currentSpecifiedUser +"'s profile!", currentUser:currentSpecifiedUser, score : row})
        }
      })
    }
  }
})
