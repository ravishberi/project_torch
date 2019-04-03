const express = require('express');
const app = express();

app.get('/something',(req,res)=>{
    console.log(req)
    res.send({'key':'response'});
});

app.get('/',(req,res)=>{
    console.log(req)
    res.send({home:'page'});
});

//if port exists use port on heroku or use localhost 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);