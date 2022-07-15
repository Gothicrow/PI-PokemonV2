import { GET_POKEMONS } from "../actions/actionTypes"

const initialState = {
    pokemons: []
}

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case GET_POKEMONS: return {
            ...state,
            pokemons: payload
        }
        default: return state
    }
}