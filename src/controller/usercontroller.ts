import express,{Request,Response,NextFunction} from 'express';
import {v4 as uuidv4, validate} from "uuid";
import { registerCourseSchema,options, LoginCourseSchema,generateToken} from "../utils/utils";
import { UserInstance } from '../model/userModel';
import bcrypt from 'bcryptjs'
import { Model } from 'sequelize/types';
import { LoginInstance } from '../model/login';


export async function RegisterUser(req:Request, res:Response, next:NextFunction) {
    const id = uuidv4()
    try{
        const validateResult = registerCourseSchema.validate(req.body,options)
        if(validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const duplicatEmail =  await UserInstance.findOne({where: {email: req.body.email}})
        if(duplicatEmail){
            res.status(409).json({
                msg:"Email has be used already"
            })
        }
        const duplicatePhone = await UserInstance.findOne({where:{phonenumber: req.body.phonenumber}})
        if(duplicatePhone){
            res.status(409).json({
                msg: 'Phone number has been used already'
            })
        }
        const passwordHash = await bcrypt.hash(req.body.password, 8)
        const record = await UserInstance.create({
            id:id,
            fullname: req.body.fullname,
            email:req.body.email,
            address:req.body.address,
            phonenumber:req.body.phonenumber,
            password:passwordHash
         })
         res.render('loginrefresh')
        // res.status(201);
        // res.json({
        //     message:"You have successfully signed up.",
        //     record
        // })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'failed to register',
            route:'/register'

        })
    }

  }

  export async function LoginUser(req:Request, res:Response, next:NextFunction) {
    const id = uuidv4()
    try{
        const validateResult = LoginCourseSchema.validate(req.body,options)
        if(validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const user =  await UserInstance.findOne({where: {email: req.body.email}}) as unknown as {[key:string]:string};

       const {id} = user
       const token = generateToken({id})
       res.cookie('mytoken', token, {httpOnly:true})
       res.cookie('id',id,{httpOnly:true})
       const validUser= await bcrypt.compare(req.body.password, user.password)
       if(!validUser){
        res.status(401)
       res.json({message: "incorrect password"  
         })
       }
       if(validUser){
        // res.render('loginrefresh')
       res.status(200)
       res.json({message: "login successful",
          token,
          user   
         })
       }
    }catch(err){
        res.status(500)
        res.json({
            message:'failed to login',
            route:'/login'

        })
    }

  }

  export async function defaultView(

    req: Request,
  
    res: Response,
  
    next: NextFunction
  
  ) {
  
    try {
  
      const userId = req.cookies.id;
  
      const record = (await UserInstance.findOne({
  
        where: { id: userId },
  
        include: [{ model: LoginInstance, as: "courses" }],
  
      })) as unknown as { [key: string]: string };
  
  const user=record.courses
  
      res.render("dashboard", { user:user });
    // res.status(200).json({
    //     msg:"You have successfully gotten your data",
    //     count: record.count,
    //     courses:{user}
    // })
  
    } catch (err) {
        console.log(err);
        
  
      res.status(500).json({
  
        msg: "failed to login",
  
        route: "/login",
  
      });
  
    }
  
  }

  

export async function getUsers(req:Request, res:Response, next:NextFunction){
    try{
        const limit = req.query.limit as number | undefined
        const offset = req.query.offset as number| undefined
        // const record = await LoginInstance.findAll({where:{}, limit, offset}) 
        const record = await UserInstance.findAndCountAll({where:{}, limit, offset,include:[{
            model:LoginInstance,
            as:"courses"
        }]})
        res.status(200);
        res.json({
            msg:"You have successfully retrieved all users",
            count:record.count,
            record:record.rows
        })
    }catch(error){
           res.status(500).json({
            msg:'failed to retrieve all users',
             route: '/getUsers'
           })
    }
  }

export async function logOut(req:Request, res:Response) {

    res.clearCookie('mytoken')
    // res.status(200).json({
    //     message: You have succesfully logged out
    // })
    res.redirect('/')
}