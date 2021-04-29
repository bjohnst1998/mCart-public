const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
    {
        orderId:{
            type:Number,
            unique:true,
            required:[true,'Required Field']
        },
        cartId:{
            type:Number,
            required:[true, 'Required Field']
        },
        orderDetails:{
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

const OrderModel = mongoose.model('orders',orderSchema);
module.exports = OrderModel;