import userController from '../controllers/userController.js'
import express from 'express'
const router = express.Router();


router.post('/login', userController.login)
router.post('/register', userController.register)

export default router;