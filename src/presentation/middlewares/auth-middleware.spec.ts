import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { forbidden } from '../helpers/http/http-helper'

describe('Auth Middleware', () => {
  test('Return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
