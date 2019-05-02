const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/users'); // model must be defined first!
require('./services/passport'); // passport handles saving..


const app = express();

mongoose.connect(keys.mongoURI);

authRoutes(app)

//if port exists use port on heroku or use localhost 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);