const express = require('express')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcryptjs')
const passpost = require('passport')
const routeHelpers = require('../helpers/routeHelpers')


// Load Admin Model
const database = require('../models')
    // GET route for admins to view dashboard
router.route('/dashboard')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
    })

//POST route for Admin login  
router.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'sign-in.html'));
    })
    .post((req, res) => {
        console.log()

    })

// admin resgistration POST
router.route('/register')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'sign-up.html'));
    })
    .post((req, res) => {
        let newAdmin = new database.Admins({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                if (err) throw err;
                newAdmin.password = hash;
                newAdmin.save()
                    .then(admin => {
                        res.redirect('/login')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        })
    })
    // .post(routeHelpers.addAdmin)



//POST route for updating data
//router.post('/', )

// GET route after registering
// router.get('/dashboard', routeHelpers.loggedAdmin)

// // GET for logout logout
// router.get('/logout', routeHelpers.logoutAdmin)

module.exports = router