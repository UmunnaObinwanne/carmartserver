const express = require('express')
const router = express.Router();
const Categories = require('../models/CategoryModel')

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const response = await Categories.find()
        res.json(response)
        
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories', details: error.message })
    }
}); 

module.exports = router