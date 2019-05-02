const passport = require('passport');

module.exports = (app) =>{
    // indicates where the passport identification happens.
    app.get('/auth/google', passport.authenticate('google',{
        scope:['profile','email'] // users information
        })
    );

    // this authentication directs to accessToken => on Google Strategy
    app.get('/auth/google/callback',passport.authenticate('google'));

    app.get('/',(req,res)=>{
        res.send({home:'page'});
    });
}