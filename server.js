'use strict'
require('dotenv').config();
const express = require('express');
const app = express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
const {getDrinkhandler,postDrink,getDrinkFromDB,deleteDrinkFromDB,updateDrinkFromDB} = require('./controller/drink.controller')
// const {drinkseed} = require('./models/drinks.model').drinkseed
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/drink',
 {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/getDrink',getDrinkhandler)
app.post('/postDrink',postDrink)
app.get('/getDrinkFromDB',getDrinkFromDB)
app.delete('/deleteData/:idx',deleteDrinkFromDB)
app.put('/putData/:idx',updateDrinkFromDB)
app.listen(3456,()=>{
    console.log('is connected ');
})