const express = require('express')
const router = express.Router()
const CarModels = require('../models/CarModel')

//Get all Car Models
router.get('/models', async (req, res) => {
    try {
        const response = await CarModels.find();
        res.json(response)
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch car models', details: error.message})
    }
})

module.exports = router