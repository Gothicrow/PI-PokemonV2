import { GET_DETAILS, GET_POKEMONS, GET_TYPES } from './actionTypes'
import axios from 'axios'

export function getPokemons(search,order1,order2,tipo){
    return async dispatch => {
        const pokemons = await axios.get(`/pokemon?search=${search}&&order1=${order1}&&order2=${order2}&&tipo=${tipo}`)
        return dispatch({type: GET_POKEMONS, payload: pokemons.data})
    }
}

export function getTypes(){
    return async dispatch => {
        const types = await axios.get('/types')
        return dispatch({type: GET_TYPES, payload: types.data})
    }
}

export function getDetails({pokeId}){
    return async dispatch => {
        const details = await axios.get(`/pokemon/${pokeId}`)
        return dispatch({type: GET_DETAILS, payload: details.data})
    }
}