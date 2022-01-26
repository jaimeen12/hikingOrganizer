const express = require('express')
const path = require('path')
const passport = require('passport')

const UserController = require('../controllers/user.controller')

const router = express.Router()

router.get('/register', (req, res) => {
  const indexPath = path.join(__dirname, '../views/register.pug')
  res.render(indexPath)
})

router.post('/register', (req, res) => {
  console.log('username ' + req.body.username + ' password ' + req.body.password)
  UserController.createUser(req.body.username, req.body.password).then((newUser) => {
    // console.log('new user created ' + newUser.username + ' : ' + newUser.password)
    res.redirect('/')
  })
})

router.get('/login', (req, res) => {
  const indexPath = path.join(__dirname, '../views/login.pug')
  res.render(indexPath)
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login'
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
// module.exports = createUser
