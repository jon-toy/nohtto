import axios from 'axios';
import { API_URL, PAD } from '../constants';
import {
    GET_NOTES,
    CREATE_NOTE,
    EDIT_NOTE,
    DELETE_NOTE
} from './actionTypes'

export function getNotes() {
    return dispatch => {    
        return Promise.all([axios.get(`${API_URL}/pads/${PAD}/notes`)]).then(([response]) => {
            dispatch({
                type: GET_NOTES,
                payload: response.data
            });
        });
    };
}

export function createNote(newNote) {
    return dispatch => {    
        return Promise.all([axios.post(`${API_URL}/pads/${PAD}/notes`, newNote)]).then(([response]) => {
            dispatch({
                type: CREATE_NOTE,
                payload: response.data
            });
        });
    };
}

export function editNote(newNote) {
    return dispatch => {    
        return Promise.all([axios.put(`${API_URL}/pads/${PAD}/notes/${newNote._id}`, newNote)]).then(([response]) => {
            dispatch({
                type: EDIT_NOTE,
                payload: response.data
            });
        });
    };
}

export function deleteNote(key, callback) {
    return dispatch => {    
        return Promise.all([axios.delete(`${API_URL}/pads/${PAD}/notes/${key}`)]).then(([response]) => {
            dispatch({
                type: DELETE_NOTE,
                payload: response.data
            });
        });
    };
}