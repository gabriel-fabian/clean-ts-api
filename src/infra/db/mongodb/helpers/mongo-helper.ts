import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },

  async insertInto(collectionName: string, data: Object) {
    const collection = this.getCollection(collectionName)
    return await collection.insertOne(data)
  },

  async findById(collectionName: string, id: any) {
    const collection = this.getCollection(collectionName)
    return await collection.findOne(id)
  },

  async insertIntoAndRetrieve(collectionName: string, data: Object) {
    const { insertedId } = await this.insertInto(collectionName, data)
    return await this.findById(collectionName, insertedId)
  },

  map: (data: any): any => {
    if (Array.isArray(data)) {
      return data.map(entry => {
        return MongoHelper.idMapper(entry)
      })
    } else {
      return MongoHelper.idMapper(data)
    }
  },

  idMapper(data: any): any {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
