import express from 'express'
import { addUserController, getUserController } from '../controllers/userController.js'

const router = express.Router()

router.get('/get-users', getUserController)

router.post('/add-user', addUserController)

export { router as userRouter }
