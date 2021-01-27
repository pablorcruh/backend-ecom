import {Router} from 'express'
import * as shoppingCartController from '../controllers/shoppingCart.controller'
import {authJWT} from '../middleware'

const router = Router()

router.post('/',[authJWT.verifyToken, authJWT.isShopper] ,shoppingCartController.createShoppingCart)

export default router