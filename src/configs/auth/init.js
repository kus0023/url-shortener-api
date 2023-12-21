const passport = require("passport");
const User = require("../../models/User");

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, { userId: user.id, role: user.role });
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
