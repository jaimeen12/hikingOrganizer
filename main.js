const express = require('express')
const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')
const groupsRoutes = require('./routes/groups')
const groupRoutes = require('./routes/group')
const path = require('path')
const db = require('./db.js')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()

app.use(bodyParser.json()) // body-parser MW
app.use(bodyParser.urlencoded({ extended: false })) // See doc of it for ref */

if (process.env.TEST) {

} else {
  db.connection
    .sync()
    .then(() => {
      console.log('Connected to DB')
    })
    .catch((err) => {
      console.log('Retrying Database Connection')
      db.connection
        .sync()
        .then(() => {
          console.log('Connected to DB')
        })
        .catch((err) => {
          console.log('Error connecting to database: Restart Server')
        })
    })

  require('./config/passport')(passport)
  app.use(
    session({
      // Session MW
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 100 * 60 * 60 * 24 * 30 } // = 30 days
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/', homeRoutes)

app.use('/user', userRoutes)

app.use('/group', groupRoutes)

app.use('/groups', groupsRoutes)

module.exports = app
