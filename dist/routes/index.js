"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const pagescontroller_1 = require("../controller/pagescontroller");
const usercontroller_1 = require("../controller/usercontroller");
router.post('/register', usercontroller_1.RegisterUser);
router.post('/login', usercontroller_1.LoginUser);
router.post('/index', pagescontroller_1.Homepage);
router.post('/logout', usercontroller_1.logOut);
exports.default = router;
