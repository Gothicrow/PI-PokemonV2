import { GET_POKEMONS } from './actionTypes'
import axios from 'axios'

export function getPokemons(){
    return async dispatch => {
        const pokemons = await axios.get('/pokemon')
        return dispatch({type: GET_POKEMONS, payload: pokemons.data})
    }
}