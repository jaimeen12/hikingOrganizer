/* eslint-env jest */

// WORKING CODE

const request = require('supertest')

const db = require('../db.js')

process.env.TEST = true

const app = require('../main')

jest.setTimeout(30000)

const session = require('supertest-session')

let testSession = null

describe('Hiking Session Notification Model Testing', function () {
  beforeEach(function () {
    testSession = session(app)
  })

  it('Create a Hiking Session Notification', function (done) {
    db.connection
      .sync()
      .then(() => {
        const HikingSessionNotification = require('../models/hikingSessionNotification.js').HikingSessionNotification
        HikingSessionNotification.create({ accept: false, username: 'test', display: true })
          .then((hikingSession) => {
            expect(hikingSession.dataValues.username).toEqual('test')
            done()
          })
      })
  })
})
