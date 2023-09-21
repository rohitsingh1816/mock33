const express = require('express');
const app = express();
const port = 3000; // Choose a port of your choice

const userRouter = require('./routes/user.route'); 
const bookRouter=require('./routes/book.route');
const orderRouter= require('./routes/order.route');


const connection =require('./db')

// Create a simple endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Masai Library');
});

app.use('/', userRouter)
app.use('/api',bookRouter)

app.use('/',orderRouter)









app.listen(port, async() => {
  await connection
  console.log(`Server is running on port ${port}`);
});
