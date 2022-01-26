const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')
const Group = require('./group').Group

const sequelize = db.connection

const HikingSession = sequelize.define('hikingSession', {
  creator: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  time: {
    type: DataTypes.STRING
  },
  membersJoined: {
    type: DataTypes.INTEGER
  }
})

Group.hasMany(HikingSession, { as: 'hikingSessions' })
HikingSession.belongsTo(Group, {
  foreignKey: 'group_id',
  as: 'groups'
})

module.exports = { HikingSession: HikingSession }
