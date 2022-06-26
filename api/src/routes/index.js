const { Router } = require('express');
const pokemon = require('./pokemon.js')

const router = Router();

router.use('/pokemon',pokemon)

module.exports = router;