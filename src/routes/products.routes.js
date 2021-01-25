import {Router} from 'express'
import * as productController from '../controllers/products.controller'

const router = Router()

router.get('/', productController.getProducts)

router.post('/', productController.createProduct)

router.put('/:productId', productController.updateProductById)

router.delete('/:productId', productController.deleteProductById)

export default router