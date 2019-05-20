const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId : String,
    credits : { type: Number, default: 0 }
});

//create a new collection 'users'
mongoose.model('users',userSchema);