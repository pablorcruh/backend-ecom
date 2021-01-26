import Users from '../models/Users'
import Roles from '../models/Roles'
export const createUser = async(req, res) => {
    try{
        const {name, username, email, password, roles} = req.body
        const rolesFound = await Roles.find({ name: { $in: roles } });
        const newUser = new Users({
            name,
            username,
            email,
            password,
            roles: rolesFound.map((role)=> role._id)
        })
        await newUser.save()
        res.status(200).json(newUser)
    }catch(error){
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}