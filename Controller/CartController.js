const cartModel = require('../Model/Cart');

exports.GetAllCarts = async (req,res) => {
    try{
        const carts = await cartModel.find();
        res.status(200).json({
            message:carts
        })

    }catch (err)
    {
        console.log(err);
        res.status(500).json({
            message:`An error has occured! ${err}`
        })
    }
}

exports.GetUserCart = async (req,res) => {
    try{
        const user = req.session.user;
       // console.log(req.params.username);
        const carts = await cartModel.find({username:user});
        if(carts.length >0)
        {
            res.status(200).json({
                message:carts
            })
        }
        else{
            res.status(200).json({
                message:'No carts exist under that username'
            })
        }
    }catch (err)
    {
        console.log(err);
        res.status(500).json({
            message:`An error has occurred! ${err}`
        })
    }
}

exports.AddToCart = async (req,res) => {
    try{
        const existingCart = await cartModel.find({username:req.session.user, statusOfCart:"Open"});
        if(existingCart.length >0)
        {
            res.status(400).json({
                message:"User's cart is already available, please append to same cart!"
            })
        }
        else{
            const user = req.session.user;
            const products =JSON.stringify(req.body.productsInCart);
            const status = "Open";
            const item = await cartModel.find().sort({cartId:-1}).limit(1); //Gives back the highest cart id
            const thisId =item[0].cartId+1;            
            const newCart = {
                cartId:thisId,
                username:user,
                productsInCart:products,
                statusOfCart:status
            }    
            const confirmedCart = await cartModel.create(newCart);
            res.status(201).json({
                message:`New items got inserted into the cart with ID of ${thisId}`
            })   
        }       
    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:`An error has occurred! ${err}`
        })
    }
}

exports.UpdateUserCart = async (req,res) => {
    try{
        const updatedProducts = JSON.stringify(req.body.productsInCart);
        const updatedCart = await cartModel.findOneAndUpdate({username:req.session.user},{productsInCart:updatedProducts},{new:true});

        if(updatedCart !=null)
        {
            res.status(200).json({
                message:`CartId:${updatedCart.cartId} updated!`
            })
        } else{
            res.status(400).json({
                message:"User's cart not available"
            })
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message:`An error has occurred! ${err}`
        })
    }
}

exports.CloseCartStatus = async(username) => {
    try{
        const updatedCart = await cartModel.findOneAndUpdate({username:username, statusOfCart:"Open"},{statusOfCart:"Closed"},{new:true});
        if(updatedCart !=null)
        {
            return updatedCart;
        }
        return null;
    }catch(err) {
        console.log(err);
        return null;
    }
}