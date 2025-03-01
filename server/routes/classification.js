const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer()

const { 
    listAllClass,
    createClass,
    findClass
 } = require('../controllers/classification')

// Get All Class
router.get('/getClass', listAllClass)

// POST Create Class
router.post('/createClass',upload.none(), createClass)

// Get Find Class
router.post('/findClass',upload.none(), findClass)


module.exports = router