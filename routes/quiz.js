const express = require("express");
const router = express.Router();
const Quiz = require('../model/QuizSchema');
const quizId = require("../model/quizId");

router.post('/quiz',async (req,res,next) =>{
    const {q,email,o1,o2,o3,o4}= req.body;
    let quiz = Quiz();
    quiz.question=q;
    quiz.email=email;
    quiz.o1=o1;
    quiz.o2=o2;
    quiz.o3=o3;
    quiz.o4=o4;
    await quiz.save();

    res.status(200).json({
        sussess : true,
        msg :'quiz created',
        quiz:quiz
    });
    

});
module.exports=router;