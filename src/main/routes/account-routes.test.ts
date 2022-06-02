import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Return 200 on signup', async () => {
      const response = await request(app).post('/api/signup').send({
        name: 'Fabian',
        email: 'gabriel.fabian@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })

      expect(response.status).toBe(200)
    })
  })

  describe('POST /login', () => {
    test('Return 200 on login', async () => {
      const password = await hash('123', 12)

      await MongoHelper.insertInto('accounts', {
        name: 'Fabian',
        email: 'gabriel.fabian@gmail.com',
        password
      })

      const response = await request(app).post('/api/login').send({
        email: 'gabriel.fabian@gmail.com',
        password: '123'
      })

      expect(response.status).toBe(200)
    })

    test('Return 200 on login', async () => {
      const response = await request(app).post('/api/login').send({
        email: 'gabriel.fabian@gmail.com',
        password: '123'
      })

      expect(response.status).toBe(401)
    })
  })
})
