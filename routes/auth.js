var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const hash = await bcrypt.hash(password, saltRounds);
  
      await db(
        `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
      );
  
      res.send({ message: "Register successful" });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      console.log(`This is the username: ${username}`)
      const results = await db(
        `SELECT * FROM users WHERE username = "${username}"`
      );
      console.log(results)
      console.log(results.data)
      console.log(results[0])

      const user = results[0];
  
      if (user) {
      // create a variable with the user id
      const user_id = user.id;
  
     // compare the password with the hashed password
      const correctPassword = await bcrypt.compare(password, user.password);
  
     //if the password is incorrect, throw an error (same as a return)
      if (!correctPassword) throw new Error("Incorrect password");
  
      // create a token with a payload and a secret
      // the payload is an object and we gonna add the user_id in it 
      // { user_id } is the same as { user_id: user_id}
       const token = jwt.sign({ user_id }, supersecret);
      // sign allows us to generate the token
      res.send({ message: "Login successful, here is your token", token });
      } else {
        throw new Error("User does not exist");
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  });

  /* DO I NEED THIS ENDPOINT? YES, RIGHT?
  SOFIA SAID THIS ENDPONT NEEDS TO BE PROTECTED SO OTHERS CAN'T ACCESS THIS PROFILE 
  is router.get("/profile", (req, res) => {});
  */

  module.exports = router;