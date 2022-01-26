const GroupController = require('./group.controller')
const HikingSession = require('../models/hikingSession').HikingSession
const HikingSessionNotification = require('../models/hikingSessionNotification').HikingSessionNotification
const Group = require('../models/group').Group

exports.createHikingSession = (groupname, username, location, time) => {
  return GroupController.findGroupbyName(groupname)
    .then((groups) => {
      // console.log(group[0].dataValues.id)
      const groupmembers = groups[0].users
      return HikingSession.create({ creator: username, location: location, time: time, membersJoined: 1, groupId: groups[0].dataValues.id })
        .then((hike) => {
          for (member in groupmembers) {
            HikingSessionNotification.create({ groupId: groups[0].dataValues.id, userId: groupmembers[member].dataValues.id, username: username, accept: false, display: true, hikingSessionId: hike.dataValues.id })
            // .then((notification) => {
            //  console.log('notification id: ' + notification.dataValues.id)
            // })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
}

exports.getHikingNotifications = (groupname, userid) => {
  return GroupController.findGroupbyName(groupname)
    .then((group) => {
      // console.log(group)
      return HikingSessionNotification.findAll({
        where: { groupId: group[0].dataValues.id, userId: userid, display: true },
        include: HikingSession
      }).then((notifications) => {
        // console.log(notifications)
        return notifications
      })
    })
    .catch((err) => {
      console.log('>> Error while retrieving Notifications ', err)
    })
}

exports.acceptNotification = (notificationid) => {
  return HikingSessionNotification.findOne({ where: { id: notificationid } })
    .then((notification) => {
      notification.update({ accept: true })
        .then((notification) => {
          notification.save()
        })
      return Group.findByPk(notification.dataValues.groupId)
        .then((group) => {
          return group
        })
    })
}

exports.rejectNotification = (notificationid) => {
  return HikingSessionNotification.findOne({ where: { id: notificationid } })
    .then((notification) => {
      notification.update({ display: false })
        .then((notification) => {
          notification.save()
        })
      return Group.findByPk(notification.dataValues.groupId)
        .then((group) => {
          return group
        })
    })
}
