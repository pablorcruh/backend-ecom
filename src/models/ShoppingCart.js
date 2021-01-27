import {Schema, model} from 'mongoose'

const shoppingCartModel = new Schema({
    shopper: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: { type: Number, default: 0},
    products:[{
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