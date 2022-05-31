import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let surveyCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
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
})
