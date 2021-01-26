import Products from '../models/Products'
export const createProduct = async (req, res) => {
    try {
        const {name, description, stock, price} = req.body
        const newProduct = new Products({
            name, 
            description,
            stock,
            image: null,
            price
        })
        //const productSaved = await newProduct.save()
        res.send()
        //res.status(200).json(productSaved)
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
        product.image = req.file.buffer
        await Products.findByIdAndUpdate(productId, product)
        res.status(200).send()
    }catch(error){
        console.error.error(error.message)
        res.status(500).json({message: 'Oops something went wrong'})
    }
}

export const getProducts = async (req, res) => {
    res.json('getProductById')
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
        console.error.error(error.message)
        res.status(500).json({message:'Oops something went wrong'})
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
        res.status(500).json({message: 'Oops something went wrong'})
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId
        await Products.findByIdAndDelete(productId)
        res.status(201).send()       
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Oops something went wrong'})
    }
}
