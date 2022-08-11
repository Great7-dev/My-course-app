// import { StringRegexOptions } from "joi";
import { DataTypes, Model } from "sequelize";
import db from "../config/database.config"
import { LoginInstance } from "./login";
interface UserAttributes{
    id:string;
    fullname: string;
    address:string;
    email:string;
    phonenumber:string;
    password:string;
}

export class UserInstance extends Model<UserAttributes>{}

UserInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'fullname is required'
            },
            notEmpty:{
                msg:'please provide a firstname'
            }
        }
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'address is required'
            },
            notEmpty:{
                msg:'please provide an address'
            }
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'Email is required'
            },
            isEmail:{
                msg:'Please provide a valid email'
            }
        }
    },
    phonenumber:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'Phonenumber is required'
            },
            notEmpty:{
                msg:'please provide a valid Phonenumber'
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                msg:'Password is required'
            },
            notEmpty:{
                msg:'please provide a strong password'
            }
        }
        
    }
},{
    sequelize:db,
    tableName:'user'
});

UserInstance.hasMany(LoginInstance,{foreignKey:'userId', as: 'courses'})
LoginInstance.belongsTo(UserInstance, {foreignKey:'userId', as: 'user'})
