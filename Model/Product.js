const mongoose = require('mongoose');


const productSchema = mongoose.Schema(
    {
        productId:{
            type:Number,
            unique:true,
            required:[true,'Required Field']
        },
        productName:{
            type:String,
        },
        productCode:{
            type:String,
            unique:true,
            required:[true,'Required Field']
        },
        description:{
            type:String
        },
        price:{
            type:Number,
            required:[true,'Required Field']
        },
        rating:{
            type:Number
        },
        manufacturer:{
            type:String
        },
        osType:{
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

const ProductModel = mongoose.model('products',productSchema);
module.exports = ProductModel;