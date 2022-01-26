const { Sequelize, DataTypes } = require('sequelize')
const db = require('../db.js')

const sequelize = db.connection

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING
  },
  hash: {
    type: DataTypes.STRING
  },
  salt: {
    type: DataTypes.STRING
  }
})

module.exports = { User: User }
