const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const user_jwt = require('../middleware/user_jwt');
const jwt = require('jsonwebtoken');

router.get('/', user_jwt, async (req, res, next) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            user: user
        });

    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
        next();

    }

});

router.post('/register',async (req , res, next) =>{
    const {username, email, password, StudentId, CollegeId, Batch,Sem,Branch} =req.body;

    try{
        let user_exist = await User.findOne({ email: email});
        let sid_exist = await User.findOne({ StudentId: StudentId});
        if(user_exist || sid_exist){
            return res.json({
                success: false,
                msg: 'User already exists'
            });
        }
        let user= new User();
        user.username = username;
        user.email = email;
        user.StudentId = StudentId;
        user.CollegeId = CollegeId;
        user.Batch= Batch;
        user.Sem= Sem;
        user.Branch = Branch;

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        let size=200;
        user.avatar = "https://gravatar.com/avatar/?s="+size+'&d=retro';

        await user.save();

        const payload ={
            user :{
                id : user.id
            }
        }

        jwt.sign(payload, process.env.jwtUserSecret, {
            expiresIn: 360000
        }, (err, token) =>{
            if(err) throw err;
            res.status(200).json(
                {
                    success: true, 
                    token: token
                }
            );
        });

      /*  res.json({
            success: true,
            msg:'User registered',
            user: user

        }); */


    }
    catch(err){
        console.log(err);
    }
   

});
router.post('/login',async (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        let user= await User.findOne({
            email: email
        });
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: 'User not exist go and register to continue.'
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                msg: 'Invalid Password'
            });
        }

        const payload ={
            user :{
                id: user.id
            }
        }

        jwt.sign(
            payload, process.env.jwtUserSecret,
            {
                expiresIn: 360000
            },
            (err,token) =>{
                if(err) throw err;

                res.status(200).json({
                    success: true,
                    msg: 'User logged In',
                    token: token,
                    user: user
                });
            }
        )

    }
    catch (error){
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg:'Server Error'
        })


    }

});
module.exports = router;