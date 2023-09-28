const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt')



router.get('/', (req, res) => {
    console.log(req.session.userId);
    db.query('SELECT * FROM pets order by id;', (err, dbRes) => {
      let pets = dbRes.rows
      res.render('home', { pets: pets })
    })

})
  
router.get('/about', (req, res) => {
    res.render('about')
})



module.exports = router

// done