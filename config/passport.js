const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const User = require('../models/user').User

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({
      // Using sequelize model function
        where: {
        // Take an object with options where self explanatory
          username: username
        }
      }).then(function (user) {
      // Sequelize return a promise with user in callback
        if (user == null) {
        // Checking if user exsists
          return done(null, false) // Standerd Passport callback
        }

        const hashVerify = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex')

        if (hashVerify == user.hash) {
        // use your password hash comparing logic here for security
          return done(null, user) // Standerd Passport callback
        }
        return done(null, false) // Standerd Passport callback
      }
      )
        .catch((err) => { console.log(err) })
    })
  )

  // for maintaining session
  passport.serializeUser(function (user, done) {
  // Standered Serialize for session
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findOne({
    // Using sequelize model functoin
      where: {
        id: id
      }
    }).then(function (user) {
      if (user == null) {
        done(new Error('Wrong user id.'))
      }

      done(null, user) // Standerd deserailize callback
    })
      .catch((err) => { console.log(err) })
  })
}
