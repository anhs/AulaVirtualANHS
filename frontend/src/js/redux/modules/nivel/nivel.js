import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "nivel",
    "nivel",
    "NivelForm",
    "/nivel",
);

export default handleActions(reducers, initialState);
