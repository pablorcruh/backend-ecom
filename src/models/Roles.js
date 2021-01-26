import {Schema, model} from 'mongoose'

const rolesSchema = new Schema({
    name: {
        type: String
    }
},{
    versionKey: false
})

export default model('Roles', rolesSchema)