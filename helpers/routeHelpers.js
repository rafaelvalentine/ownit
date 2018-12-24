const database = require('../models')
exports.getUsers = (req, res) => {
    database.Ownit.find()
        .then((users) => {
            res.json(users)
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.addUser = (req, res) => {
    database.Ownit.create(req.body)
        .then((newuser) => {
            res.json(newuser)
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.findUser = (req, res) => {
    database.Ownit.findById(req.params.userid)
        .then((founduser) => {
            res.json(founduser)
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.updateUser = (req, res) => {
    database.Ownit.findOneAndUpdate({ _id: req.params.userid }, req.body, { new: true })
        .then((founduser) => {
            res.json(founduser)
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.deleteUser = (req, res) => {
    database.Ownit.findOneAndDelete({ _id: req.params.userid })
        .then(() => {
            res.send('Entry Deleted')
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.addAdmin = function(req, res, next) {
    database.Admins.create(req.body)
        .then((newadmin) => {
            res.json(newadmin)
        })
        .catch((err) => {
            res.send(err)
        })
}


exports.getCars = function(req, res) {
    database.Car.find()
        .sort({ year: 'asc' })
        .then((cars) => {
            res.json(cars)
        })
        .catch((err) => {
            res.send(err)
        })
}
exports.addCar = (req, res) => {

    console.log(req.file)
    console.log(req.file)
    database.Car.create({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            downpayment: req.body.downpayment,
            carImage: req.file.path,
            weeklypayment: req.body.weeklypayment
        })
        .then((newcar) => {
            res.redirect('/drive2own_cars')
            console.log(newcar)
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.findCar = (req, res) => {
    database.Car.findById(req.params.carid)
        .then((foundcar) => {
            res.json(foundcar)
        })
        .catch((err) => {
            res.send(err)
        })
}
exports.updateCar = (req, res) => {
    console.log(req.file, req.headers, req.body)
    let path = req.body.carImage
    if (req.file) {
        path = req.file.path
    }
    database.Car.findOneAndUpdate({ _id: req.params.carid }, {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            downpayment: req.body.downpayment,
            carImage: path,
            weeklypayment: req.body.weeklypayment
        }, { new: true })
        .then((foundcar) => {
            res.redirect('/drive2own_cars')


        })
        .catch((err) => {
            res.send(err)
        })
}
exports.deleteCar = (req, res) => {
    database.Car.findOneAndDelete({ _id: req.params.carid })
        .then(() => {
            res.redirect('/drive2own_cars')
        })
        .catch((err) => {
            res.send(err)
        })
}
module.exports = exports