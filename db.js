const mongoose = require('mongoose')
// require('dotenv').config()

const connection=mongoose.connect('mongodb+srv://rohit:rohit@cluster0.kfl5wyg.mongodb.net/masai?retryWrites=true&w=majority').then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})




module.exports={connection}