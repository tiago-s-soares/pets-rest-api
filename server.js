const dotenv = require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//Connect to Database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to DB'))

//Use the express JSON method for parsing
app.use(express.json())

//Require and use the router
const petsRouter = require("./routes/pets")
app.use('/pets', petsRouter)

app.listen('3000', () => { console.log('Server started @ http://localhost:3000')})

