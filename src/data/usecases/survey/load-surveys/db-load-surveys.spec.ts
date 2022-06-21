import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import { mockLoadSurveysRepository } from '@/data/test'
import { mockSurveyModels } from '@/domain/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Call LoadSurveysRepository with correct value', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const accountId = 'any_id'
    await sut.load(accountId)
    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  test('Return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load('any_id')
    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockRejectedValueOnce(new Error())
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })
})
