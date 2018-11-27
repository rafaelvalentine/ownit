const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const AdminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true
    }
})

//authenticate input against database
AdminSchema.statics.authenticate = function(email, password, callback) {
    Admin.findOne({ email: email })
        .exec(function(err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                let err = new Error('Admin not found.')
                err.status = 401
                return callback(err)
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                    return callback(null, user)
                } else {
                    return callback()
                }
            })
        })
}

// hashing a password before saving it to the database
AdminSchema.pre('save', function(next) {
    let user = this
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})


const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin