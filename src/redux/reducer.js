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
            const pads = action.payload;
            return {...state, pads}
        case GET_NOTES: 
            let notes = action.payload;
            const currentPad = action.pad;
            return {...state, notes, currentPad};
        case CREATE_NOTE:
            return {...state, notes: [...state.notes, action.payload]};
        case EDIT_NOTE:
            return state;
        case DELETE_NOTE:
            const id = action.payload._id;
            let newNotes = [...state.notes.filter(note => note._id !== id)];
            return {...state, notes: newNotes};
        default:
            return state;
    }
}