const bcrypt =require('bcryptjs');

const saltRound = 15
const genSalt = bcrypt.genSaltSync(saltRound);

exports.hashPass = async(req,res,next) =>
{
    try{
        const hashPwd = await bcrypt.hash(req.body.password,genSalt);
        req.body.password = hashPwd;
        next();
    }catch(err){
        console.error(err);
        res.status(500).send({error:'Something went wrong!'});
    }
    
}



