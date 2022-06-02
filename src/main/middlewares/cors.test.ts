import app from '@/main/config/app'
import request from 'supertest'

describe('CORS Middleware', () => {
  test('Enable CORS', async () => {
    app.get('/test_cors', (_req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
