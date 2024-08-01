const express = require('express');
const path = require('path');
const router = express.Router();

// Define the path to the JSON files
const jsonFolderPath = path.join(__dirname, '../json');

// Get Transmission Options
router.get('/transmission-options', (req, res) => {
  res.sendFile(path.join(jsonFolderPath, 'transmissions.json'));
});

// Get Drive Type Options
router.get('/drive-options', (req, res) => {
  res.sendFile(path.join(jsonFolderPath, 'driveTypes.json'));
});

// Get Feature Options
router.get('/feature-options', (req, res) => {
  res.sendFile(path.join(jsonFolderPath, 'features.json'));
});

router.get('/transaction-options', (req, res) => {
    res.sendFile(path.join(jsonFolderPath, 'transaction.json'));
})

router.get('/fuel-type', (req, res) => {
    res.sendFile(path.join(jsonFolderPath, 'fuelTypes.json'));
})
module.exports = router;
