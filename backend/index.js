const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.port || 3000;
const db_url = 'mongodb://127.0.0.1:27017/gleason-db' || process.env.DB_URL;

mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true } ,function(err){
    if (err) {
        console.log(err)
    } else {
        console.log('Db connected....')
    }
}); 

app.use(cors());

// create application/x-www-form-urlencoded parser
app.use(body_parser.urlencoded({ extended: false }))


// using body parser middleware for parsing the request body
app.use(body_parser.json());


app.use('/user', require('./routes'))

app.listen(port, function(){
    console.log(`server started on port ${port}`)
})

