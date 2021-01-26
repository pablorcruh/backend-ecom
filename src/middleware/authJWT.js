import jwt from 'jsonwebtoken'
import Users from '../models/Users'
import Roles from '../models/Roles'

export const verifyToken = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if(!token) return res.status(403).json({message: 'Token not provided'})
        const decoded  = jwt.verify(token, 'clave')
        req.userId = decoded.id
        const user = await Users.findById(req.userId)
        if(!user) return res.status(404).json({message: 'User not Found'})
        next()
    } catch (error) {
        console.error(error.message)
        res.status(403).json({message: 'Unauthorized'})
    }
}

export const isAdmin = async(req, res, next) => {
    try {
        const user = await Users.findById(req.userId)
        const roles = await Roles.find({_id: {$in: user.roles}})
        for(let i = 0; i < roles.length; i++){
            if(roles[i].name ==='admin'){
                next()
                return
            }
            res.status(403).json({message: 'Require Admin Role'})
        }
    } catch (error) {
        console.error(error.message)
        res.status(403).json({message: 'Require Admin Role to perform Action'})
    }
}