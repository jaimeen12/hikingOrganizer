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
        const Group = require('../models/group.js').Group
        Group.create({ name: 'test', members: 0 })
          .then((group) => {
            expect(group.dataValues.name).toEqual('test')
            done()
          })
      })
  })
})
