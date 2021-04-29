exports.ValidatePassword = (password) =>{
    if(password.length >5)
    {
        return true;
    }
    return false;
}

exports.ValidatePhone = (phone) => {
    if(phone.toString.length !=10)
    {
        return false;
    }
    return true;
}

