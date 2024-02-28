const User = require('../models/user.models.js');
const {v4: uuidv4}  =require('uuid');
const {setUser} = require('../services/auth.services.js')

async function handleUserSignUp(req,res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect('/');
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password })
    if(!user) return res.render('login',{
        error: "Invalid username or password"
    });

    // generate cookies
    const token  = setUser(user);
    res.cookie('token',token);
    return res.redirect('/');
}

module.exports = {handleUserSignUp, handleUserLogin, }