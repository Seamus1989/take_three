const express = require('express');
const app = express();
const port = 3001;
const path = require('path')
const bodyParser = require('body-parser');
const engines = require('consolidate');
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const saltRounds = 10;

app.listen(port, function(){
  console.log('Port listening');
});

let db = new sqlite3.Database('./db.sqlite');

raceObject = {
  "The Australian Grand Prix, Albert Park" : "Australia",
  "The Bahrain Grand Prix, Bahrain International Circuit" : "Bahrain",
  "The Chinese Grand Prix, Shanghai International Circuit" : "China",
  "The Azerbaijan Grand Prix, Baku City Circuit" : "Baku",
  "The Spanish Grand Prix, Circuit de Barcelona-Catalyuna" : "Spain",
  "The Monaco Grand Prix, Monte Carlo" : "Monaco"
}

db.run('CREATE TABLE IF NOT EXISTS tableUsers (Username TEXT, superSecret TEXT, EmailAddress TEXT, Nationality TEXT, Favourite TEXT, City TEXT, Year TEXT)');
////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
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

app.use(expressSession({
  secret: 'mysuperSecretKey that legit nobody knows all about, oh look a friend. HEY FRIEND!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly:false,
    maxAge: 2678400000 // 31 days
  }
}));

//app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Predictions /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//  The whole copy and paste race thing isn't greart. I'm running out of time and CBA to create a solution and debug
app.post('/getPrediction', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please login before requesting predictions!"});
  } else if (req.user) {
    let userIdentify = req.user;
    if (req.body.Race === "AUS") {
      db.get("SELECT * FROM Australia WHERE Name = ?", (userIdentify), function(err, row) {
        if (!row) {
          res.send({success : false, message : "No predictions found for selected event!"})
        } else if (row) {
          res.send({success : true, row})
        }
      });
    } else if (req.body.Race === "BAH") {
      db.get("SELECT * FROM Bahrain WHERE Name = ?", (userIdentify), function(err, row) {
        if (!row) {
          res.send({success : false, message : "No predictions found for selected event!"})
        } else if (row) {
          res.send({success : true, row})
        }
      })
    } else if (req.body.Race === "CHI") {
      db.get("SELECT * FROM China WHERE Name = ?", (userIdentify), function(err, row) {
        if (!row) {
          res.send({success : false, message : "No predictions found for selected event!"})
        } else if (row) {
          res.send({success : true, row})
        }
      })
    } else if (req.body.Race === "AZB") {
      db.get("SELECT * FROM Baku WHERE Name = ?", (userIdentify), function(err, row) {
        if (!row) {
          res.send({success : false, message : "No predictions found for selected event!"})
        } else if (row) {
          res.send({success : true, row})
        }
      })
    } else if (req.body.Race === "ESP") {
      db.get("SELECT * FROM Spain WHERE Name = ?", (userIdentify), function(err, row) {
        if (!row) {
          res.send({success : false, message : "No predictions found for selected event!"})
        } else if (row) {
          res.send({success : true, row})
        }
      });
    } else if (req.body.Race === "MON") {
      db.get("SELECT * FROM Monaco WHERE Name = ?", (userIdentify), function(err, row) {
        if (!row) {
          res.send({success : false, message : "No predictions found for selected event!"})
        } else if (row) {
          res.send({success : true, row})
        }
      });
    }
  }
})

app.post('/SeamusSend', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Ain't nobody got time for that"});
  } else if (req.user === "SeamoMotherfuckinReevo") {
    //res.send({success : false, message : "Ain't nobody got time for that"})
    //console.log("We gunna save some predictions meow.")
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
          res.send({success : false, message : "An error occured, please try again."})
        } else if (!row) {
          db.run('INSERT INTO Results (Race, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, Eleventh, Twelth, Thirteenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [raceEvent, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, eleventh, twelth, thirteenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit], function(err, row) {
            res.send({success : true, message : "Saved! you can change if you need to."});
          });
        } else if (row) {
          db.serialize(function() {
            db.run('DELETE FROM Results WHERE Race = ?', (raceEvent));
            db.run('INSERT INTO Results (Race, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, Eleventh, Twelth, Thirteenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [raceEvent, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth,  eleventh, twelth, thirteenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit], function(err, row) {
              res.send({success : true, message : "Prediction Updated!", values : row});
            });
          })
        }
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    })
  } else if (req.user) {
    res.send({success : false, message : "Ain't nobody got time for that"})
  }
})

