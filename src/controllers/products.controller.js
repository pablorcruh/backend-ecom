import Products from '../models/Products'
import os from 'os'
import sharp from 'sharp'

export const createProduct = async (req, res) => {
    try {
        const {name, description, stock, price} = req.body
        const newProduct = new Products({
            name, 
            description,
            stock,
            image: '',
            price
        })
        const productSaved = await newProduct.save()
        res.status(200).json(productSaved)
    } catch (error) {
        console.error.error(error.message)
        res.status(500).json({message: error.message})
    }
}

export const uploadImage = async (req, res) => {
    try{
        const productId = req.params.productId
        const product = await Products.findById(productId)
        if(!product){
            res.status(400).json({message: 'Product not found'})
            return
        }
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
        product.image = buffer
        await Products.findByIdAndUpdate(productId, product)
        createImageUrl(productId)
        res.status(200).send()
    }catch(error){
        console.error.error(error.message)
        res.status(500).json({message: error.message})
    }
}

const createImageUrl = async (productId) => {
    const product = await Products.findById(productId)
    const hostname= os.hostname()
    const imageURL = "https://"
        .concat(process.env.APP_URL)
        .concat(':')
        .concat('/api/products/')
        .concat(productId)
        .concat('/image')
    product.imageUrl = imageURL
    console.log(product)
    await Products.findByIdAndUpdate(productId, product)
}

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json(products)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}

export const getProductById = async (req, res) => {
    try{
        const productId = req.params.productId
        const product =  await Products.findById(productId)
        if(!product){
            res.status(400).json({message: 'product not found'})
            return
        }
        res.status(200).json(product) 
    }catch(error){
        console.error(error.message)
        res.status(500).json({message:error.message})
    }
}

export const getProductImage = async(req, res) => {
    try {
        const product = await Products.findById(req.params.productId)
        if(!product) throw new Error()
        if(!product.image) res.status(404).json({message:'no image found'})
        res.set('Content-Type', 'image/png')
        res.send(product.image)
    } catch (error) {
        console.error(error.message)
        res.status(404).send({message: 'Product not found'})    
    }
}

export const updateProductById = async (req, res) => {
    try{
        const productId = req.params.productId
        const updatedProduct = await Products.findByIdAndUpdate(productId, req.body, {
            new: true
        })
        res.status(200).json(updatedProduct)
    }catch(error){
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId
        await Products.findByIdAndDelete(productId)
        res.status(201).send()       
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}
