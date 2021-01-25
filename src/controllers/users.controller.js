import Users from '../models/Users'

export const createUser = async(req, res) => {
    try{
        const {name, username, email, password} = req.body
        const newUser = new Users({
            name,
            username,
            email,
            password
        })
        await newUser.save()
        res.status(200).json(newUser)
    }catch(error){
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
}