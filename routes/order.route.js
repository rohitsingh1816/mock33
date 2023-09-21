const express = require('express');
const Order=require('../models/order')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const orderRouter = express.Router();
const bcrypt = require('bcrypt');



// orders

// Place an order (Protected Route)
orderRouter.post('/api/order', async (req, res) => {
    
    try {
      const { userId, books, totalAmount } = req.body;
  
      const newOrder = new Order({
        user: userId, // Assuming you have the user's ID from JWT
        books,
        totalAmount,
      });
  
      await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// 

orderRouter.get('/api/orders', async (req, res) => {
    // Implement authentication to check if the user is an admin (JWT)
    // If the user is not an admin, return a 401 Unauthorized status
    // Otherwise, continue with order retrieval
    try {
      const orders = await Order.find().populate('user').populate('books');
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


module.exports={orderRouter}