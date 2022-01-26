const GroupInvite = require('../models/groupInvite').GroupInvite
const User = require('../models/user').User
const Group = require('../models/group').Group
const GroupController = require('./group.controller')

exports.create = (groupname, sender, username) => {
  // console.log('controller name' + group.name)
  return User.findOne({ where: { username: username } })
    .then((user) => {
      if (user) {
        return GroupInvite.create({
          groupname: groupname,
          sender: sender,
          userId: user.dataValues.id,
          display: true
        })
      } else {

      }
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getInvites = (userId) => {
  // console.log('controller name' + group.name)
  return GroupInvite.findAll({ where: { userId: userId } })
    .then((invites) => {
      return invites
    })
}

exports.acceptInvite = (id) => {
  return GroupInvite.findByPk(id)
    .then((groupInvite) => {
      return groupInvite.update({ display: false })
        .then((groupInvite) => {
          return groupInvite.save()
            .then(() => {
              return Group.findOne({ where: { name: groupInvite.dataValues.groupname } })
            })
        })
    })
}

exports.rejectInvite = (id) => {
  return GroupInvite.findByPk(id)
    .then((groupInvite) => {
      groupInvite.update({ display: false })
        .then((groupInvite) => {
          groupInvite.save()
        })
    })
}
