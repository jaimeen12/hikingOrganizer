const crypto = require('crypto')

const User = require('../models/user').User
const Group = require('../models/group').Group

exports.findById = (id) => {
  // console.log('Userid : ' + id)
  return User.findByPk(id, {
    include: [
      {
        model: Group,
        as: 'groups',
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
        // through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
      }
    ]
  })
    .then((tutorial) => {
      return tutorial
    })
    .catch((err) => {
      console.log('>> Error while finding Tutorial: ', err)
    })
}

exports.createUser = async (username, password) => {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  // console.log('in create user')
  return User.create({ username: username, hash: hash, salt: salt })
}

module.exports = exports
