import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(_value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_value'))
    }
  }

  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(_value: string, _hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true))
    }
  }
  return new HashComparerStub()
}
