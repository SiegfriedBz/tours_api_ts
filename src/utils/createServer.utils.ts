import config from 'config'
import path from 'path'
import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from '../routes'

const ENV = process.env.NODE_ENV

export default function createServer(): Express {
  const app = express()
  // Serve static files
  const publicPath =
    ENV === 'production'
      ? path.join(__dirname, '../../public')
      : path.join(__dirname, '../public')
  app.use(express.static(publicPath))

  // Pug for email templates
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, 'views'))

  app.use(
    cors({
      origin: config.get<string | string[]>('cors.allowedOrigins'),
      credentials: true
    })
  )

  app.use(cookieParser())

  routes(app)

  return app
}
