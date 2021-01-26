import express from 'express'
import morgan from 'morgan'

import {createRoles, createAdmin} from './utils/initialSetup'

import productRouter from './routes/products.routes'
import usersRouter from './routes/users.routes'
const app = express()

createRoles()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/products', productRouter)
app.use('/api/users', usersRouter)

export default app