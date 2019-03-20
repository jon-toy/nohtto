import axios from 'axios';
import { API_URL } from '../constants';
import {
    GET_PADS,
    GET_NOTES,
    CREATE_NOTE,
    EDIT_NOTE,
    DELETE_NOTE
} from './actionTypes'

export function getPads() {
    return dispatch => {    
        return Promise.all([axios.get(`${API_URL}/pads/`)]).then(([response]) => {
            dispatch({
                type: GET_PADS,
                payload: response.data
            });
        });
    };
}

export function getNotes(padId) {
    return dispatch => {    
        return Promise.all([axios.get(`${API_URL}/pads/${padId}/notes`)]).then(([response]) => {
            dispatch({
                type: GET_NOTES,
                payload: response.data
            });
        });
    };
}

export function createNote(newNote, padId) {
    return dispatch => {    
        return Promise.all([axios.post(`${API_URL}/pads/${padId}/notes`, newNote)]).then(([response]) => {
            dispatch({
                type: CREATE_NOTE,
                payload: response.data
            });
        });
    };
}

export function editNote(newNote, padId) {
    return dispatch => {    
        return Promise.all([axios.put(`${API_URL}/pads/${padId}/notes/${newNote._id}`, newNote)]).then(([response]) => {
            dispatch({
                type: EDIT_NOTE,
                payload: response.data
            });
        });
    };
}

export function deleteNote(key, padId) {
    return dispatch => {    
        return Promise.all([axios.delete(`${API_URL}/pads/${padId}/notes/${key}`)]).then(([response]) => {
            dispatch({
                type: DELETE_NOTE,
                payload: response.data
            });
        });
    };
}