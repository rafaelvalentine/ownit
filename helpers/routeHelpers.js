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

module.exports = exports