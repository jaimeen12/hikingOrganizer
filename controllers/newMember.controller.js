const NewMember = require('../models/newMember').NewMember
const GroupController = require('./group.controller')

exports.checkMajorityVote = (member, groupid) => {
  // console.log('checking vote')
  // console.log('count: ' + member.dataValues.count + ' noGroupMembers: ' + member.dataValues.NoGroupMembers / 2)
  if (member.dataValues.count + 1 >= member.dataValues.NoGroupMembers / 2) {
    console.log('User accepted')
    GroupController.addUser(groupid, member.dataValues.userId)
  }
}

exports.incrementCount = (newmemberId, groupid) => {
  NewMember.findOne({ where: { id: newmemberId } })
    .then((member) => {
      member.increment('count', { by: 1 })
        .then((member) => {
          // console.log(result)
          member.save()
            .then((member) => {
              this.checkMajorityVote(member, groupid)
            })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = exports
