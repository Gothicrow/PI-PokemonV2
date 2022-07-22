import { CLEAR_DETAILS, GET_DETAILS, GET_POKEMONS, GET_TYPES, ORDER1, ORDER2, SEARCH, TIPO } from "../actions/actionTypes"

const initialState = {
    pokemons: [],
    details: {},
    types: [],
    order1: 'id',
    order2: 'asc',
    search: '',
    tipo: ''
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
        case GET_TYPES: return{
            ...state,
            types: payload
        }
        case ORDER1: return {
            ...state,
            order1: payload
        }
        case ORDER2: return {
            ...state,
            order2: payload
        }
        case SEARCH: return{
            ...state,
            search: payload
        }
        case TIPO: return{
            ...state,
            tipo: payload
        }
        default: return state
    }
}