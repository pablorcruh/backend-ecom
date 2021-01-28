import ShoppingCart from '../models/ShoppingCart'
import Products from '../models/Products'
import mongoose from 'mongoose'
export const createShoppingCart = async (req, res) => {
    try {
        const {products, totalPrice} = req.body 
        products.forEach(async (product) => {
            let {id: productId, stock: stockAvailable} = await Products.findById(product.id)
            if(stockAvailable > 0){
                stockAvailable = stockAvailable - product.quantity
                await Products.findByIdAndUpdate(productId,{stock: stockAvailable}, {
                    new :true
                })
            }
        });

        const newShoppingCart = new ShoppingCart({
            shopper: req.userId, 
            totalPrice
        })
        const modifiedData = products.map(product => {
            return {
                _id: mongoose.Types.ObjectId(product.id),
                quantity: product.quantity
            }
        })
        newShoppingCart.products = modifiedData
        await newShoppingCart.save()
        res.send()            
    } catch (error) {   
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}