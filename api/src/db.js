const { default: axios } = require('axios');
const { Sequelize, Op } = require('sequelize');
const Pokemon = require('./models/Pokemon.js')
const Types = require('./models/Types.js')

require('dotenv').config();

const {
    DB_USER, DB_PASSWORD, DB_NAME, DB_HOST
} = process.env

let db = process.env.NODE_ENV === "production" ? new Sequelize({
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
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
})
: new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

Pokemon(db)
Types(db)

const {pokemon, type} = db.models

// Relaciones

pokemon.belongsToMany(type, {through: 'poketypes'})
type.belongsToMany(pokemon, {through: 'poketypes'})

const types = async () => {

  let cantTipos = await type.findAll()

  if(cantTipos<20){
    let tipos = await axios.get('https://pokeapi.co/api/v2/type')

    tipos = tipos.data.results

    for(let i=0;i<tipos.length;i++){
      await type.create({
        name: tipos[i].name
      })
    }
  }
}

const pokeApi = async () => {

  let cantPokes = await pokemon.findAll()

  if(cantPokes<1154){
    let pokes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1154')
    pokes = pokes.data.results
    for(let i=0;i<pokes.length;i++){
      let poke = await axios.get(pokes[i].url)

      let pok = await pokemon.create({
        id: poke.data.id,
        name: poke.data.name,
        image: poke.data.sprites.other.dream_world.front_default,
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
    }
  }
}

setTimeout(()=>types(),1000)
setTimeout(()=>pokeApi(),2000)


module.exports = {
  ...db.models,
  db,
  Op
}