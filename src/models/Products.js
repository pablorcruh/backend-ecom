import {Schema, model} from 'mongoose'

new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: Description
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