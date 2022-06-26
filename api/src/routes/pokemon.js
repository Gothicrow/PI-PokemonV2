const { Router } = require('express');
const axios = require('axios');
const {pokemon} = require('../db')

const router = Router();
router.get('/', async (req,res)=>{
    try {
        const pokes = pokemon.findAll()
        res.send('pokes')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;