const { Router } = require('express');
const axios = require('axios');
const {pokemon, type} = require('../db')

const router = Router();
router.get('/', async (req,res)=>{
    try {

        let paginas = []

        const pokes = await pokemon.findAll({
            include:{
                model: type
            }
        })

        if(pokes.length>0){
            let cantPages = Math.ceil(pokes.length/20)
            let inicio = 0
            for(let i=0;i<cantPages;i++){
                let cadaPag = {
                    page: i,
                    pokes: pokes.slice(inicio,inicio+20)
                }
                inicio = inicio+20
                paginas.push(cadaPag)
            }
        }

        res.send(paginas)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;