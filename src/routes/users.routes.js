import {Router} from 'express'
import * as userController from '../controllers/users.controller'
const router = Router()

router.post('/signup', userController.createUser)

router.post('/signin', userController.userLogin)

export default router