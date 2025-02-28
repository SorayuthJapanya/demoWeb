const mongoose = require('mongoose')

const classificationSchema = mongoose.Schema({
    leaf_id: {
        type: String,
        required: true,
        unique: true
    },
    thai_name: {
        type: String,
        required: true,
    },
    base_color: {
        type: String,
        required: true
    },
    shape: {
        type: String,
        required: true
    },
    vein: {
        type: String,
        required: true
    },
    margin: {
        type: String,
        required: true
    },
    midrib: {
        type: String,
        required: true
    },
    petiole_shape: {
        type: String,
        required: true
    },
    petiole_color: {
        type: String,
        required: true
    },
    type_leaf: {
        type: String,
        required: true
    },
    stem: {
        type: String,
        required: true
    },
    thorny: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('classifications', classificationSchema);