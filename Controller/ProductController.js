const productModel = require('../Model/Product');

exports.GetTablets = async (req,res) => {
    try{
        const tablets = await productModel.find({productCode:{"$regex":"TAB","$options":"i"}});
        if(tablets.length >0)
        {
            res.status(200).json({
                message:tablets
            })
        }
    }catch (err)
    {
        console.log(err);
        res.status(500).json({
            message: `An error has occured ${err}`
        })
    }
}

exports.GetMobiles = async (req,res) => {
    try{
        const mobiles = await productModel.find({productCode:{"$regex":"MOB","$options":"i"}});
        if(mobiles.length >0)
        {
            res.status(200).json({
                message:mobiles
            })
        }
    }catch (err)
    {
        console.log(err);
        res.status(500).json({
            message: `An error has occured ${err}`
        })
    }
}


exports.AddProduct = async (req,res) => {
    try{
    const newProd = await productModel.create(req.body);
    res.status(201).json({
        message:`Product Added Successfully!: ${newProd}`
    })
    }catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:`Failed to add product: ${err}`
         })
    }
}

exports.DeleteProduct = async (req,res) => {
    try{
        const prodToDelete = await productModel.deleteOne({productId:req.params.product});
        res.status(204).json({
            message:'Product successfully deleted'
        })
    }catch(err){
        res.status(500).json({
            message:`An error occurred trying to delete that product: ${err}`
        })
    }
}