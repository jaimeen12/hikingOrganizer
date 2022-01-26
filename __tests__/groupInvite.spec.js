/* eslint-env jest */

// WORKING CODE

const request = require('supertest')

const db = require('../db.js')

process.env.TEST = true

const app = require('../main')

jest.setTimeout(30000)

const session = require('supertest-session')

let testSession = null

describe('Group Model Testing', function () {
  beforeEach(function () {
    testSession = session(app)
  })

  it('testing the creation of a Group', function (done) {
    db.connection
      .sync()
      .then(() => {
        const GroupInvite = require('../models/groupInvite.js').GroupInvite
        GroupInvite.create({ sender: 'test', groupname: 'test', display: true })
          .then((groupInvite) => {
            expect(groupInvite.dataValues.sender).toEqual('test')
            done()
          })
      })
  })
})
