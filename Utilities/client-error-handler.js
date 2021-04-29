function clientErrorHandler(err,req,res,next){
    if(req.xhr){
        res.status(500).send({error:'Something went wrong!'});
    }else{
        next(err)
    }
}

module.exports =clientErrorHandler