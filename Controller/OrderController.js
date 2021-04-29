const orderModel = require("../Model/Order");
const cartController = require("./CartController");

exports.CreateOrder = async (req,res) => {
    try{
        const user = req.session.user;
        const orderDetails = JSON.stringify(req.body);
        const lastOrder = await orderModel.find().sort({orderId:-1}).limit(1);
        const orderNumber = lastOrder[0].orderId + 1;
        const cart = await cartController.CloseCartStatus(user);
        if( cart !=null)
        {
            const newOrder = {
                orderId:orderNumber,
                cartId: cart.cartId,
                orderDetails:orderDetails
            }
           const completedOrder =await orderModel.create(newOrder);
           console.log(completedOrder);
           res.status(201).json({
               message:`New order placed with ID: ${orderNumber}`
           })
        }
        else{
            res.status(400).json({
                message:"An open cart could not be found!"
            })
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:`An error has occurred! ${err}`
        })
    }
}