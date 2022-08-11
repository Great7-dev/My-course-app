"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
// import { StringRegexOptions } from "joi";
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const login_1 = require("./login");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'fullname is required'
            },
            notEmpty: {
                msg: 'please provide a firstname'
            }
        }
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'address is required'
            },
            notEmpty: {
                msg: 'please provide an address'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Please provide a valid email'
            }
        }
    },
    phonenumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Phonenumber is required'
            },
            notEmpty: {
                msg: 'please provide a valid Phonenumber'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password is required'
            },
            notEmpty: {
                msg: 'please provide a strong password'
            }
        }
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'user'
});
UserInstance.hasMany(login_1.LoginInstance, { foreignKey: 'userId', as: 'courses' });
login_1.LoginInstance.belongsTo(UserInstance, { foreignKey: 'userId', as: 'user' });
