import express from 'express'
import morgan from 'morgan'

import productRouter from './routes/products.routes'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/products', productRouter)

export default app