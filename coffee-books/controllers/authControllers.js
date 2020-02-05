const User = require('../models/userModel');

exports.signUpGet = (req, res) => {
    res.render('signup');
}

exports.signUpPost =  async(req,res) =>{
    const {name, email, password} = req.body;
    if(name==="" || email===""){
        res.render('/signup', {message: 'Llena correctamente todos los campos'});
    }

    const user = await User.findOne({email});
    if(user){
        res.render('signup', {message: 'El usuario ya esta registrado'});
    }

    await User.register({name, email}, password);
    res.redirect('/login')
}

exports.loginGet = (req, res) => {
    res.render('login');
}

