"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const courseController_1 = require("../controller/courseController");
const usercontroller_1 = require("../controller/usercontroller");
const auth_1 = require("../Middleware/auth");
/* GET users listing. */
router.post('/create', auth_1.auth, courseController_1.Users);
router.post("/login", usercontroller_1.LoginUser);
router.get('/dashboard', usercontroller_1.defaultView);
router.get('/read', courseController_1.getCourses);
router.get('/read/:id', courseController_1.getOne);
router.patch('/update/:id', auth_1.auth, courseController_1.UpdateCourses);
router.get('/delete/:id', auth_1.auth, courseController_1.DeleteCourses);
router.post('/update/:id', auth_1.auth, courseController_1.UpdateCourses);
router.get("/unique/:id", courseController_1.getUniqueCourse);
exports.default = router;
//<a href="/users/update/<%=courses.id%>"
