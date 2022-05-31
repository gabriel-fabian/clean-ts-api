import bcryptjs from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return new Promise((resolve) => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcryptjs, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenLastCalledWith('any_value', salt)
    })

    test('Return a valid hash on hash succes', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })

    test('Throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcryptjs, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcryptjs, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenLastCalledWith('any_value', 'any_hash')
    })

    test('Return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })

    test('Return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcryptjs, 'compare').mockImplementationOnce(() => {
        return false
      })
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })

    test('Throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcryptjs, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
  })
})
