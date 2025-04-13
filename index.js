require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const crypto = require('crypto')
const authroutes = require('../backend/routes/authRoutes')
const {PORT , MONGODB_URL} = require('../backend/config/env')

const app = express()

app.use(express.json())
app.use('/api/auth',authroutes)


mongoose.connect(MONGODB_URL).then(
    console.log('monodb connected')
)


app.listen(PORT,()=>{
    console.log('server running at port 3000')
})