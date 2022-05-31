import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Return 403 on add survey without accessToken', async () => {
      const response = await request(app).post('/api/surveys').send({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }]
      })

      expect(response.status).toBe(403)
    })
  })

  test('Return 204 on add survey with valid accessToken', async () => {
    const { _id: id } = await MongoHelper.insertIntoAndRetrieve('accounts', {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      role: 'admin'
    })
    const accessToken = sign({ id }, env.jwtSecret)

    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: accessToken
      }
    })

    const response = await request(app)
      .post('/api/surveys')
      .set('x-access-token', accessToken)
      .send({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }]
      })

    expect(response.status).toBe(204)
  })
})
