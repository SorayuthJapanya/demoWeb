const express = require('express')
const router = express.Router()

const { 
    listAllLeaf,
    getOneLeaf,
    createLeaf,
    updateLeaf,
    removeLeaf,
    findNameLeaf,
} = require('../controllers/leaves')

// Middleware
const { auth } = require('../middleware/auth')
const { uploadImg } = require('../middleware/uploadImg')
 
// GET All Leaf
router.get('/getLeaf', listAllLeaf)
// Get One Leaf
router.get('/getLeaf/:leaf_id', getOneLeaf)
// Find leaf for Name Img
router.get('/findLeaf', findNameLeaf)
// POST Leaf
router.post('/postLeaf', createLeaf)
// UPDATE Leaf
router.put('/updateLeaf/:leaf_id', updateLeaf)
// DELETE Leaf
router.delete('/removeLeaf/:leaf_id', removeLeaf)

module.exports = router