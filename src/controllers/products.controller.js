import Products from '../models/Products'
import multer from 'multer'

const upload = multer({
    limits: {
        fileSize : 1000000
    },
    fileFilter(req,file, cb){
        if(!file.originalname.match(/\.(.jpg | jpeg | png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})


export const createProduct = async (req, res) => {
    try {
        const {name, description, stock, price} = req.body
        const newProduct = new Products({
            name, 
            description,
            stock,
            price
        })
        const productSaved = await newProduct.save()
        res.status(200).json(productSaved)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProducts = async (req, res) => {
    res.json('getProductById')
}

export const getProductById = async (req, res) => {
    
}

export const updateProductById = async (req, res) => {

}

export const deleteProductById = async (req, res) => {

}

export const uploadProductImage = async (req, res) => {

}