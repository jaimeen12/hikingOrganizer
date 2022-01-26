
const express = require('express')
const path = require('path')
const GroupController = require('../controllers/group.controller')
const UserController = require('../controllers/user.controller')

const router = express.Router()

function loggedIn (req, res, next) {
  if (req.user) {
    // if request contains the user
    next() // call next
  } else {
    res.status(403).send('Unauthorized') // throwing unauthorized
  }
}

router.get('/', loggedIn, (req, res) => {
  GroupController.findAll()
    .then((groups) => {
      // console.log(groups)
      const indexPath = path.join(__dirname, '../views/groups.pug')
      res.render(indexPath, { title: 'Groups', groups: groups })
    })
})

router.get('/create', loggedIn, (req, res) => {
  const indexPath = path.join(__dirname, '../views/group_create.pug')
  res.render(indexPath, { title: 'Create Group' })
})

router.post('/create', loggedIn, async (req, res) => {
  // console.log(req.body.groupname)
  GroupController.createGroup(req.body.groupname, req.user.dataValues.id)
    .then(() => {
      UserController.findById(req.user.dataValues.id)
        .then((user) => {
          const indexPath = path.join(__dirname, '../views/groupCreated.pug')
          res.render(indexPath, { title: 'Group Created' })
        })
    })
})

router.post('/search', loggedIn, (req, res) => {
  // console.log(req.body.groupname)
  GroupController.findGroupbyName(req.body.groupname)
    .then((groups) => {
      const indexPath = path.join(__dirname, '../views/group-search.pug')
      res.render(indexPath, { title: 'Groups', groups: groups })
    })
})

module.exports = router
