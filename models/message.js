const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')
const Group = require('./group').Group

const sequelize = db.connection

const Message = sequelize.define('message', {
  user: {
    type: DataTypes.STRING
  },
  messageContent: {
    type: DataTypes.STRING
  }
})

Group.hasMany(Message, { as: 'messages' })
Message.belongsTo(Group, {
  foreignKey: 'groupId',
  as: 'messages'
})

module.exports = { Message: Message }