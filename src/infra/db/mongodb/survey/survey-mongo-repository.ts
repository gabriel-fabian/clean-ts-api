import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'
import { SurveyModel } from '../../../../domain/models/survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')

    await surveyCollection.insertOne(surveyData)
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    return MongoHelper.map(await surveyCollection.find().toArray())
  }
}
