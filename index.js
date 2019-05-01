const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
//console.developers.google.com
passport.use(new googleStrategy({
    clientID : keys.googleClientId,
    clientSecret : keys.googleClientsecret
})); 

app.get('/something',(req,res)=>{
    res.send({'key':'response'});
});

app.get('/',(req,res)=>{
    res.send({home:'page'});
});

//if port exists use port on heroku or use localhost 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);