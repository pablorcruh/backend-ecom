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
        const productSaved = await newProduct.save()
        res.status(200).json(productSaved)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const uploadImage = async (req, res) => {
    try{
        const productId = req.params.productId
        const product = await Products.findById(productId)
        if(!product){
            res.json({message: 'Product not found'})
            return
        }
        product.image = req.file.buffer
        await Products.findByIdAndUpdate(productId, product)
        res.status(200).send()
    }catch(error){
        res.status(500).json({message: 'Oops something went wrong'})
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