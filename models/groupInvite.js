const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')

const User = require('./user').User
const Group = require('./group').Group
const HikingSession = require('./hikingSession').HikingSession

const sequelize = db.connection

const GroupInvite = sequelize.define('groupInvite', {
  sender: {
    type: DataTypes.STRING
  },
  groupname: {
    type: DataTypes.STRING
  },
  display: {
    type: DataTypes.BOOLEAN
  }

})

User.hasMany(GroupInvite, { as: 'groupInvites' })
GroupInvite.belongsTo(User, {
  foreignKey: 'userId',
  as: 'users'
})

module.exports = { GroupInvite: GroupInvite }
