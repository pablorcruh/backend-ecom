import {Schema, model} from 'mongoose'

const shoppingCartModel = new Schema({
    products:[{
        shopper: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        product: {
            ref: 'Product',
            type: Schema.Types.ObjectId
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

export default model('ShoppingCart', shoppingCartModel)