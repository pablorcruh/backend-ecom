import ShoppingCart from '../models/ShoppingCart'
import Products from '../models/Products'
export const createShoppingCart = async (req, res) => {
    try {
        const {shopper, products, totalPrice} = req.body 
        const newShoppingCart = new ShoppingCart({
            shopper,
            products,
            totalPrice
        })
        //const savedShoppingCart = await newShoppingCart.save()
        products.forEach(async (product) => {
            let {id: productId, stock: stockAvailable} = await Products.findById(product.id)
            stockAvailable = stockAvailable - product.quantity
            const ProductToUpdate = await Products.findByIdAndUpdate(productId,{stock: stockAvailable}, {
                new :true
            })
        });
        res.send()
        //res.send(savedShoppingCart)            
    } catch (error) {   
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}