import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'

let accountCollection: Collection
let surveyCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const { _id: id } = await MongoHelper.insertIntoAndRetrieve('accounts', {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken: accessToken
    }
  })

  return accessToken
}

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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Return 403 on save survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Return 200 on save survey with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const survey: SurveyModel = MongoHelper.map(
        await MongoHelper.insertIntoAndRetrieve('surveys', {
          question: 'Question',
          answers: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          }, {
            answer: 'Answer 2'
          }],
          date: new Date()
        })
      )

      await request(app)
        .put(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })
})
