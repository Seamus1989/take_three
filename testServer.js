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
    //if (req.body.Race === "The Australian Grand Prix, Albert Park")
    res.send({success : true, message : "Prediction saved!"});
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
      return res.send({ success : true, message : thisWelcomeMessage });
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
function saveData(objectInput, saveToObject) {
  let i;
  for (let i = 0; i < 5; i++) {
    if (!saveToObject[i]) {
      saveToObject[i] = objectInput;
    }
  }
  return saveToObject
}
app.get('/getOldPrediction', function(req, res, next) {
  if (!req.user) {
    res.send({success : false, message : "Please login before loading profile details!"});
  } else if (req.user) {
    res.send({success : true, message : "Not YET MATEEEE!"})
    /*
    let userIdentify = req.user
    let responseObjectOfAllPredictions = {};
    db.serialize(function() {
      db.get("SELECT * FROM Australia WHERE Name = ?", (userIdentify), function(err, row) {
        if(row) {
          console.log(row)
          responseObjectOfAllPredictions["0"] = row;
          saveData(row, responseObjectOfAllPredictions)
        }
      })
      db.get("SELECT * FROM Bahrain WHERE Name = ?", (userIdentify), function(err, row) {
        if(row) {
          console.log(row)
          saveData(row, responseObjectOfAllPredictions)
        }
      })
      db.get("SELECT * FROM China WHERE Name = ?", (userIdentify), function(err, row) {
        if(row) {
          console.log(row)
          saveData(row, responseObjectOfAllPredictions)
        }
      })
      db.get("SELECT * FROM Baku WHERE Name = ?", (userIdentify), function(err, row) {
        if(row) {
          console.log(row)
          saveData(row, responseObjectOfAllPredictions)
        }
      })

    })
    //console.log(responseObjectOfAllPredictions)
    res.send(responseObjectOfAllPredictions)
    /*
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
    }*/
  }
})
