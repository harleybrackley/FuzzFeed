const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')
const upload = require('../middlewares/uploads')


router.get('/pets/new', ensureLoggedIn, (req, res) => {
    res.render('new_pet_form')
})

router.post('/pets/', upload.single('uploadfile'), (req, res) => {


    console.log(req.file.path);

    let userId = req.session.userId
    let petName = req.body.pet_name
    let petBreed = req.body.pet_breed
    let imageUrl = req.file.path
    let petCoat = req.body.pet_coat
    let petWeight = req.body.pet_weight
    let petDescription = req.body.pet_description

    const sql = `
    INSERT INTO pets (user_id, pet_name, pet_breed, image_url, pet_coat, pet_weight, pet_description)
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

// router.post('/pets/:id', upload.single('uploadfile'), (req, res) => {
    
//     let sql = `
//     UPDATE pets
//     SET pet_name = $1, pet_breed = $2, image_url = $3, pet_coat = $4, pet_weight = $5, pet_description = $6
//     WHERE id = $7;
//     `

//     console.log(req.file);

//     db.query(sql, [req.body.pet_name, req.body.pet_breed, req.file.path, req.body.pet_coat, req.body.pet_weight, req.body.pet_description, req.params.id], (err, dbRes) => {
//         if(err) {
//             console.log(err);
//         }
//         res.redirect(`/pets/${req.params.id}`)
//     })
// })

// router.post('/pets/:id', upload.single('uploadfile'), (req, res) => {
    
//     let sql = `
//     UPDATE pets
//     SET pet_name = $1, pet_breed = $2, pet_coat = $3, pet_weight = $4, pet_description = $5
//     WHERE id = $6;
//     `


//    const values = [req.body.pet_name, req.body.pet_breed, req.body.pet_coat, req.body.pet_weight, req.body.pet_description, req.params.id]

//    if(req.file) {
//     let sql = `
//     UPDATE pets
//     SET pet_name = $1, pet_breed = $2, image_url = $3, pet_coat = $4, pet_weight = $5, pet_description = $6
//     WHERE id = $7;
//     `
//     values.splice(2, 0, req.file.path)
//    } 


//    console.log(values);
//     db.query(sql, values, (err, dbRes) => {
//         if(err) {
//             console.log(err);
//         }
//         res.redirect(`/pets/${req.params.id}`)
//     })
// })


// router.post('/pets/:id', upload.single('uploadfile'), (req, res) => {
    
//     if (req.path) {
//         let values = [req.body.pet_name, req.body.pet_breed, req.file.path, req.body.pet_coat, req.body.pet_weight, req.body.pet_description, req.params.id]
//         let sql = `
//         UPDATE pets
//         SET pet_name = $1, pet_breed = $2, image_url = $3, pet_coat = $4, pet_weight = $5, pet_description = $6
//         WHERE id = $7;`

//         db.query(sql, values, (err, dbRes) => {
//             if(err) {
//                 console.log(err);
//             }
//             res.redirect(`/pets/${req.params.id}`)
//         })


//     } else {
//         let values =[req.body.pet_name, req.body.pet_breed, req.body.pet_coat, req.body.pet_weight, req.body.pet_description, req.params.id]
//         let sql = `
//         UPDATE pets
//         SET pet_name = $1, pet_breed = $2, pet_coat = $3, pet_weight = $4, pet_description = $5
//         WHERE id = $6;`
//         db.query(sql, values, (err, dbRes) => {
//             if(err) {
//                 console.log(err);
//             }
//             res.redirect(`/pets/${req.params.id}`)
//         })
//     }
// })

router.put('/pets/:id', upload.single('uploadfile'), (req, res) => {
    let sql = `
    UPDATE pets
    SET pet_name = $1, pet_breed = $2, pet_coat = $3, pet_weight = $4, pet_description = $5
    `;

    const values = [req.body.pet_name, req.body.pet_breed, req.body.pet_coat, req.body.pet_weight, req.body.pet_description];

    // Check if a file was uploaded
    if (req.file) {
        // If a new file was uploaded, update the image_url field
        sql += ', image_url = $6';
        values.push(req.file.path);
    }

    sql += ' WHERE id = $' + (values.length + 1); // Add the ID placeholder
    values.push(req.params.id);

    db.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err);
        }
        res.redirect(`/pets/${req.params.id}`);
    });
});

module.exports = router

// done