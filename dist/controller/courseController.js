"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourses = exports.UpdateCourses = exports.getOne = exports.getCourses = exports.Users = void 0;
const login_1 = require("../model/login");
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
async function Users(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validateResult = utils_1.createCourseSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const record = await login_1.LoginInstance.create({ id, ...req.body, userId: verified.id });
        res.status(201);
        res.json({
            message: "You have successfully enrolled your course.",
            record
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
}
exports.Users = Users;
async function getCourses(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await login_1.LoginInstance.findAndCountAll({ limit, offset,
            include: [
                {
                    model: userModel_1.UserInstance,
                    attributes: ['id', 'fullname', 'address', 'email', 'phonenumber'],
                    as: 'user',
                },
            ],
        });
        // res.status(200);
        // res.json({
        //     msg:"Here are your courses",
        //     count:record.count,
        //     record:record.rows
        // })
        res.render('index', {
            title: "courses",
            message: 'Here are your courses',
            data: record.rows
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to read all',
            route: '/getCourses'
        });
    }
}
exports.getCourses = getCourses;
async function getOne(req, res, next) {
    try {
        const { id } = req.params;
        const record = await login_1.LoginInstance.findOne({ where: { id } });
        res.status(200).json({
            msg: "Here is your course",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to read single course',
            route: '/read/:id'
        });
    }
}
exports.getOne = getOne;
async function UpdateCourses(req, res, next) {
    try {
        const { id } = req.params;
        const { course, description, image, price } = req.body;
        const validateResult = utils_1.updateCourseSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const record = await login_1.LoginInstance.findOne({ where: { id } });
        if (!record) {
            res.status(404).json({
                Error: "cannot find course",
            });
        }
        const updaterecord = await record?.update({
            course: course,
            description: description,
            image: image,
            price: price
        });
        res.status(200).json({
            message: 'you have successfully updated your course',
            record: updaterecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to update',
            route: '/update/:id'
        });
    }
}
exports.UpdateCourses = UpdateCourses;
async function DeleteCourses(req, res, next) {
    try {
        const { id } = req.params;
        const record = await login_1.LoginInstance.findOne({ where: { id } });
        if (!record) {
            res.status(404).json({
                message: "does not exist"
            });
        }
        const deletedRecord = await record?.destroy();
        res.status(200).json({
            msg: 'Course has been deleted successfully',
            deletedRecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to delete',
            route: '/delete/:id'
        });
    }
}
exports.DeleteCourses = DeleteCourses;
