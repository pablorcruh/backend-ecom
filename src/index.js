import app from './app'
import './database'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
app.listen(port)