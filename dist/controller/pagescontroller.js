"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homepage = void 0;
const login_1 = require("../model/login");
const userModel_1 = require("../model/userModel");
async function Homepage(req, res, next) {
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
        res.status(200);
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
exports.Homepage = Homepage;
