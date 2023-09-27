const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt')

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/users', (req, res) => {
    // insert a new user record
    //req.body should contain email and password send by user 
    //insert a new record

    //sql - `insert into users....

    const saltRounds = 10;
    let email = req.body.signup_email
    let password = req.body.signup_password

    const sql = `
    INSERT INTO users (email, password_digest)
    VALUES ($1, $2)
    `

    // 1 Generate some salt
    bcrypt.genSalt(saltRounds, function(err, salt) {
        // 2 hash the password with the salt
        bcrypt.hash(password, salt, function(err, hash) {
            // 3 insert user and hashed password into database
            db.query(sql, [email, hash], (err, dbRes) => {
                 if(err) {
                    console.log(err);
                 } else {
                   res.redirect('/login')
                 }
           })
      })
    });

    

})


module.exports = router

// done