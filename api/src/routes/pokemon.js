const { Router } = require('express');
const axios = require('axios');
const {pokemon, type} = require('../db')   

/* const types = async () => {

    let cantTipos = await type.findAll()

    if(cantTipos<20){
    let tipos = await axios.get('https://pokeapi.co/api/v2/type')

    tipos = tipos.data.results

    for(let i=0;i<tipos.length;i++){
        await type.create({
        name: tipos[i].name
        })
    }
    console.log('Tipos cargados')
    }
}

const pokeApi = async () => {
    try { 
        let pokes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1154')
        pokes = pokes.data.results

        for(let i=0;i<pokes.length;i++){

        let poke = await axios.get(pokes[i].url)

        const clave = Object.keys(poke.data.sprites.other)

        let pok = await pokemon.create({
            id: poke.data.id,
            name: poke.data.name,
            image: poke.data.sprites.other.dream_world.front_default ? poke.data.sprites.other.dream_world.front_default : poke.data.sprites.other[clave[2]].front_default,
            hp: poke.data.stats[0].base_stat,
            attack: poke.data.stats[1].base_stat,
            defense: poke.data.stats[2].base_stat,
            speed: poke.data.stats[5].base_stat,
            height: poke.data.height,
            weight: poke.data.weight,
        })

        for(let i=0;i<poke.data.types.length;i++){
            let tipo = await type.findAll({
            where: {
                name: poke.data.types[i].type.name
            }
            })

            await pok.addType(tipo[0].dataValues.id)
        }

        console.log(`${poke.data.id}`)
        }
        console.log('Carga completa')
    } catch (error) {
    console.log(error)
    }
}

setTimeout(()=>types(),1500)
setTimeout(()=>pokeApi(),3000)*/

const router = Router();

router.get('/', async (req,res)=>{
    try {

        const {order1,order2} = req.query

        let paginas = []
        let pokes

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