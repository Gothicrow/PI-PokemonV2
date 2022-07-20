import { CLEAR_DETAILS, GET_DETAILS, GET_POKEMONS } from "../actions/actionTypes"

const initialState = {
    pokemons: [],
    details: {}
}

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case GET_POKEMONS: return {
            ...state,
            pokemons: payload
        }
        case GET_DETAILS: return {
            ...state,
            details: payload
        }
        case CLEAR_DETAILS: return {
            ...state,
            details: {}
        }
        default: return state
    }
}