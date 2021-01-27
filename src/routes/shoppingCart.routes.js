import {Router} from 'express'
import * as shoppingCartController from '../controllers/shoppingCart.controller'

const router = Router()

router.post('/', shoppingCartController.createShoppingCart)

export default router