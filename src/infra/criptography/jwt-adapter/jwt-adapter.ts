import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  private readonly secret

  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt(value: string): Promise<string> {
    jwt.sign({ id: value }, this.secret)
    return new Promise((resolve) => resolve(null))
  }
}
