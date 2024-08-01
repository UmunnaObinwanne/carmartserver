const express = require('express');
const router = express.Router();
const Advert = require('../models/AdvertModel'); // Path to your Advert model
const UserModel = require('../models/UserModel'); // Path to your User model
const isAuthenticated = require('../Middleware/isAuthenticated')


//Create new advert

// Route to create a new advert
router.post('/create-advert', isAuthenticated, async (req, res) => {
  try {
    const {
      title,
      category,
      model,
      price,
      description,
      postalCode,
      country,
      city,
      address,
      isFeatured,
      imageUrls,
      features,

      // New fields
      year,
      mileage,
      bodyType,
      colour,
      seats,
      doors,
      enginePower,
      engineSize,
      brochureEngineSize,
      topSpeed,
      acceleration,
      fuelConsumption,
      fuelCapacity,
      urbanMpg,
      extraUrbanMpg,
      insuranceGroup,
      co2Emissions,
      euroEmissions
    } = req.body;

    // Get user ID from session
    const userId = req.user._id; // Now this should be defined
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    // Create a new advert
    const newAdvert = new Advert({
      title,
      category,
      model,
      price,
      description,
      country,
      city,
      address,
      postalCode,
      isFeatured,
      postedBy: user._id, // Store user ID in the `postedBy` field
      imageUrls, // Make sure this field is included
      features,

      // New fields
      year,
      mileage,
      bodyType,
      colour,
      seats,
      doors,
      enginePower,
      engineSize,
      brochureEngineSize,
      topSpeed,
      acceleration,
      fuelConsumption,
      fuelCapacity,
      urbanMpg,
      extraUrbanMpg,
      insuranceGroup,
      co2Emissions,
      euroEmissions
    });

    // Save the advert to the database
    await newAdvert.save();

    // Increment the number of ads posted by the user
    user.NumberOfAdsPosted += 1;
    await user.save();

    res.status(201).json({ message: 'Advert created successfully', advert: newAdvert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});


//Get all adverts
router.get('/used-cars', async (req, res) => {
  try {
    const adverts = await Advert.find().populate('category', 'name') // Populate category field with name
      .populate('model', 'name') // Populate model field with name
      .populate('postedBy', 'username') // Populate postedBy field with username
      .exec();
    return res.status(200).json(adverts)
  } catch(error) {
    res.status(500).json({message: error.message})
  }
})

router.get('/adverts/:id', async (req, res) => {
  try {
    const advertId = req.params.id;
    
    const advert = await Advert.findById(advertId)
      .populate('category', 'name') // Populate category field with name
      .populate('model', 'name') // Populate model field with name
      .populate('postedBy', 'username') // Populate postedBy field with username
      .exec();
    
    if (!advert) {
      return res.status(404).json({ message: 'Advert not found' });
    }

    res.json(advert);
  } catch (error) {
    console.error('Error fetching advert:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all adverts posted by a specific user
router.get('/user-adverts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const adverts = await Advert.find({ postedBy: userId })
      .populate('category', 'name') // Populate category field with name
      .populate('model', 'name') // Populate model field with name
      .populate('postedBy', 'username') // Populate postedBy field with username
      .exec();

    if (!adverts || adverts.length === 0) {
      return res.status(404).json({ message: 'No adverts found for this user' });
    }

    res.status(200).json(adverts);
  } catch (error) {
    console.error('Error fetching user adverts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
