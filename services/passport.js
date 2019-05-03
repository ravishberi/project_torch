const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//place in cookie using mongos unique id
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then((user)=>{
        done(null,user);
    })
});

//console.developers.google.com
passport.use(new googleStrategy(
    {
        clientID : keys.googleClientId,
        clientSecret : keys.googleClientsecret,
        callbackURL : '/auth/google/callback',
        proxy : true
    },
    (accessToken, refreshToken, profile, done) =>{
        User.findOne({googleId : profile.id}).then((exisitingUser)=>{
            if(exisitingUser){
                //we already have a user fitting this criteria
                done(null, exisitingUser);

            }else{
                //we dont have the record and we need to create a new user
                new User({ googleId : profile.id })
                .save()
                .then((user)=>{
                    done(null, user);
                })
            }
        })
    }
)); 