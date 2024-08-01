const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Message = require('../models/MessageModel');
const isAuthenticated = require('../Middleware/isAuthenticated')

// Get all messages for a specific user

router.get('/:userId/messages', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const messages = await Message.find({ recipient: user._id });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', details: error.message });
  }
});

// Send a new message

router.post('/send-messages', isAuthenticated, async (req, res) => {
  console.log(req.body); // Log the request body
  try {
    const { recipientId, content } = req.body;
    const senderId = req.user._id;

    if (!recipientId || !content) {
      return res.status(400).json({ error: 'Recipient ID and content are required' });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const newMessage = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
    });

    await newMessage.save();

    // Update sender's and recipient's messages list
    await User.findByIdAndUpdate(senderId, { $push: { messages: newMessage._id } });
    await User.findByIdAndUpdate(recipientId, { $push: { messages: newMessage._id } });

    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get messages for a user
router.get('/user-messages/:userId', isAuthenticated, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Fetch user and populate messages
    const user = await User.findById(userId).populate('messages').exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
