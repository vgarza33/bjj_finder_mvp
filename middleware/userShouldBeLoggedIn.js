var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

const userShouldBeLoggedIn = (req, res, next) => {
  console.log("HELLO FROM THE MIDDLEWARE");
  // it should select * from users from the user that is logged in
  //the only way to get the user id is from the token
  const token = req.headers.authorization?.replace(/^Bearer\s/, "");
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
    return;
  } else {
    //the verify takes 3 arguments, the token, the secret and a callback function
    // the cb function will have 2 arguments, an error and the decoded payload
    jwt.verify(token, supersecret, function (err, decoded) {
      // if there is an error verifying the token, we will send an error
      if (err) res.status(401).send({ message: err.message });
      //is the request object doesnt have a key called user_id we will create it
      /* 
      decoded = {
      "user_id": 3,
      "iat": 1740681320
      }

      req = {
      ... huge object
      params: {},
      body: {},
      req.user_id = decoded.user_id
      }
      */
      req.user_id = decoded.user_id;
      next();
    });
  }
};

module.exports = userShouldBeLoggedIn;