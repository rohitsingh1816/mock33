const express = require('express');
const Book=require('../models/book');
require('dotenv').config()

const bookRouter = express.Router();


// all available books
bookRouter.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Retrieve details of a specific book by ID
  bookRouter.get('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// filtering
// Filter books by category
bookRouter.get('/books', async (req, res) => {
    try {
      const { category, author } = req.query;
      const filters = {};
      if (category) {
        filters.category = category;
      }
      if (author) {
        filters.author = author;
      }
      const books = await Book.find(filters);
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// for dmin
// Add a new book (Protected Route)
bookRouter.post('/books', async (req, res) => {
    // Implement authentication to check if the user is an admin (JWT)
    // If the user is not an admin, return a 401 Unauthorized status
    // Otherwise, continue with book creation
    try {
      const { title, author, category, price, quantity } = req.body;
  
      const newBook = new Book({
        title,
        author,
        category,
        price,
        quantity,
      });
  
      await newBook.save();
      res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// updte delete for dmin
// Update a specific book by ID (Protected Route)
bookRouter.put('/books/:id', async (req, res) => {
    // Implement authentication to check if the user is an admin (JWT)
    // If the user is not an admin, return a 401 Unauthorized status
    // Otherwise, continue with book update
    try {
      const { title, author, category, price, quantity } = req.body;
  
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        {
          title,
          author,
          category,
          price,
          quantity,
        },
        { new: true }
      );
  
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Delete a specific book by ID (Protected Route)
  bookRouter.delete('/books/:id', async (req, res) => {
  
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(202).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports={bookRouter}