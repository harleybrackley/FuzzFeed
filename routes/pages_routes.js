const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    console.log(req.session.userId);
    db.query('SELECT * FROM dishes order by id;', (err, dbRes) => {
      let dishes = dbRes.rows
      res.render('home', { dishes: dishes })
    })

})
  
router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router

// done