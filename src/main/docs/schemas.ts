
import {
  accountSchema,
  addSurveyParamsSchema,
  errorSchema,
  loginParamsSchema,
  saveSurveyResultSchema,
  signUpParamsSchema,
  surveyAnswerSchema,
  surveyResultAnswerSchema,
  surveyResultSchema,
  surveySchema,
  surveysSchema
} from './schemas/'

export default {
  account: accountSchema,
  addSurveyParams: addSurveyParamsSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  saveSurveyParams: saveSurveyResultSchema,
  signUpParams: signUpParamsSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema,
  surveys: surveysSchema
}
