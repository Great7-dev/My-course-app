"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/register', (req, res) => {
    res.render("register");
});
router.get('/login', (req, res) => {
    res.render("login");
});
router.get('/', (req, res) => {
    res.render("index");
});
router.get('/dashboard', (req, res) => {
    res.render("dashboard");
});
exports.default = router;
