const mongoose = require('mongoose');
const userSchema  =new mongoose.Schema({
    name:{
            type: String,
            required: true,
    },

    email:{
            type: String,
            required: true,
            unique: true,
    },

    password:{
            type: String,
            required: true,
    },

},{timestamps: true});

const User  = mongoose.model('user', userSchema);   // create 'users' collection in show-url database
module.exports = User;