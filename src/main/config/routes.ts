import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.get('/', (_req, res) => {
    res.redirect('/api-docs')
  })
  app.use('/api', router)
  readdirSync(path.join(__dirname, '..', 'routes')).map(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
