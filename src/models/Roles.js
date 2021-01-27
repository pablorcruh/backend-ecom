import {Schema, model} from 'mongoose'

const rolesSchema = new Schema({
    name: {
        type: String
    }
},{
    versionKey: false,
    timestamps: true
})

export default model('Roles', rolesSchema)