import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import { api } from "../../../utility/api";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form'; 
import { push } from "react-router-redux";

// ------------------------------------
// Constants
// ------------------------------------

const PROFESION_SET_ITEM = "PROFESION_SET_ITEM";

const baseReducer = createReducer(
    "profesion", //Identificador (Para usuarlo dentro del estado)
    "profesion", //endpoint (a donde se realizarán las peticiones )
    "ProfesionForm", //Formulario
    "/profesions",
);

/*
export const { reducers, initialState, actions } = createReducer(
    "profesion", //Identificador (Para usuarlo dentro del estado)
    "profesion", //endpoint (a donde se realizarán las peticiones )
    "ProfesionForm", //Formulario
    "/profesions",
);
*/

export const createProfesion = (formData, adjuntos) => (dispatch, getStore) => {
    //const formData = getStore().form.ProfesionForm.values;
    
    console.log("formData: ", formData);
    console.log("Adjuntos: ", adjuntos);
    api.postAttachments("profesion", formData, adjuntos).then((response)=>{        
        console.log("response");
        dispatch(push("/profesions"));
        NotificationManager.success('Registro creado', 'Éxito', 3000);
    }).catch((error)=>{
        console.error("error: ", error);
    })
} 

export const updateProfesion = (formData, adjuntos) => (dispatch, getStore) => {    
    api.putAttachments(`profesion/${formData.id}`, formData, adjuntos).then((response)=>{        
        console.log("response");
        dispatch(push("/profesions"));
        NotificationManager.success('Registro creado', 'Éxito', 3000);
    }).catch((error)=>{
        console.error("error: ", error);
    })
} 
   
const getProfesion = id => (dispatch, getStore) => {    
    api.get(`profesion/${id}`).then((response) => {
        console.log("getProfesion response: ", response);        
        dispatch({type: PROFESION_SET_ITEM, item: response});
        dispatch(initializeForm("ProfesionForm", response));

    }).catch(() => {
    }).finally(() => {
        
    });
};

const clearItem = () => (dispatch) => {
    dispatch({type: PROFESION_SET_ITEM, item: null});
}

export const actions = {
    ...baseReducer.actions,
    createProfesion,
    updateProfesion,
    getProfesion,
    clearItem,
}

export const reducers = {
    ...baseReducer.reducers,
    [PROFESION_SET_ITEM]: (state, { item }) => {
        return {
            ...state,
            item,
        };
    },    
}

export default handleActions(reducers, baseReducer.initialState);
