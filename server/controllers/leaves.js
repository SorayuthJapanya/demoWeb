const leaves = require('../models/leaves')

exports.listAllLeaf = async(req,res) => {
    try {
        const listLeaves = await leaves.find({}).exec()
        res.send(listLeaves)
    }catch(err) {
        console.log('err')
        res.status(500).send('Server Error')
    }
}

exports.getOneLeaf = async(req,res) => {
    try {
        const { leaf_id } = req.params
        console.log(leaf_id)
        const getleaf = await leaves.findOne({leaf_id: leaf_id}).exec()
        res.send(getleaf)
    }catch(err) {
        console.log('err')
        res.status(500).send('Server Error')
    }
}

exports.findNameLeaf = async(req, res) => {
    try {
        const { thai_name } = req.query

        // Reauire check
        if (!thai_name) {
            return res.status(400).json({ error: "This yamLeaf isn't required" });
        }
        
        // Find leaf
        const findLeaf = await leaves.find({ thai_name: { $regex: thai_name, $options: "i" } });

        res.status(200).json(findLeaf);
    }catch(err) {
        console.log('err')
        res.status(500).send('Server Error')
    }
}


exports.createLeaf = async(req,res) => {
    try {
        console.log(req.body)
        const newLeaf = await leaves(req.body).save()
        res.status(200).json({ message: "Leaf created succesfully!", leaf: newLeaf })

    }catch(err) {
        console.log('err')
        res.status(500).send('Server Error')
    }
}

exports.updateLeaf = async(req,res) => {
    try {
        const { leaf_id } = req.params
        console.log(leaf_id)
        const updateData = req.body

        // Cheak leaf_id
        const check_leafid = await leaves.findOne({ leaf_id })
        if(!check_leafid) {
            return res.status(404).json({ error: "Leaf not found!" })
        }

        // Update Data
        const updated = await leaves.findOneAndUpdate({ leaf_id }, updateData, {
            new: true,
            runValidators: true,
        }).exec()

        res.status(200).json({ message: "Leaf updated succesfully!", leaf: updated })
    }catch(err) {
        console.log('err')
        res.status(500).send('Server Error')
    }
}

exports.removeLeaf = async(req,res) => {
    try {
        const { leaf_id } = req.params
        console.log(leaf_id)

        // Cheak leaf_id
        const check_leafid = await leaves.findOne({ leaf_id })
        if(!check_leafid) {
            return res.status(404).json({ error: "Leaf not found!" })
        }

        // Delete Data
        const deleted = await leaves.findOneAndDelete({ leaf_id }).exec() 

        res.status(200).json({ message: "Leaf deleted succesfully!", leaf: deleted })
    }catch(err) {
        console.log('err')
        res.status(500).send('Server Error')
    }
}

