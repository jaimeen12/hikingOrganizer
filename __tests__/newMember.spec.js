/* eslint-env jest */

// WORKING CODE

const request = require('supertest')

const db = require('../db.js')

process.env.TEST = true

const app = require('../main')

jest.setTimeout(30000)

const session = require('supertest-session')

let testSession = null

describe('New Member Testing', function () {
  beforeEach(function () {
    testSession = session(app)
  })

  it('Create a New Member', function (done) {
    db.connection
      .sync()
      .then(() => {
        const NewMember = require('../models/newMember.js').NewMember
        NewMember.create({ count: 0, NoGroupMembers: 0 })
          .then((newMember) => {
            expect(newMember.dataValues.count).toEqual(0)
            done()
          })
      })
  })
})
