const { Router } = require('express');
const axios = require('axios');
const {pokemon, type} = require('../db')

const router = Router();
router.get('/', async (req,res)=>{
    try {
        const pokes = await pokemon.findAll({
            include:{
                model: type
            }
        })
        res.send(pokes)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;