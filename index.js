const express = require('express');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/users'); // model must be defined first!
require('./services/passport'); // passport handles saving..

mongoose.connect(keys.mongoURI,{useNewUrlParser: true});

const app = express();

//app.use is required for middlewares
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

//required for heroku to handle local web build / service react-router routes / express routes
if(process.env.NODE_ENV ==='production'){
    // Express will serve up prodution assets, like main.js!
    app.use(express.static('client/build'));
    // Express will serve up index.html 
    // file if it doesn't recognize the route.
    const path = require('path');
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })


}

//if port exists use port on heroku or use localhost 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);