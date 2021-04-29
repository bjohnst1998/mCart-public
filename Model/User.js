const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true,
            required:[true,'Required Field']
        },
        password:{
            type:String,
            required:[true,'Required Field']
        },
        phoneNumber:{
            type:Number,
            required:[true,'Required Field']
        },
        email:{
            type:String,
            required:[true,'Required Field']
        }
    },
    {
        timestamps:{
            createdAt:true,
            updatedAt:true
        }
    }
)
const UserModel = mongoose.model('users',userSchema);
module.exports = UserModel;