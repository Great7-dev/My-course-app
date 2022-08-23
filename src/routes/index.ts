import express from 'express'
import { getCourses } from '../controller/courseController';
const router = express.Router();
import { Homepage } from '../controller/pagescontroller'
import {LoginUser, logOut, RegisterUser } from '../controller/usercontroller'

router.post('/register',RegisterUser)
router.post('/login', LoginUser)
router.post('/index', Homepage)
router.post('/logout',logOut)

export default router;
