import { DataTypes, Model } from "sequelize";
import db from "../config/database.config"
interface LoginAttributes{
    id:string;
    course:string;
    image:string;
    description:string;
    price:number;
    userId:string;
}

export class LoginInstance extends Model<LoginAttributes>{}

LoginInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    course:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
        userId:{
            type:DataTypes.STRING,
            allowNull:false
        }
    
},
{
    sequelize:db,
    tableName:'courses'
})