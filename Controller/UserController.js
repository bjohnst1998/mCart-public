const userModel = require('../Model/User');
const passValidator = require('../Utilities/passwordValidator')
const bcrypt = require('bcryptjs');

exports.Signup = async(req,res) => {
    const username = req.body.username;
    const pass = req.body.password;
    const phone = req.body.phoneNumber;
    console.log(req.body);
    try{
        var existingUser = await userModel.find({username:username})
        if(existingUser != 0)
        {
            res.status(400).json({
                message:`User already registered with Name ${username}`
            });
        }
        else{
            if(!passValidator.ValidatePassword)
            {
                res.status(400).json({
                    message:`Password must be a minimum of 5 characters`
                });
            }
            else{
                if(!passValidator.ValidatePhone)
                {
                    res.status(400).json({
                        message:'Phone number should be 10 digits'
                    });
                }
                else{
                    var user = {
                        'username': username,
                        'password':pass,
                        'phoneNumber':phone,
                        'email':req.body.email
                    }
                    var user = await userModel.create(user);
                    res.status(201).json({
                        status:'success',
                        message:`User registered with name ${username}`
                    })
                }
            }
        }
    }catch(err)
    {
        res.status(500).json({
            status:'fail',
            message:`An error has occured: ${err}`
        })
    }
};

exports.Login = async(req,res) =>{
    const username = req.body.username;
    const pass = req.body.password;
    console.log(pass);
    try{
        const existingUser = await userModel.findOne({username:username});
       //console.log(existingUser);
       const validated = await bcrypt.compare(pass,existingUser.password);
        if(existingUser && validated)
        {
            //Login successful!
            console.log("User has logged in");
            req.session.user = username;
            res.status(200).json({
                "LoggedIn":true
            })
        }
        else{
            res.status(400).json({
                "LoggedIn":false
            })
        }
        
    }catch (err)
    {
        console.error(err);
        res.status(500).json({
            message:`An Error has occured: ${err}`
        })
    } 
}

