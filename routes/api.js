const express = require('express');
const apiRouter = express.Router();
const {Place, Hotel, Activity, Restaurant, db} = require('../models')
module.exports = apiRouter;


apiRouter.get('/attractions', (req, res, next) => {
  let hotels = Hotel.findAll({ include: [ Place ] })
  let activities = Activity.findAll({ include: [ Place ] })
  let restaurants = Restaurant.findAll({ include: [ Place ] });

  Promise.all([hotels, activities, restaurants])
    .then(results => {
      res.json(results);
    })
    .catch(next)
 })
