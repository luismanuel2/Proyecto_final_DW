const SERVICE_STATUS = require("../constants/status/serviceStatus");
const { generateJwt } = require("../helpers/jwt");
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcryptjs");

const login = async (credentials) => {
  let responseObj = {
    status: SERVICE_STATUS.FAILED,
  };
  const { email, password } = credentials;
  try {
    const db = new sqlite3.Database('./database.db');
    await new Promise((resolve, reject) => {
      db.all("SELECT email, password FROM users WHERE email == '"+email+"' LIMIT 1", [], (err, rows) => {
        if (err) {
          throw err;
        }
        if(rows.length) {
          if(rows[0].email == email && bcrypt.compareSync(password, rows[0].password)) {
            responseObj.status = SERVICE_STATUS.SUCCESSFUL;
            const token = generateJwt({
              email: email,
            });
            responseObj.data = {
              token: token,
              user: email,
            };
          }
          resolve();
        }
        else {
          reject();
        }
      });
      db.close();
    })
  } catch (err) {
    console.log("Something went wrong: Service: authenticate user:", err);
  }
  return responseObj;
};


const remove = async (credentials) => {
  let responseObj = {
    status: SERVICE_STATUS.FAILED,
  };
  const { email, password } = credentials;
  try {
    let db = new sqlite3.Database('./database.db');
    let correct = false;
    await new Promise((resolve, reject) => {
      db.all("SELECT email, password FROM users WHERE email == '"+email+"' LIMIT 1", [], (err, rows) => {
        if (err) {
          throw err;
        }
        if(rows.length) {
          if(rows[0].email == email && bcrypt.compareSync(password, rows[0].password)) {
            correct = true;
          }
          resolve();
        }
        else {
          reject();
        }
      });
      db.close();
    })
    if(correct == false)
      return responseObj;
    console.log(correct);
    db = new sqlite3.Database('./database.db');
    await new Promise((resolve, reject) => {
      db.serialize(function() {
        db.run("DELETE FROM users WHERE email == '"+email+"'", function(err){
          if(err == null) {
            responseObj.status = SERVICE_STATUS.SUCCESSFUL;
            responseObj.data = {
              email: email
            };
            resolve();
          }
          else {
            reject();
          }
        });
      });
      db.close();
    })
  } catch (err) {
    console.log("Something went wrong: Service: authenticate user:", err);
  }
  return responseObj;
};

const update = async (credentials) => {
  let responseObj = {
    status: SERVICE_STATUS.FAILED,
  };
  const { email, password, password1 } = credentials;
  console.log(credentials);
  try {
    let db = new sqlite3.Database('./database.db');
    let correct = false;
    await new Promise((resolve, reject) => {
      db.all("SELECT email, password FROM users WHERE email == '"+email+"' LIMIT 1", [], (err, rows) => {
        if (err) {
          throw err;
        }
        if(rows.length) {
          if(rows[0].email == email && bcrypt.compareSync(password, rows[0].password)) {
            correct = true;
          }
          resolve();
        }
        else {
          reject();
        }
      });
      db.close();
    })
    if(correct == false)
      return responseObj;
    console.log(correct);
    db = new sqlite3.Database('./database.db');
    const hashedPassword = await bcrypt.hash(password1, 10);
    await new Promise((resolve, reject) => {
      db.serialize(function() {
        db.run("UPDATE users SET password = '"+hashedPassword+"' WHERE email == '"+email+"'", function(err){
          if(err == null) {
            responseObj.status = SERVICE_STATUS.SUCCESSFUL;
            responseObj.data = {
              email: email
            };
            resolve();
          }
          else {
            reject();
          }
        });
      });
      db.close();
    })
  } catch (err) {
    console.log("Something went wrong: Service: authenticate user:", err);
  }
  console.log(responseObj);
  return responseObj;
};

const signUp = async (credentials) => {
  let responseObj = {
    status: SERVICE_STATUS.FAILED,
  };
  const { email, password } = credentials;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const db = new sqlite3.Database('./database.db');
    await new Promise((resolve, reject) => {
      db.serialize(function() {
        db.run("INSERT INTO users VALUES ('"+email+"', '"+hashedPassword+"')", function(err){
          if(err == null) {
            responseObj.status = SERVICE_STATUS.SUCCESSFUL;
            responseObj.data = {
              email: email
            };
            resolve();
          }
          else {
            reject();
          }
        });
      });
      db.close();
    })
  } catch (err) {
    console.log("Something went wrong: Service: authenticate user:", err);
  }
  return responseObj;
};

const getCurrentUser = async (credentials) => {
  let responseObj = {
    status: SERVICE_STATUS.FAILED,
  };
  const { email } = credentials;
  try {
    const db = new sqlite3.Database('./database.db');
    await new Promise((resolve, reject) => {
      db.all("SELECT * FROM users WHERE email == '"+email+"' LIMIT 1", [], (err, rows) => {
        if (err) {
          throw err;
        }
        if(rows.length) {
          if(rows[0].email == email) {
            responseObj.status = SERVICE_STATUS.SUCCESSFUL;
            responseObj.data = {
              user: rows[0],
            };
          }
          resolve();
        }
        else {
          reject();
        }
      });
      db.close();
    })
  } catch (err) {
    console.log("Something went wrong: Service: get current user:", err);
  }
  return responseObj;
};

module.exports = {
  login,
  remove,
  update,
  signUp,
  getCurrentUser
};
