const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const quizID = mongoose.Schema({
    quizid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
});

module.exports = mongoose.model('qId',quizID);