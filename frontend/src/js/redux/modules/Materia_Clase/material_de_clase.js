import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";

const SET_DATA_MATERIAL = "SET_DATA_MATERIAL";
const SET_PAGE_MATERIAL = "SET_PAGE_MATERIAL";
const SET_LOADER_MATERIAL = "SET_LOADER_MATERIAL";
const SET_GUARDAR_MATERIAL ="SET_GUARDAR_MATERIAL";
const PROFESION_SET_ITEM = "PROFESION_SET_ITEM";

const endpoint = "material_de_clase";
const formname = "Material_claseForm";
var capturadeid = 0;


export const listar = (asignacion = id) => (dispatch, getStore) => {
    const params = { asignacion };
    capturadeid=asignacion;
    console.log("list de asig",asignacion);
    api.get("material_de_clase/asignacion", params).then((response) => {
        dispatch({type: SET_GUARDAR_MATERIAL, data: response});
        dispatch({type: SET_PAGE_MATERIAL, page: page});
        dispatch(setData(response));
        dispatch(setPage(asignacion));
    }).catch(() => {
    }).finally(() => {
    });
};

export const createProfesion = (formData, archivo) => (dispatch, getStore) => {
    //const formData = getStore().form.ProfesionForm.values;
    //console.log("formData: ", formData);
    //console.log("Adjuntos: ", archivo);
    api.postAttachments(endpoint, formData, archivo).then((response)=>{        
        //console.log("response",formData);
        dispatch(push(`/material_clase/${formData.asignacion}/`));
        NotificationManager.success('Registro creado', 'Éxito', 3000);
    }).catch((error)=>{
        console.error("error: ", error);
        NotificationManager.error(
            'Ocurio un error',
            'Error',
            0
        );
    })
} 

export const updateProfesion = (formData, archivo) => (dispatch, getStore) => {  
    console.log("response", formData);
    console.log("Adjuntos: ", archivo);
    const idasignacion = formData.asignacion.id;
    const archi = formData.file;
    formData.asignacion=idasignacion;
    archivo.file=archi;
    api.putAttachments(`${endpoint}/${formData.id}`, formData, archivo).then((response)=>{        
        dispatch(push(`/material_clase/${formData.asignacion}/`));
        NotificationManager.success('Registro creado', 'Éxito', 3000);
    }).catch((error)=>{
        console.error("error: ", error);
        NotificationManager.error(
            'Ocurio un error',
            'Error',
            0
        );
    })
} 
   
export const getProfesion = id => (dispatch, getStore) => {    
    api.get(`${endpoint}/${id}`).then((response) => {
        console.log("getProfesion response: ", response);        
        dispatch({type: PROFESION_SET_ITEM, item: response});
        dispatch(initializeForm(formname, response));

    }).catch(() => {
    }).finally(() => {
        
    });
};

const clearItem = () => (dispatch) => {
    dispatch({type: PROFESION_SET_ITEM, item: null});
}
export const eliminar = id => (dispatch) => {
    api.eliminar(`${endpoint}/${id}`).then(() => {
        dispatch(listar(capturadeid));
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
    });
};

export const actions = {
    listar,
    createProfesion,
    updateProfesion,
    getProfesion,
    clearItem,
    eliminar,
}

export const reducers = {
    [SET_GUARDAR_MATERIAL]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PAGE_MATERIAL]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [SET_LOADER_MATERIAL]: (state, {loader}) => {
        return {
            ...state,
            loader,
        }
    },   
    [PROFESION_SET_ITEM]: (state, { item }) => {
        return {
            ...state,
            item,
        };
    },    
}

export const initialState = {
    loader: false,
    data: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);