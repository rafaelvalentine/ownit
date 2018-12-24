module.exports = function ensureAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
    console.log('not Authorized!')
}