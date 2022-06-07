import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { AddSurveyModel, AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')

    await surveyCollection.insertOne(surveyData)
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys && MongoHelper.map(surveys)
  }

  async loadById(id: string): Promise<SurveyModel> {
    const survey = await MongoHelper.findById('surveys', id)
    return survey && MongoHelper.map(survey)
  }
}
