import express from 'express'
import morgan from 'morgan'

import {createRoles} from './utils/initialSetup'

import productRouter from './routes/products.routes'
import usersRouter from './routes/users.routes'
import shoppingCartRouter from './routes/shoppingCart.routes'

const app = express()

createRoles()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/products', productRouter)
app.use('/api/users', usersRouter)
app.use('/api/shoppingCart', shoppingCartRouter)

export default app