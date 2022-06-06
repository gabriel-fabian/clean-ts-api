import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { AddSurveyModel, AddSurveyRepository } from '@/data/usecases/add-survey/db-add-survey-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadSurveyByIdRepository } from '@/data/usecases/load-survey-by-id/db-load-survey-by-id-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')

    await surveyCollection.insertOne(surveyData)
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    return MongoHelper.map(await surveyCollection.find().toArray())
  }

  async loadById(id: string): Promise<SurveyModel> {
    return MongoHelper.map(await MongoHelper.findById('surveys', id))
  }
}
