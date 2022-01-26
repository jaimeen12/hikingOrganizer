const express = require('express')
const path = require('path')
const GroupController = require('../controllers/group.controller')
const NotificationController = require('../controllers/notification.controller')
const UserController = require('../controllers/user.controller')
const HikingController = require('../controllers/hikingSession.controller')
const MessageController = require('../controllers/message.controller')
const GroupInviteController = require('../controllers/groupInvite.controller')

const router = express.Router()

function loggedIn (req, res, next) {
  if (req.user) {
    // if request contains the user
    next() // call next
  } else {
    res.status(403).send('Unauthorized') // throwing unauthorized
  }
}

router.get('/invite/accept/:id', function (req, res) {
  GroupInviteController.acceptInvite(req.params.id)
    .then((group) => {
      const url = '/group/join/' + group.dataValues.name
      res.redirect(url)
    })
})

router.get('/invite/reject/:id', function (req, res) {
  GroupInviteController.rejectInvite(req.params.id)
    .then(() => {
      const indexPath = path.join(__dirname, '../views/groupCreated.pug')
      res.render(indexPath, { title: 'Invite Rejected' })
    })
})

router.post('/inviteUser/:id', function (req, res) {
  GroupInviteController.create(req.params.id, req.user.dataValues.username, req.body.username)
    .then((invite) => {
      if (invite) {
        const indexPath = path.join(__dirname, '../views/messageCreated.pug')
        res.render(indexPath, { title: 'Group Invite Sent', groupname: req.params.id })
      } else {
        const indexPath = path.join(__dirname, '../views/messageCreated.pug')
        res.render(indexPath, { title: 'User not Found', groupname: req.params.id })
      }
    })
})

router.get('/join/:id', function (req, res) {
  UserController.findById(req.user.dataValues.id)
    .then((user) => {
      if (user.groups.length >= 5) {
        console.log(user.groups.length)
        const indexPath = path.join(__dirname, '../views/exceedGroups.pug')
        res.render(indexPath, { title: 'Maximum Groups Exceeded' })
      } else {
        console.log('username ' + req.user.dataValues.username)
        GroupController.joinGroup(req.params.id, req.user.dataValues.id, req.user.dataValues.username)
        const indexPath = path.join(__dirname, '../views/joinGroup.pug')
        res.render(indexPath, { title: 'Group Request', groupname: req.params.id })
      }
    })
})

router.get('/covidScreening/:id', function (req, res) {
  const indexPath = path.join(__dirname, '../views/covidScreening.pug')
  res.render(indexPath, { title: 'Covid Screening', groupname: req.params.id })
})

router.get('/covidPositive', function (req, res) {
  const indexPath = path.join(__dirname, '../views/covidPositive.pug')
  res.render(indexPath, { title: 'Covid Screening Positive' })
})

router.get('/accept/hikingsession/:id', function (req, res) {
  HikingController.acceptNotification(req.params.id)
    .then((group) => {
      console.log('group: ' + group.dataValues.name)
      const indexPath = path.join(__dirname, '../views/hikingtemp.pug')
      res.render(indexPath, { title: 'Added Group Hiking Session to My Hiking Session', groupname: group.dataValues.name })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/reject/hikingsession/:id', function (req, res) {
  HikingController.rejectNotification(req.params.id)
    .then((group) => {
      const indexPath = path.join(__dirname, '../views/hikingtemp.pug')
      res.render(indexPath, { title: 'Removed Hiking Session', groupname: group.dataValues.name })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/accept/:id', function (req, res) {
  NotificationController.acceptNotification(req.params.id)
    .then((group) => {
      // console.log(group.dataValues.name)
      const url = '/group/' + group.dataValues.name
      res.redirect(url)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/create/message/:id', function (req, res) {
  groupname = req.params.id
  const indexPath = path.join(__dirname, '../views/createMessage.pug')
  res.render(indexPath, { title: 'Create Message', groupname: groupname })
})

router.post('/create/message/:id', loggedIn, (req, res) => {
  // console.log('groupname: ' + req.body.groupname)
  // console.log('groupname: ' + req.params.id)
  groupname = req.params.id
  MessageController.createMessage(req.params.id, req.user.dataValues.username, req.body.message)
    .then((message) => {
      const indexPath = path.join(__dirname, '../views/messageCreated.pug')
      res.render(indexPath, { title: 'Message Created', groupname: groupname })
    })
})

router.post('/create/hiking-session/:id', loggedIn, (req, res) => {
  // console.log('groupname: ' + req.body.groupname)
  // console.log('groupname: ' + req.params.id)
  groupname = req.params.id
  HikingController.createHikingSession(req.params.id, req.user.dataValues.username, req.body.location, req.body.time)
    .then((hike) => {
      const indexPath = path.join(__dirname, '../views/hikingSessionCreated.pug')
      res.render(indexPath, { title: 'Hiking Session Created', groupname: groupname })
    })
})

router.get('/:id', loggedIn, (req, res) => {
  HikingController.getHikingNotifications(req.params.id, req.user.dataValues.id)
    .then((hikingnotifications) => {
      // console.log(hikingnotifications[0].dataValues.hikingSession)
      GroupController.getNotifications(req.params.id, req.user.dataValues.id)
        .then((notifications) => {
          MessageController.getMessages(req.params.id)
            .then((messages) => {
            // console.log('messages: ' + messages)
              const indexPath = path.join(__dirname, '../views/group-layout.pug')
              res.render(indexPath, { title: req.params.id, notifications: notifications, hikingnotifications: hikingnotifications, messages: messages })
            })
        // console.log('hiking notifications: ' + notifications[0].dataValues)
        })
        .catch((err) => {
          console.log(err)
        })
    })
})

module.exports = router
