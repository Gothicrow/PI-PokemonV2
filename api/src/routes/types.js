const { Router } = require('express');
const axios = require('axios');
const types = require('../json/types.json')

const router = Router();
router.get('/', async (req,res)=>{
    try {
        res.send(types)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;