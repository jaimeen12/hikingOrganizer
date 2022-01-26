const Group = require('../models/group').Group
const Message = require('../models/message').Message
const GroupController = require('./group.controller')

exports.getMessages = (groupname) => {
  return Group.findOne({ where: { name: groupname } })
    .then((group) => {
      console.log('group ' + group.dataValues.id)
      return Message.findAll({
        where: { groupId: group.dataValues.id }
      }).then((notifications) => {
        // console.log('notifications ' + notifications)
        return notifications
      })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log('>> Error while retrieving Notifications ', err)
    })
}

exports.createMessage = (groupname, username, message) => {
  return GroupController.findGroupbyName(groupname)
    .then((groups) => {
      Message.create({ messageContent: message, groupId: groups[0].dataValues.id, user: username })
    })
    .catch((err) => {
      console.log(err)
    })
}