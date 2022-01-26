const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')

const User = require('./user').User
const Group = require('./group').Group
const NewMember = require('./newMember').NewMember

const sequelize = db.connection

const Notification = sequelize.define('notification', {
  accept: {
    type: DataTypes.BOOLEAN
  },
  username: {
    type: DataTypes.STRING
  },
  display: {
    type: DataTypes.BOOLEAN
  }

})

Group.hasMany(Notification, { as: 'notifications' })
Notification.belongsTo(Group, {
  foreignKey: 'group_id',
  as: 'groups'
})

User.hasMany(Notification, { as: 'notifications' })
Notification.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users'
})

NewMember.hasMany(Notification, { as: 'newmembers' })
Notification.belongsTo(NewMember, {
  foreignKey: 'newmember_id',
  as: 'newmembers'
})

module.exports = { Notification: Notification }
