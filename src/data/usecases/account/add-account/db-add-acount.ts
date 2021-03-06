import { AccountModel, AddAccount, AddAccountParams, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountParams): Promise<AccountModel> {
    const existingAccount = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (!existingAccount) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const createdAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return new Promise(resolve => resolve(createdAccount))
    }

    return null
  }
}
