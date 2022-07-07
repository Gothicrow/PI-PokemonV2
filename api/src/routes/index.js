const { Router } = require('express');
const pokemon = require('./pokemon.js')
const types = require('./types.js')

const router = Router();

router.use('/pokemon',pokemon)
router.use('/types',types)

module.exports = router;