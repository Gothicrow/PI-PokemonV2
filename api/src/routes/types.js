const { Router } = require('express');
const axios = require('axios');
const {type} = require('../db')

const router = Router();
router.get('/', async (req,res)=>{
    try {
        const types = await type.findAll()
        res.send(types)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;