"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.getUsers = exports.defaultView = exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login_1 = require("../model/login");
async function RegisterUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateResult = utils_1.registerCourseSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const duplicatEmail = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (duplicatEmail) {
            res.status(409).json({
                msg: "Email has be used already"
            });
        }
        const duplicatePhone = await userModel_1.UserInstance.findOne({ where: { phonenumber: req.body.phonenumber } });
        if (duplicatePhone) {
            res.status(409).json({
                msg: 'Phone number has been used already'
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await userModel_1.UserInstance.create({
            id: id,
            fullname: req.body.fullname,
            email: req.body.email,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            password: passwordHash
        });
        res.status(201);
        res.json({
            message: "You have successfully signed up.",
            record
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to register',
            route: '/register'
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateResult = utils_1.LoginCourseSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const user = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        const { id } = user;
        const token = (0, utils_1.generateToken)({ id });
        res.cookie('mytoken', token, { httpOnly: true });
        res.cookie('id', id, { httpOnly: true });
        const validUser = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validUser) {
            res.status(401);
            res.json({ message: "incorrect password"
            });
        }
        if (validUser) {
            res.render('loginrefresh');
            //    res.status(200)
            //    res.json({message: "login successful",
            //       token,
            //       user   
            //      })
        }
    }
    catch (err) {
        res.status(500);
        res.json({
            message: 'failed to login',
            route: '/login'
        });
    }
}
exports.LoginUser = LoginUser;
async function defaultView(req, res, next) {
    try {
        const userId = req.cookies.id;
        const record = (await userModel_1.UserInstance.findOne({
            where: { id: userId },
            include: [{ model: login_1.LoginInstance, as: "courses" }],
        }));
        const user = record.courses;
        res.render("dashboard", { user: user });
        // res.status(200).json({
        //     msg:"You have successfully gotten your data",
        //     count: record.count,
        //     courses:{user}
        // })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "failed to login",
            route: "/login",
        });
    }
}
exports.defaultView = defaultView;
async function getUsers(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        // const record = await LoginInstance.findAll({where:{}, limit, offset}) 
        const record = await userModel_1.UserInstance.findAndCountAll({ where: {}, limit, offset, include: [{
                    model: login_1.LoginInstance,
                    as: "courses"
                }] });
        res.status(200);
        res.json({
            msg: "You have successfully retrieved all users",
            count: record.count,
            record: record.rows
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to retrieve all users',
            route: '/getUsers'
        });
    }
}
exports.getUsers = getUsers;
async function logOut(req, res) {
    res.clearCookie('mytoken');
    // res.status(200).json({
    //     message: You have succesfully logged out
    // })
    res.redirect('/');
}
exports.logOut = logOut;
