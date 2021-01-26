import {Router} from 'express'
import multer from 'multer'

import {authJWT} from '../middleware'
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

router.post('/', [authJWT.verifyToken, authJWT.isAdmin],productController.createProduct)

router.post('/:productId/image', upload.single('product'),productController.uploadImage, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/:productId',productController.getProductById)

router.put('/:productId', [authJWT.verifyToken, authJWT.isAdmin], productController.updateProductById)

router.delete('/:productId',[authJWT.verifyToken, authJWT.isAdmin], productController.deleteProductById)

export default router