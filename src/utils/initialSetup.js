import Roles from '../models/Roles'
import Users from '../models/Users'
export const createRoles = async() => {
    try{
        const count = await Roles.estimatedDocumentCount()
        if(count > 0)  return 
        const allRoles = await Promise.all([
            new Roles({name: 'shopper'}).save(),
            new Roles({name: 'admin'}).save()
        ])
        console.log(allRoles)
    }catch(error){
        console.error(error.message)
    }
}

