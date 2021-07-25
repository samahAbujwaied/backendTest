'use strict'
const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    strDrink:String,
    strDrinkThumb:String,
    idDrink:String
})
const drinkModel = mongoose.model('drinkModel',drinkSchema )
console.log(drinkModel);

module.exports  = {drinkModel} 