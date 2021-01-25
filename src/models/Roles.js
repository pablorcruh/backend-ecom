import {Schema, model} from 'mongoose'

const rolesSchema = new Schema({
    name: {
        type: String
    }
})

export default model('roles', rolesSchema)