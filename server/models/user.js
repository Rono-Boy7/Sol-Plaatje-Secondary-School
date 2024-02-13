let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim: true,
        required: 'Username Is required'
    },
    /*
    password:
    {
        type:String,
        default:"",
        trim: true,
        required: 'Password Is required'
    }, */

    displayName:
    {
        type:String,
        default:"",
        trim: true,
        required: 'DisplayName Is required'
    },

    created: 
    {
        type: Date,
        default: Date.now
    },

    update: 
    {
        type: Date,
        default: Date.now
    }
},
{
    collection: "user"
}

)

// Config Options For User Model
let options = ({MissingPasswordError: 'Incorrect Passowrd'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User', User);