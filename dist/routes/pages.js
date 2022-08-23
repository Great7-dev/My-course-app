"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagescontroller_1 = require("../controller/pagescontroller");
const router = express_1.default.Router();
const usercontroller_1 = require("../controller/usercontroller");
router.get('/register', (req, res) => {
    res.render("register");
});
router.get('/login', (req, res) => {
    res.render("login");
});
router.get('/', pagescontroller_1.Homepage);
router.get('/dashboard', (req, res) => {
    res.render("dashboard");
});
router.get('/editcourse/:id', (req, res) => {
    res.render("editcourse");
});
router.get('/coursereg', (req, res) => {
    res.render("coursereg");
});
router.get('/logout', usercontroller_1.logOut);
exports.default = router;
