const express = require('express')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcryptjs')
const passpost = require('passport')
const routeHelpers = require('../helpers/routeHelpers')
const ensureAuthenticated = require('../helpers/Auth.js')


// Load Admin Model
const database = require('../models')
    // GET route for admins to view dashboard
router.route('/dashboard')
    .get(ensureAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'dashboard.html'))
    })
    // GET route for admins to view dashboard
router.route('/drive2own_cars')
    .get(ensureAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'drive2own_cars.html'))

    })
    //POST route for Admin login  
router.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'sign-in.html'))
    })
    .post((req, res, next) => {
        passpost.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    })

// admin resgistration POST
router.route('/register')
    .get(ensureAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'sign-up.html'));
    })
    .post(ensureAuthenticated, (req, res) => {
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
                        res.redirect('/register')
                        console.log(err)
                    })
            })
        })
    })




//POST route for updating data
//router.post('/', )

// GET route after registering
// router.get('/dashboard', routeHelpers.loggedAdmin)

// GET for logout logout
router.get('/logout', (req, res) => {
        req.logOut();
        console.log('you are logged out')
        res.redirect('/login')
    })
    /**
     * get car details from landing page
     */
router.route('/corolla')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'corolla.html'))
    })
module.exports = router