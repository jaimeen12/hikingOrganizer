/* eslint-env jest */
const db = require('../db.js')

process.env.TEST = true

const app = require('../main')

jest.setTimeout(30000)

const session = require('supertest-session')

let testSession = null

describe('Testing the non-restricted pages', function () {
  beforeEach(function () {
    testSession = session(app)
  })

  it('should fail accessing a restricted page', function (done) {
    testSession.get('/dashboard')
      .expect(302)
      .end(done)
  })

  it('welcome page', function (done) {
    testSession.get('/')
      .expect(200)
      .end(done)
  })
})
