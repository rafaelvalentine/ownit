const localStrategy = require('passport-local').Strategy
const database = require('../models')
const bcrpyt = require('bcryptjs')

// Load admins from database
const admins = database.Admins

function passportConfig(passport) {
    passport.use(new localStrategy({ usernameField: 'loginEmail' }, (loginEmail, password, done) => {
        // Find and Match admin
        admins.findOne({
            email: loginEmail
        }).then(admin => {
            if (!admin) {
                done(null, false, console.log('Admin not found'))
            }
            // Find and Match admin password
            bcrpyt.compare(password, admin.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    return done(null, admin, console.log('Admin found!'))
                } else {
                    return done(null, false, console.log('Password is incorrect'))
                }
            })
        })
    }))
    passport.serializeUser(function(admin, done) {
        done(null, admin.id)
    })

    passport.deserializeUser(function(id, done) {
        admins.findById(id, function(err, user) {
            done(err, user)
        })
    })
}
module.exports = passportConfig