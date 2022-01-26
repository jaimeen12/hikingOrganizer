const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')
const User = require('./user').User
const Group = require('./group').Group

const sequelize = db.connection

const NewMember = sequelize.define('newmember', {
  count: {
    type: DataTypes.INTEGER
  },
  NoGroupMembers: {
    type: DataTypes.INTEGER
  }
})

Group.hasMany(NewMember, { as: 'newmembers' })
NewMember.belongsTo(Group, {
  foreignKey: 'group_id',
  as: 'groups'
})

User.hasMany(NewMember, { as: 'newmembers' })
NewMember.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users'
})

module.exports = { NewMember: NewMember }
