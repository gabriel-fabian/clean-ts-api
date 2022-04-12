import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Return an account on success', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        name: 'Fabian',
        email: 'gabriel.fabian@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })

    expect(response.status).toBe(200)
  })
})
