import { GET_DETAILS, GET_POKEMONS } from './actionTypes'
import axios from 'axios'

export function getPokemons(){
    return async dispatch => {
        const pokemons = await axios.get('/pokemon?order1=id&&order2=asc')
        return dispatch({type: GET_POKEMONS, payload: pokemons.data})
    }
}

export function getDetails({pokeId}){
    return async dispatch => {
        const details = await axios.get(`/pokemon/${pokeId}`)
        return dispatch({type: GET_DETAILS, payload: details.data})
    }
}