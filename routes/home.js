const express = require('express')
const path = require('path')

const UserController = require('../controllers/user.controller')
const GroupInviteController = require('../controllers/groupInvite.controller')

const router = express.Router()

function loggedIn (req, res, next) {
  if (req.user) {
    // if request contains the user
    next() // call next
  } else {
    // res.status(403).send('Unauthorized') // throwing unauthorized
    res.redirect('/user/login')
  }
}

router.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../views/welcome.pug')
  res.render(indexPath)
})

router.get('/dashboard', loggedIn, (req, res) => {
  UserController.findById(req.user.dataValues.id)
    .then((user) => {
      GroupInviteController.getInvites(user.dataValues.id)
        .then((invites) => {
          const indexPath = path.join(__dirname, '../views/dashboard.pug')
          res.render(indexPath, { title: 'Dashboard', groups: user.groups, groupInvites: invites })
        })
        .catch((err) => {
          console.log('err ' + err)
        })
    })
})

module.exports = router
