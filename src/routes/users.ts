import express, {Request, Response, NextFunction} from "express";
const router = express.Router();
import {Users,getCourses,getOne,UpdateCourses,DeleteCourses,getUniqueCourse} from '../controller/courseController';
import { defaultView, LoginUser } from "../controller/usercontroller";
import { auth } from "../Middleware/auth";


/* GET users listing. */
router.post('/create',auth, Users);
router.post("/login",LoginUser)
router.get('/dashboard',defaultView)
router.get('/read', getCourses);
router.get('/read/:id', getOne);
router.patch('/update/:id',auth, UpdateCourses);
router.get('/delete/:id',auth, DeleteCourses);

router.post('/update/:id',auth, UpdateCourses);
router.get("/unique/:id", getUniqueCourse)

export default router;

//<a href="/users/update/<%=courses.id%>"