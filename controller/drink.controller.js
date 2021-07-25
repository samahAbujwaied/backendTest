'use strict'
const axios = require('axios');
const { drinkModel } = require('../models/drinks.model')
function getDrinkhandler(req, res) {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
        .then(result => {
            const resultDrinks = result.data.drinks.map(item => {
                return new createDrinkClass(item);
            })
            res.send(resultDrinks)
        }).catch(err => {
            console.log('error');
        })
}
console.log(getDrinkhandler);
class createDrinkClass {
    constructor(item) {
        this.strDrink = item.strDrink;
        this.strDrinkThumb = item.strDrinkThumb;
        this.idDrink = item.idDrink
    }
}
function postDrink(req, res) {
    const { strDrink, strDrinkThumb, idDrink } = req.body
    const postData = new drinkModel({
        strDrink: strDrink,
        strDrinkThumb: strDrinkThumb,
        idDrink: idDrink
    })
    postData.save();

}
function getDrinkFromDB(req, res) {
    drinkModel.find({}, (error, data) => {
        res.send(data);
    });
}
function deleteDrinkFromDB(req, res) {
    const { idx } = req.params;
    drinkModel.remove({ _id: idx }, (err, item) => { drinkModel.find({}, (error, data) => { res.send(data); }); })
}
function updateDrinkFromDB(req, res) {
    const { strDrink, strDrinkThumb, idDrink } = req.body;
    const { idx } = req.params
    drinkModel.findOne({ _id: idx }, (err, item) => {
        item.strDrink = strDrink;
        item.strDrinkThumb = strDrinkThumb;
        item.idDrink = idDrink;
        item.save().then(() => {
            drinkModel.find({}, (error, data) => { res.send(data); });
        })
    })
}
module.exports = { getDrinkhandler, postDrink, getDrinkFromDB, deleteDrinkFromDB, updateDrinkFromDB }