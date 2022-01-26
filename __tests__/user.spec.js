/* eslint-env jest */
const db = require('../db.js')

process.env.TEST = true

const app = require('../main')

jest.setTimeout(30000)

const session = require('supertest-session')
// const { Group } = require('../models/group.js')
// const myApp = require('../main')

let testSession = null

describe('User Model Testing', function () {
  beforeEach(function () {
    testSession = session(app)
  })

  it('Creating a User', function (done) {
    db.connection
      .sync()
      .then(() => {
        const User = require('../models/user.js').User
        User.create({ username: 'test', hash: 'test', salt: 'test' })
          .then((user) => {
            expect(user.dataValues.username).toEqual('test')
            done()
          })
      })
  })

  it('should fail accessing a restricted page', function (done) {
    testSession.get('/dashboard')
      .expect(302)
      .end(done)
  })
})
