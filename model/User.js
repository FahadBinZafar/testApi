const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true
    },
    avatar :{
        type : String

    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
     StudentId : {
        type : Number,
        required : true,
        unique: true
    },
    CollegeId : {
        type : Number,
        required : true
    },
    Batch : {
        type : Number,
        required : true
    },
    Sem: {
        type : Number,
        required : true
    },
    Branch : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('User',userSchema);