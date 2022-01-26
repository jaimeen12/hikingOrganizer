const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')

const User = require('./user').User
const Group = require('./group').Group
const HikingSession = require('./hikingSession').HikingSession

const sequelize = db.connection

const HikingSessionNotification = sequelize.define('hikingSessionNotification', {
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

Group.hasMany(HikingSessionNotification, { as: 'hikingSessionNotifications' })
HikingSessionNotification.belongsTo(Group, {
  foreignKey: 'group_id',
  as: 'groups'
})

User.hasMany(HikingSessionNotification, { as: 'hikingSessionNotifications' })
HikingSessionNotification.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users'
})

HikingSession.hasMany(HikingSessionNotification)
HikingSessionNotification.belongsTo(HikingSession)

module.exports = { HikingSessionNotification: HikingSessionNotification }
