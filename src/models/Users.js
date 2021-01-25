import {Schema, model} from 'mongoose'
import validator from 'validator'
const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true        
    },
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(validator.isLength(value, {min: 5})){
                throw new Error('Password must be greated than 5')
            }
        }
    }
},{
    versionKey: false
})

export default model('user', usersSchema)