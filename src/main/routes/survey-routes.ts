/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '../adapters/express-route-adapter'
import { Router } from 'express'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
