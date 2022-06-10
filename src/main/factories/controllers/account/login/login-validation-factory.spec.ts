import { makeLoginValidation } from './login-validation-factory'
import {
  ValidationComposite,
  EmailValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import { mockEmailValidator } from '@/validation/test'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', mockEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
