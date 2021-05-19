import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "ciclo_escolar",
    "ciclo_escolar",
    "AnioForm",
    "/ciclo_escolar",
);

export default handleActions(reducers, initialState);