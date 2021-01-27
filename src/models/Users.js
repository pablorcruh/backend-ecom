import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true   
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
            if(!validator.isLength(value, {min: 5})){
                throw new Error('Password must be greated than 5')
            }
        }
    },
    roles:[{
        ref: 'Roles',
        type: Schema.Types.ObjectId
    }]
},{
    versionKey: false
})

usersSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

usersSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email}).populate('roles')
    if(!user){
        throw new Error('Credentials not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Password not valid')
    }
    return user
}

const User = model('User', usersSchema)
 export default User