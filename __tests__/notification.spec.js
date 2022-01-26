/* eslint-env jest */

// WORKING CODE

const request = require('supertest')

const db = require('../db.js')

process.env.TEST = true

const app = require('../main')

jest.setTimeout(30000)

const session = require('supertest-session')

let testSession = null

describe('Notification Model Testing', function () {
  beforeEach(function () {
    testSession = session(app)
  })

  it('testing the creation of a Notification', function (done) {
    db.connection
      .sync()
      .then(() => {
        const Notification = require('../models/notification.js').Notification
        Notification.create({ accept: false, username: 'test', display: true })
          .then((notification) => {
            expect(notification.dataValues.accept).toEqual(false)
            done()
          })
      })
  })
})
