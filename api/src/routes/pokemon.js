const { Router } = require('express');
const axios = require('axios');
const pokemon = require('../json/pokemon.json');


const router = Router();

router.get('/', async (req, res) => {
    try {

        const { search, order1, order2, tipo } = req.query

        let paginas = []
        let pokes = pokemon

        if (order1 && order2) {
            if(order1=='name'){
                order2 == 'asc' ?
                pokes = pokes.sort((a, b) => a[order1].localeCompare(b[order1])) :
                pokes = pokes.sort((a, b) => b[order1].localeCompare(a[order1]))
            }else{
                pokes = pokes.sort((a, b) => order2 == 'asc' ? a[order1] - b[order1] : b[order1] - a[order1])
            }
        }

        if (tipo) {
            pokes = pokes.filter(p => p.types.find(t => t.name === tipo))
        }

        if (search) {
            pokes = pokes.filter(p => p.name.includes(search))
        }

        if (pokes.length > 0) {
            let cantPages = Math.ceil(pokes.length / 20)
            let inicio = 0
            for (let i = 0; i < cantPages; i++) {
                let cadaPag = {
                    page: i,
                    pokes: pokes.slice(inicio, inicio + 20)
                }
                inicio = inicio + 20
                paginas.push(cadaPag)
            }
        }

        res.send(paginas)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const poke = pokemon.find(poke => poke.id == id)

        res.send(poke)
    } catch (error) {
        console.groupCollapsed(error)
    }
})

module.exports = router;