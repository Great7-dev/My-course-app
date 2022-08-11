"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.LoginCourseSchema = exports.registerCourseSchema = exports.updateCourseSchema = exports.createCourseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createCourseSchema = joi_1.default.object().keys({
    course: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    price: joi_1.default.number().required()
});
exports.updateCourseSchema = joi_1.default.object().keys({
    course: joi_1.default.string().lowercase(),
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    price: joi_1.default.number()
});
exports.registerCourseSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phonenumber: joi_1.default.string().required().length(11).pattern(/^[0-9]+$/),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.ref('password')
}).with('password', 'confirm_password');
exports.LoginCourseSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});
//generate token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
