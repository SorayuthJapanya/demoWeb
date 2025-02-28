
const multer = require('multer')
const classification = require('../models/classification')

const upload = multer()

exports.listAllClass = async (req, res) => {
    try {
        const listAllClass = await classification.find({}).exec()
        res.send(listAllClass)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.createClass = async (req, res) => {
    try {
        const {
            leaf_id,
            thai_name,
            base_color,
            shape,
            vein,
            margin,
            midrib,
            petiole_shape,
            petiole_color,
            type_leaf,
            stem,
            thorny
        } = req.body;

        console.log('Data From form-data', req.body)

        const newClass = new classification({
            leaf_id,
            thai_name,
            base_color,
            shape,
            vein,
            margin,
            midrib,
            petiole_shape,
            petiole_color,
            type_leaf,
            stem,
            thorny
        })

        await newClass.save()
        res.status(200).json({ message: 'Class Created Successfully!', data: newClass })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.findClass = async (req, res) => {
    try {
        const {
            base_color,
            shape,
            vein,
            margin,
            midrib,
            petiole_shape,
            petiole_color,
            type_leaf,
            stem,
            thorny
        } = req.body;

        console.log('Data From form-data', req.body)

        const inputData = {
            base_color,
            shape,
            vein,
            margin,
            midrib,
            petiole_shape,
            petiole_color,
            type_leaf,
            stem,
            thorny
        }

        // Put All Data from Database
        const allClassification = await classification.find({})

        // Data compare All Feild
        const totalFeilds = Object.keys(inputData).length

        // Create for result
        const result = []

        for (const classification of allClassification) {
            let matchCount = 0

            // Loop into Feild 
            for (const key in inputData) {
                if (classification[key] === inputData[key]) {
                    matchCount++
                }
            }
            // Calculate Percentage
            const percentage = (matchCount / totalFeilds) * 100

            // Push Data to Result
            result.push({
                thai_name: classification.thai_name,
                percentage: percentage.toFixed(2)
            })
        }

        // Sort max.percentage to min.percentage
        result.sort ((a, b) => b.percentage - a.percentage)

        res.status(200).json({
            secces: true,
            data: result
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }
}