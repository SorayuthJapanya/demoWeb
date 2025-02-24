const jwt = require('jsonwebtoken')

exports.auth = async(req, res, next) => {
    try {
        const token = req.headers['authtoken']
        if(!token) {
            return res.status(401).send('No Token!!!')
        }

        // Check token
        const decoded = jwt.verify(token, 'jwtsecret')
        req.username = decoded.username

        next()

    } catch (error) {
        console.log(error)
        res.status(500).send('Token Invalid!!')
    }
}