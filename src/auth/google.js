var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: "815341751211-ip0hj30pk46s7ssbkjm4thui33mg51rd.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({ userid: profile.id }, { name: profile.displayName, userid: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;