const { default: axios } = require('axios');
const { Sequelize, Op } = require('sequelize');
const Pokemon = require('./models/Pokemon.js')
const Types = require('./models/Types.js')

require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_DEPLOY
} = process.env

let db = new Sequelize({ 
  database: DB_NAME,
  dialect: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
  },
  dialectOptions: {
    /* ssl: {
      require: true,
      rejectUnauthorized: false,
    }, */
    keepAlive: true,
  },
  /* ssl: true */
})
/*: 
let db = new Sequelize(
  DB_DEPLOY,
  {
    logging: false,
    native: false,
    dialectOptions: {
      ssl: {
        require: true,
      },
    }
  }
);*/

Pokemon(db)
Types(db)

const { pokemon, type } = db.models

// Relaciones

pokemon.belongsToMany(type, { through: 'poketypes' })
type.belongsToMany(pokemon, { through: 'poketypes' })

const types = async () => {

  let cantTipos = await type.findAll()

  if (cantTipos < 20) {
    let tipos = await axios.get('https://pokeapi.co/api/v2/type')

    tipos = tipos.data.results

    for (let i = 0; i < tipos.length; i++) {
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

    for (let i = 0; i < pokes.length; i++) {

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

      for (let i = 0; i < poke.data.types.length; i++) {
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

/* setTimeout(()=>types(),5000)
setTimeout(()=>pokeApi(),7000) */


module.exports = {
  ...db.models,
  db,
  Op
}
