import express, {Request, Response, NextFunction} from "express";
const router = express.Router();
import {Users,getCourses,getOne,UpdateCourses,DeleteCourses} from '../controller/courseController';
import { auth } from "../Middleware/auth";


/* GET users listing. */
router.post('/create',auth, Users);
router.get('/read', getCourses);
router.get('/read/:id', getOne);
router.patch('/update/:id',auth, UpdateCourses);
router.delete('/delete/:id',auth, DeleteCourses);

export default router;
