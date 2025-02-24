
const mongoose = require('mongoose')

const imagesSchema = mongoose.Schema({
    imagesPath: String,
    imagesResult: String
}, {timestapms: true })

module.exports = mongoose.model('images', imagesSchema)
