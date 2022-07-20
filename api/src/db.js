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

module.exports = {
  ...db.models,
  db,
  Op
}