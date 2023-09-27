
function ensureLoggedIn (req, res, next) {
    if (req.session.userId) {
        return next()
    } 
    req.session.message = "You need to log in first!"
    return res.redirect('/login')
}

module.exports = ensureLoggedIn