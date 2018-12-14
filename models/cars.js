const mongoose = require('mongoose')

const Schema = mongoose.Schema

let CarSchema = new Schema({
    make: {
        type: String,
        required: 'Enter Manufacturer',
        max: 25
    },
    model: {
        type: String,
        max: 25,
        required: 'Enter Model'
    },
    year: {
        type: String,
        required: 'Date is required',
        max: 4
    },
    downpayment: {
        type: String,
        required: 'Enter Amount for Down_payment'
    },
    weeklypayment: {
        type: String,
        required: 'Enter Amount for Weekly_payment'
    },
    carImage: {
        type: String,
        required: 'No Image Found'
    },
    date: {
        type: Date,
        default: Date.now
    }

})
const Car = mongoose.model('Car', CarSchema)

module.exports = Car