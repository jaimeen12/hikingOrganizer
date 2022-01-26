const Group = require('../models/group').Group
const User = require('../models/user').User
const Notification = require('../models/notification').Notification
const NewMember = require('../models/newMember').NewMember

exports.create = (group) => {
  // console.log('controller name' + group.name)
  return Group.create({
    name: group,
    members: 0
  })
}

exports.addUser = (groupId, userId) => {
  return Group.findByPk(groupId)
    .then((group) => {
      if (!group) {
        console.log('Tag not found!')
        return null
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log('Tutorial not found!')
          return null
        }

        group.addUser(user)
        // console.log('group ' + group.dataValues.id)
        Group.increment('members', { where: { id: group.dataValues.id } })
        // console.log(`${user.dataValues.username} added to ${group.name}`)
        return group
      })
    })
    .catch((err) => {
      console.log('>> Error while adding Tutorial to Tag: ', err)
    })
}

exports.findAll = () => {
  return Group.findAll(
    /*  {
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id', 'username'],
        through: {
          attributes: []
        }
      }
    ]
  } */
  )
    .then((tags) => {
      return tags
    })
    .catch((err) => {
      console.log('>> Error while retrieving Tags: ', err)
    })
}

exports.createGroup = (groupname, userid) => {
  return this.create(groupname).then((group) => {
    this.addUser(group.id, userid)
  })
}

exports.getNotifications = (groupname, userid) => {
  return Group.findOne({ where: { name: groupname } })
    .then((group) => {
      return Notification.findAll({
        where: { groupId: group.dataValues.id, userId: userid, display: true }
      }).then((notifications) => {
        return notifications
      })
    })
    .catch((err) => {
      console.log('>> Error while retrieving Notifications ', err)
    })
}

exports.findGroupbyName = (groupname) => {
  return Group.findAll(
    {
      where: { name: groupname },
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'username'],
          through: {
            attributes: []
          }
        }
      ]
    }
  )
}

exports.joinGroup = (groupname, userid, userName) => {
  this.findGroupbyName(groupname)
    .then((groups) => {
      console.log('groupname: ' + groupname + 'groups' + groups)
      const groupmembers = groups[0].users
      return NewMember.create({ userId: userid, groupId: groups[0].dataValues.id, count: 0, NoGroupMembers: groups[0].dataValues.members })
        .then((newmember) => {
          for (member in groupmembers) {
            Notification.create({ groupId: groups[0].dataValues.id, userId: groupmembers[member].dataValues.id, username: userName, newmemberId: newmember.id, accept: false, display: true })
              .then((notification) => {
                console.log('notification id: ' + notification.dataValues.id)
              })
          }
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
