const mongoose = require('mongoose');


const cartSchema = mongoose.Schema(
    {
        cartId:{
            type:Number,
            unique:true,
            required:[true,'Required Field']
        },
        username:{
            type:String,
            required:[true,'Required Field']
        },
        productsInCart:{
            type:String
        },
        statusOfCart:{
            type:String
        }
    },
    {
        timestamps:{
            createdAt:true,
            updatedAt:true
        }
    }
)

const CartModel = mongoose.model('carts',cartSchema);
module.exports = CartModel;