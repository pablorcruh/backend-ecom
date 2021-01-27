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
    imageUrl: {
        type: String,
        default: ''
    },
    stock:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{
    versionKey: false,
    timestamps: true
})

productSchema.methods.toJSON = function () {
    const product = this
    const productObject = product.toObject()
    delete productObject.image
    return productObject
}

export default model('Product', productSchema)