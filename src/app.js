import express from 'express'
import morgan from 'morgan'

import productRouter from './routes/products.routes'
import usersRouter from './routes/users.routes'
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/products', productRouter)
app.use('/api/users', usersRouter)

export default app