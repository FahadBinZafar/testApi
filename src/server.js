const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB= require('../config/db');

const app = express();

/*app.use((req, res ,next) =>{
    console.log("Middle Ware");
    req.title = "Pathan";

    next();
}) */

app.use(morgan('dev'));

app.use(express.json({}));

app.use(express.json({
    extended : true
}));

dotenv.config({
    path : './config/config.env'
});

connectDB();

app.get('/',(req, res) =>{
    res.status(200).json({
        msg: 'deploy successful'

    });
})

/*app.get('/MIsbah',(req, res) =>{
    res.status(200).json({
        "name":"RB"
         

    });
});  */


app.use('/api/todo/auth', require('../routes/user'));
app.use('/api/todo/auth/user',require('../routes/quiz'));

const PORT =process.env.PORT || 3000;
app.listen(PORT,
     console.log(`running at port:${PORT}`.red.underline.bold)
     );