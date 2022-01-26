const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')
const User = require('./user').User

const sequelize = db.connection

const Group = sequelize.define('group', {
  name: {
    type: DataTypes.STRING
  },
  members: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
})

// Many to Many Relationship
Group.belongsToMany(User, {
  through: 'user_group',
  as: 'users',
  foreignKey: 'group_id'
})
User.belongsToMany(Group, {
  through: 'user_group',
  as: 'groups',
  foreignKey: 'user_id'
})

module.exports = { Group: Group }
