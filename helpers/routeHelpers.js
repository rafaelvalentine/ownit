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
        // confirm that user typed same password twice
        //     if (req.body.password !== req.body.passwordConf) {
        //         let err = new Error('Passwords do not match.')
        //         err.status = 400
        //         res.send('passwords dont match')
        //         return next(err)
        //     }

    //     if (req.body.email &&
    //         req.body.username &&
    //         req.body.password &&
    //         req.body.passwordConf) {
    //         var userData = {
    //             email: req.body.email,
    //             username: req.body.username,
    //             password: req.body.password,
    //             passwordConf: req.body.passwordConf
    //         }

    //         database.Admins.create(userData, function(error, user) {
    //             if (error) {
    //                 return next(error)
    //             } else {
    //                 req.session.userId = user._id
    //                     // return res.redirect('/dashboard')
    //                 return res.send('dashboard')
    //             }
    //         })

    //     } else if (req.body.logemail && req.body.logpassword) {
    //         database.Admins.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
    //             if (error || !user) {
    //                 let err = new Error('Wrong email or password.')
    //                 err.status = 401
    //                 return next(err)
    //             } else {
    //                 req.session.userId = user._id
    //                 return res.redirect('/profile')
    //             }
    //         })
    //     } else {
    //         let err = new Error('All fields required.')
    //         err.status = 400
    //         return next(err)
    //     }
}

// exports.loggedAdmin = function(req, res, next) {
//     database.Admins.findById(req.session.userId)
//         .exec(function(error, user) {
//             if (error) {
//                 return next(error)
//             } else {
//                 if (user === null) {
//                     let err = new Error('Not authorized! Go back!')
//                     err.status = 400
//                     return next(err)
//                 } else {
//                     return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
//                 }
//             }
//         })
// }

// exports.logoutAdmin = function(req, res, next) {
//     if (req.session) {
//         // delete session object
//         req.session.destroy(function(err) {
//             if (err) {
//                 return next(err)
//             } else {
//                 return res.redirect('/')
//             }
//         })
//     }
// }
exports.getCars = function(req, res) {
    database.Car.find()
        .then((cars) => {
            res.json(cars)
        })
        .catch((err) => {
            res.send(err)
        })
}
exports.addCar = (req, res) => {
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
            res.json(newcar)
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports = exports