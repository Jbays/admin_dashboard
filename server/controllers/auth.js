const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

function signin(req, res, next) {
  res.json({
    userId: req.user._id,
    username: req.user.username,
    token: tokenForUser(req.user)
  });
}

function signup(req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const wallet = req.body.wallet;
  const phoneNumber = req.body.phone_number

  if (!email || !password || !wallet || !phoneNumber) {
    return res
      .status(422)
      .send({ error: "You must provide email, password, wallet, and phone number" });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      username: username,
      email: email,
      password: password,
      wallet: wallet,
      phone_number:phoneNumber
    });

    user.encrypt(() => {
      user.save(err => {
        if (err) {
          return next(err);
        }
        // Respond to request indicating the user was created
        res.json({
          userId: user._id,
          username: username,
          token: tokenForUser(user)
        });
      });
    });
  });
}

module.exports = {
  signin,
  signup
};