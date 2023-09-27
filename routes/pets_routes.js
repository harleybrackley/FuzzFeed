const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')

router.get('/pets/new', ensureLoggedIn, (req, res) => {
    res.render('new_pet_form')
})

router.post('/pets', (req, res) => {

    let userId = req.session.userId
    let petName = req.body.pet_name
    let petBreed = req.body.pet_breed
    let imageUrl = req.body.image_url
    let petCoat = req.body.pet_coat
    let petWeight = req.body.pet_weight
    let petDescription = req.body.pet_description

    const sql = `
    INSERT INTO pets (userId, petName, petBreed, imageUrl, petCoat, petWeight petDescription)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `

    db.query(sql, [userId, petName, petBreed, imageUrl, petCoat, petWeight, petDescription], (err, dbres) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/')
    })
})

router.delete('/pets/:id', ensureLoggedIn, (req, res) => {

    const sql = `DELETE FROM pets WHERE id = ${req.params.id};`

    db.query(sql, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        res.redirect('/')
    })
})

router.get('/pets/:id', (req, res) => {
    const sql = `SELECT * FROM pets WHERE id = ${req.params.id};`

    db.query(sql, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        let pet = dbRes.rows[0]
        res.render('show_pet', {pet})
    })
})

router.get('/pets/:id/edit', ensureLoggedIn, (req, res) => {
    
    let petId = req.params.id

    let sql = `SELECT * FROM pets WHERE id = ${petId}`

    db.query(sql, (err, dbRes) => {
        if(err) {
            console.log(err);
        }
        let pet = dbRes.rows[0]
        res.render('edit_pet_form', {pet})
    })
})

router.put('/pets/:id', (req, res) => {
    
    let sql = `
    UPDATE pets
    SET pet_name = $1, pet_breed = $2, image_url = $3, pet_coat = $4, pet_weight = $5 pet_description = $6
    WHERE id = $7;
    `

    const VALUES = [req.body.pet_name, req.body.pet_breed, req.body.image_url, req.body.pet_coat, req.body.pet_weight, req.body.pet_description, req.params.id]

    db.query(sql, (err, res) => {
        if(err) {
            console.log(err);
        }
        res.redirect(`pets/${req.params.id}`)
    })

})



module.exports = router

// done