const { Router } = require('express');
const axios = require('axios');
const {pokemon, type} = require('../db')   


const router = Router();

router.get('/', async (req,res)=>{
    try {

        const {search,order1,order2, tipo} = req.query

        let paginas = []
        let pokes

        console.log(tipo)

        if(order1&&order2){
            pokes = await pokemon.findAll({
                include:{
                    model: type
                },
                order:[
                    [order1, order2]
                ]
            })
        }

        if(tipo){
            pokes = pokes.filter(p=>p.types.find(t=>t.name===tipo))
        }

        if(search){
            pokes = pokes.filter(p=>p.name.includes(search))
        }

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

router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params

        const poke = await pokemon.findAll({
            where: {id: id}
        })

        res.send(poke[0])
    } catch (error) {
        console.groupCollapsed(error)
    }
})

module.exports = router;