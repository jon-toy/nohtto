import {
    GET_PADS,
    GET_NOTES,
    CREATE_NOTE,
    EDIT_NOTE,
    DELETE_NOTE
} from './actionTypes'

export default function Reducer(state = {}, action = {}) {
    switch (action.type) {
        case GET_PADS:
            let pads = action.payload;
            return {...state, pads}
        case GET_NOTES: 
            let notes = action.payload;
            return {...state, notes};
        case CREATE_NOTE:
            return state;
        case EDIT_NOTE:
            return state;
        case DELETE_NOTE:
            return state;
        default:
            return state;
    }
}