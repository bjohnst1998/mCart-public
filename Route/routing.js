const express = require('express');

const routing = express.Router();
const userController = require('../Controller/UserController')
const productController = require('../Controller/ProductController')
const cartController = require('../Controller/CartController');
const orderController = require('../Controller/OrderController');
const { hashPass } = require('../Utilities/hasher');
const sessAuth = require('../Utilities/session-auth');

routing.get('/login',userController.Login);
routing.get('/tablets',productController.GetTablets);
routing.get('/mobiles',productController.GetMobiles);
routing.get('/carts',cartController.GetAllCarts);
routing.get('/carts',sessAuth,cartController.GetUserCart);

routing.post('/signup',hashPass,userController.Signup);
routing.post('/carts',cartController.AddToCart);
routing.post('/orders',sessAuth,orderController.CreateOrder);
routing.post('/product',productController.AddProduct);

routing.put('/carts',sessAuth,cartController.UpdateUserCart);

routing.delete('/products/:product',productController.DeleteProduct);

routing.all('*',invalid);

//sends a 404 back to the user if any other URI is used.
async function invalid(req,res)
{
    res.status(404).json({
        message:'Resource not Found'
    })
}

module.exports = routing;