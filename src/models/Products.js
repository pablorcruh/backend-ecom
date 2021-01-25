import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: Buffer
    },
    stock:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export default model('product', productSchema)