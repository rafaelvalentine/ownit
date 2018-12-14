const mongoose = require('mongoose')

const Schema = mongoose.Schema

let OwnitSchema = new Schema({
    firstname: {
        type: String,
        required: "First Name cannot be empty",
        max: 25
    },
    lastname: {
        type: String,
        max: 25
    },
    email: {
        type: String,
        required: 'Email Address is needed',
        max: 25
    },
    number: {
        type: String,
        required: true,
        max: 18
    },
    product: {
        type: String,
        required: 'Need to select a Product'
    },
    car: {
        type: String,
        required: 'No car selected'
    },
    date: {
        type: Date,
        default: Date.now
    }

})
const Ownit = mongoose.model('Ownit', OwnitSchema)

module.exports = Ownit