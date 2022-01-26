/* eslint-env jest */

// WORKING CODE

const request = require('supertest')

const db = require('../db.js')

process.env.TEST = true

const app = require('../main')

jest.setTimeout(30000)

const session = require('supertest-session')

let testSession = null

describe('Hiking Session Model Testing', function () {
  beforeEach(function () {
    testSession = session(app)
  })

  it('testing the creation of a hiking session', function (done) {
    db.connection
      .sync()
      .then(() => {
        const HikingSession = require('../models/hikingSession.js').HikingSession
        HikingSession.create({ creator: 'test', location: 'test', time: 'test', membersJoined: 0 })
          .then((hikingSession) => {
            expect(hikingSession.dataValues.creator).toEqual('test')
            done()
          })
      })
  })
})
