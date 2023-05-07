const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const qId = require('./quizId');

const question = mongoose.Schema({
    qId :{
        type : ObjectId,
        ref : 'quizID'
    },
    email :({
        type : String,
        requied : true

    }),
    question : ({
        type : String,
        requied: true
    }),
    o1 : ({
        type : String,
        requied: true
    }),
    o2 : ({
        type : String,
        requied: true
    }),
    o3 : ({
        type : String,
        requied: true
    }),
    o4 : ({
        type : String,
        requied: true
    }),
});

    


module.exports = mongoose.model('Quiz',question);