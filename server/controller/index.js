let express = require('express');
let router = express.Router();
const passport = require('passport');
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayLoginPage = (req,res,next) => {
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local', (err,user, info) => 
    {
        // Server Error
        if(err)
        {
            return next(err);
        }
        // Login Error
        if(!user)
        {
            req.flash('loginMessage',
            'AuthenticationError');
            return res.redirect('/login');
        }
        req.login(user,(err) => {
            if(err)
            {
                return next(err)
            }
            return res.redirect('/itemlist');
        } )
    })(req,res,next)
}

module.exports.displayRegisterPage = (req,res,next) => {
    // Check If User Already Logged In
    if(!req.user)
    {
        res.render('auth/register', 
        {
            title: 'Register',
            message: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}

module.exports.processRegisterPage = (req,res,next) => 
{
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    })
    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New USer");
            if(err.name=="UserExistsError")
                {
                    req.flash('registerMessage',
                    'Registration Error: User Already Exists');
                }
            return res.render('auth/register',
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName:''
            });
        }
        else
        {
            // If Registration Not Successful
            return passport.authenticate('local')(req,res,() => {
                res.redirect('itemlist');
            })
        }
    })
}

module.exports.performLogout = (req,res,next) =>
{
    req.logout(function(err)
    {
        if(err)
        {
            return next(err);
        }
    })
    res.redirect('/');
}