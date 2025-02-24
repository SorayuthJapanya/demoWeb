const mongoose = require('mongoose')

const LeavesSchema = mongoose.Schema({
    leaf_id: {
        type: String, 
        required: true, 
        unique: true
    },
    thai_name: {
        type: String,
        required: true
    },
    local_name: {
        type: String ,
        required: true
    },
    descrip: {
        type: String,
        require: true 
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Leaves', LeavesSchema)