app.post('/formSend', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please login before submitting predictions!"});
  } else if (req.user) {
    //console.log(req.body)
    //////////////////////
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
      //console.log("AUS")
      db.serialize(function() {
        db.run('CREATE TABLE IF NOT EXISTS Australia (Name TEXT, First TEXT, Second TEXT, Third TEXT, Fourth TEXT, Fifth TEXT, Sixth TEXT, Seventh TEXT, Eighth TEXT, Ninth TEXT, Tenth TEXT, PoleD TEXT, PoleT TEXT, TeamDriver TEXT, DriverDay TEXT, BestFirst TEXT, MostPG TEXT, FastestLap TEXT, Pit TEXT)');
        db.get('SELECT Name FROM Australia WHERE Name = ?', (userVariable), function(err, row) {
          if(err) {
            console.log(err)
            res.send({success : false, message : "An error occured, please try again."})
          } else if (!row) {
            // Insert
            res.send({success : true, message : "First Submission Saved!"})
            //console.log("!ROW")
            //console.log(row)
            db.run('INSERT INTO Australia (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
          } else if (row) {
            db.serialize(function() {
              db.run('DELETE FROM Australia WHERE Name = ?', (userVariable));
              //console.log("Deleted, new one is ")
              //console.log(row)
              db.run('INSERT INTO Australia (Name, First, Second, Third, Fourth, Fifth, Sixth, Seventh, Eighth, Ninth, Tenth, PoleD, PoleT, TeamDriver, DriverDay, BestFirst, MostPG, FastestLap, Pit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userVariable, first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, poleD, poleT, TDD, DotD, BFL, MPG, FL, pit]);
              res.send({success : true, message : "Prediction Updated!"});
              //console.log("QINQRIFNQRIN")
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
    }
    /* else if () {

    } else if () {

    } else if () {

    } else if () {

    } else if () {

    } else if () {

    }*/
  };
});
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
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
        return done(null, false)
      }
      if (!bcrypt.compareSync(password, row.superSecret)) {  // THIS BIT AINT WORKKKKKEN PROPERLY
        //console.log("Invalid password")
        return done(null, false);
      }
      //console.log(req.sessionID)
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
              console.log("Username already exists!")
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
              db.run('INSERT INTO tableUsers (Username, superSecret, EmailAddress, Nationality, Favourite, City, Year) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstInput, hash, emailAddress, nationality, fave, city, year], function(error) {
              //db.run('INSERT INTO tableUsers (Username, superSecret, EmailAddress, Nationality, Favourite, city, year) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstInput, hash, emailAddress, nationality, fave, city, year], function(error) {
                if (err) {
                  throw err;
                }
                console.log(firstInput + " Just registered!")
                return done(null, firstInput);
              });
            };
          });
        };
        process.nextTick(findOrCreateUser);
      }));

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////
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
      return res.send({ success : false, message : 'Please check your credentials' })
    };
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      let thisWelcomeMessage = "Welcome back, " + user + "!"
      if (user === "SeamoMotherfuckinReevo") {
        let thisWelcomeMessageChamp = thisWelcomeMessage + " , legend"
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
  //console.log("YEP")
  res.send({ success : true, message : "Logged Out!"})
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/getOldPrediction', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please login before loading profile details!"});
  } else if (req.user) {
    let userIdentify = req.user
    let predictionObjectToSend = {};
    let resultObjectToSend = {};
    db.serialize(function() {
      ///////////////////////////////////////////////////////////////////////////////////////////////
      db.get("SELECT * FROM Australia Where Name = ?", (userIdentify), function(err, row) {
        if(!row) {
          predictionObjectToSend["Australia"] = {"Name":"N/A","First":" - - ","Second":" - - ","Third":" - - ","Fourth":" - - ","Fifth":" - - ","Sixth":" - - ","Seventh":" - - ","Eighth":" - - ","Ninth":" - - ","Tenth":" - - ","PoleD":" - - ","PoleT":" - - ","TeamDriver":" - - ","DriverDay":" - - ","BestFirst":" - - ","MostPG":" - - ","FastestLap":" - - ","Pit":" - - "}
        } else if (row) {
          predictionObjectToSend["Australia"] = row;
        }
      })
      db.get("SELECT * FROM Results WHERE Race = ?", ("Australia"), function(err, row) {
        if(!row) {
          //res.send({success : true, message : "Results currently unavailable"})
        } else if (row) {
          resultObjectToSend["Australia"] = row;
        }
      })
      ///////////////////////////////////////////////////////////////////////////////////////////////
      db.get("SELECT * FROM Bahrain Where Name = ?", (userIdentify), function(err, row) {
        if(!row) {
          predictionObjectToSend["Bahrain"] = predictionObjectToSend["Australia"];
        } else if (row) {
          predictionObjectToSend["Bahrain"] = row;
        }
      })
      db.get("SELECT * FROM Results WHERE Race = ?", ("Bahrain"), function(err, row) {
        if(!row) {
          //res.send({success : true, message : "Yeah Buddy", prediction : predictionObjectToSend, result : resultObjectToSend})
        } else if (row) {
          resultObjectToSend["Bahrain"] = row;
        }
      })
      ///////////////////////////////////////////////////////////////////////////////////////////////
      db.get("SELECT * FROM China Where Name = ?", (userIdentify), function(err, row) {
        if(!row) {
          predictionObjectToSend["China"] = predictionObjectToSend["Bahrain"]
        } else if (row) {
          predictionObjectToSend["China"] = row;
        }
      })
      db.get("SELECT * FROM Results WHERE Race = ?", ("China"), function(err, row) {
        if(!row) {
          //res.send({success : true, message : "Yeah Buddy", prediction : predictionObjectToSend, result : resultObjectToSend})
        } else if (row) {
          resultObjectToSend["China"] = row;
        }
      })
      ///////////////////////////////////////////////////////////////////////////////////////////////
    db.get("SELECT * FROM Baku Where Name = ?", (userIdentify), function(err, row) {
      if(!row) {
        predictionObjectToSend["Baku"] = predictionObjectToSend["China"];
      } else if (row) {
        predictionObjectToSend["Baku"] = row;
      }
    })
    db.get("SELECT * FROM Results WHERE Race = ?", ("Baku"), function(err, row) {
      if(!row) {
        //res.send({success : true, message : "Yeah Buddy", prediction : predictionObjectToSend, result : resultObjectToSend})
      } else if (row) {
        resultObjectToSend["Baku"] = row;
      }
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////
    db.get("SELECT * FROM Spain Where Name = ?", (userIdentify), function(err, row) {
      if(!row) {
        predictionObjectToSend["Spain"] = predictionObjectToSend["Baku"];
      } else if (row) {
        predictionObjectToSend["Spain"] = row;
      }
    })
    db.get("SELECT * FROM Results WHERE Race = ?", ("Spain"), function(err, row) {
      if(!row) {
        //res.send({success : true, message : "Yeah Buddy", prediction : predictionObjectToSend, result : resultObjectToSend})
      } else if (row) {
        resultObjectToSend["Spain"] = row;
      }
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////
    db.get("SELECT * FROM Monaco Where Name = ?", (userIdentify), function(err, row) {
      if(!row) {
        predictionObjectToSend["Monaco"] = predictionObjectToSend["Spain"]
      } else if (row) {
        predictionObjectToSend["Monaco"] = row;
      }
      //console.log(Object.entries(predictionObjectToSend).length)
    })
    db.get("SELECT * FROM Results WHERE Race = ?", ("Monaco"), function(err, row) {
      if(!row) {
        res.send({success : true, message : "Yeah Buddy", prediction : predictionObjectToSend, result : resultObjectToSend})
      } else if (row) {
        resultObjectToSend["Monaco"] = row;
        res.send({success : true, message : "Yeah Buddy", prediction : predictionObjectToSend, result : resultObjectToSend})

      } else if (err) {
        console.log(err)
      }
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //res.send(predictionObjectToSend

  })
}
})

// Each time we add races, we need to do the big old list of the following.
// FRONT END - times and disabled - enable.
//Server get prediction (copy/paste with new race names)
// formSend - copy/paste to save users new Predictions
// THEN LASTLY...
//    We have table load, we need to copy paste and change (!row) to previous race.
// get rid of the final res.send in monaco() YEEEE.
// also add to the server side raceObject = {Melbourne, the australian gp : Australia}
