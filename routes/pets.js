const { resolveSoa } = require('dns')
const express = require('express')
const pet = require('../models/pet')
const router = express.Router()
const Pet = require('../models/pet')

// Get all pets

router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find({})
        res.json(pets)
    } catch (err) {
        // Status 500 - Server Error
        res.status(500).json(err.message)
    }
})

//Get one pet

router.get('/:id', getPet, (req, res) => {
    res.json(res.pet)
})

//Create one pet

router.post('/', async (req, res) => {
    const pet = new Pet({
        name: req.body.name,
        type: req.body.type
    })
    try {
        const newPet = await pet.save()
        // Status 201 - Successfuly created Object
        res.status(201).json(newPet)
    } catch (err) {
        // Status 400 - Error with user input
        res.status(400).json({ message: err.message })
    }
})

//Update one pet

router.patch('/:id', getPet, async (req, res) => {
    if (req.body.name != null) {
        res.pet.name = req.body.name
    }
    if (req.body.type != null) {
        res.pet.type = req.body.type
    }
    try {
        const updatedPet = await res.pet.save()
        res.json(updatedPet)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete one pet

router.delete('/:id', getPet, async (req, res) => {
    try {
        await res.pet.remove()
        res.json({ message: 'Deleted Pet'})
    } catch {
        res.status(500).json({ message: err.message })
    }
})

//Middleware

async function getPet(req, res, next) {
    let pet
    try {
        pet = await Pet.findById(req.params.id)
        if (pet == null) {
            return res.status(404).json({ message: 'Cannot find pet' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.pet = pet
    // Allows to proceed to the request
    next()
}

module.exports = router

