import {Router} from 'express'
import * as userController from '../controllers/users.controller'
const router = Router()

router.post('/', userController.createUser)

router.post('/login', userController.userLogin)

export default router