//NOTHING TO DO WITH SERVER.JS UI, Web APP 
//nothing to do with any of it


const pg = require('pg');
const bcrypt = require('bcrypt');

const db = new pg.Pool({
    database: 'goodfoodhunting'
})



const saltRounds = 10;
const email = 'harleybrackley@gmail.com'  
const password = '1234'

const sql = `
    INSERT INTO users (email, password_digest)
    Values ($1, $2)
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
                console.log('user created');
            }
        })
    })
});
