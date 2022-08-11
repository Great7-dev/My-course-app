import express from 'express'
const router = express.Router();
import {LoginUser, RegisterUser, getUsers} from '../controller/usercontroller'

router.post('/register',RegisterUser)
router.post('/login', LoginUser)
router.get('/getUsers',getUsers)

export default router;
