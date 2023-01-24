const { builtinModules } = require('module')
const mongoose = require('mongoose')

const petsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Pet', petsSchema)