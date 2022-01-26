const Group = require('../models/group').Group
const Notification = require('../models/notification').Notification
const NewMemberController = require('./newMember.controller')

exports.updateAcceptNotification = (notificationid) => {
  Notification.update(
    {
      accept: true,
      display: false
    },
    { where: { id: notificationid } }
  )
  console.log('in update function')
  return Notification.findOne({ where: { id: notificationid } })
}

exports.acceptNotification = (notificationid) => {
  // console.log('controller name' + group.name)
  return this.updateAcceptNotification(notificationid)
    .then((notification) => {
      NewMemberController.incrementCount(notification.dataValues.newmemberId, notification.dataValues.groupId)
      console.log('in accept fucntion' + notification.dataValues.groupId)
      return Group.findByPk(notification.dataValues.groupId)
        .then((group) => {
          return group
        })
    }
    )
    .catch((err) => {
      console.log(err)
    })
}

module.exports = exports
