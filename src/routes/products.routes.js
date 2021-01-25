import {Router} from 'express'
import multer from 'multer'

import * as productController from '../controllers/products.controller'

const router = Router()

const upload = multer({
    limits: {
        fileSize : 1000000
    },
    fileFilter(req,file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})


router.get('/', productController.getProducts)

router.post('/', productController.createProduct)

router.post('/:productId/image', upload.single('product'),productController.uploadImage, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.put('/:productId', productController.updateProductById)

router.delete('/:productId', productController.deleteProductById)

export default router