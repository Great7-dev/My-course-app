import Joi from 'joi'
import  jwt  from 'jsonwebtoken'
export const createCourseSchema = Joi.object().keys({
    course:Joi.string().lowercase().required(),
    description:Joi.string().required(),
    image:Joi.string().required(),
    price:Joi.number().required()
   
})


export const updateCourseSchema = Joi.object().keys({
    course:Joi.string().lowercase(),
    description:Joi.string(),
    image:Joi.string(),
    price:Joi.number()
})


export const registerCourseSchema =Joi.object().keys({
    fullname: Joi.string().required(),
    address:Joi.string().required(),
    email:Joi.string().trim().lowercase().required(),
    phonenumber:Joi.string().required().length(11).pattern(/^[0-9]+$/),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password:Joi.ref('password')
}).with('password', 'confirm_password')

export const LoginCourseSchema =Joi.object().keys({

    email:Joi.string().trim().lowercase().required(),
   
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
   
})

//generate token
export const generateToken=(user:{[key:string]:unknown}):unknown=>{
    const pass = process.env.JWT_SECRET as string
     return jwt.sign(user,pass, {expiresIn:'7d'})
}

export const options ={
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
}