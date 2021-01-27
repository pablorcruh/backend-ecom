import jwt from 'jsonwebtoken'

import Users from '../models/Users'
import Roles from '../models/Roles'

export const createUser = async(req, res) => {
    try{
        const {name, username, email, password, roles} = req.body
        const newUser = new Users({
            name,
            username,
            email,
            password
        })
        let rolesFound
        if(roles){
            rolesFound = await Roles.find({ name: { $in: roles } });
        }else{
            rolesFound = await Roles.find({name:'shopper'})
        }
        newUser.roles = rolesFound.map((role)=> role._id)
        newUser.password = await Users.encryptPassword(newUser.password)
        await newUser.save()
        res.status(200).json({message: 'User Created'})
    }catch(error){
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}

export const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await Users.findByCredentials(email, password)
        const token = jwt.sign({id: user._id, roles: user.roles}, process.env.TOKEN_SECRET,{
            expiresIn: 86400
        })
        res.json({token})
    }catch(error){
        console.error(error.message)
        res.status(401).json({message: 'Unable to Login'})
    }
}