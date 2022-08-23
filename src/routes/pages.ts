import express from 'express';
import { Homepage } from '../controller/pagescontroller';
const router = express.Router();
import { logOut } from '../controller/usercontroller';


router.get('/register',(req, res )=>{
    res.render("register")
})
router.get('/login',(req,res)=>{
    res.render("login")
})
router.get('/', Homepage)

router.get('/dashboard',(req,res)=>{
    res.render("dashboard")
})

router.get('/editcourse/:id',(req,res)=>{
    res.render("editcourse")
})
router.get('/coursereg',(req, res )=>{
    res.render("coursereg")
})
router.get('/logout', logOut)

export default router;
