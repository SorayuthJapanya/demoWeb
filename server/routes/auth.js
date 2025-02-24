const express = require('express')
const router = express.Router()

const { 
    register,
    login
} = require('../controllers/auth')


// Post Register
router.post('/register', register)
//Post Login
router.post('/login', login)

module.exports = router