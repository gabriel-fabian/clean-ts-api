/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/controllers/account/login/login-controller-factory'
import { makeSignUpController } from '../factories/controllers/account/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
