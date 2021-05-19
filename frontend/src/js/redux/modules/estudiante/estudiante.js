import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA_ESTUDIANTE = "SET_DATA_ESTUDIANTE";
const SET_PAGE_ESTUDIANTE = "SET_PAGE_ESTUDIANTE";
const SET_LOADER_ESTUDIANTE = "SET_LOADER_ESTUDIANTE";
const SET_GUARDAR_ESTUDIANTE ="SET_GUARDAR_ESTUDIANTE";

const endpoint = "estudiante";
const resourceList ="/estudiante"


//dispatch, es la función que voy a utilizar para cambiar el valor de una variable de mi estado.
//getStore me devuelve todo el estado

export const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore().estudiante;

    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch({type: SET_LOADER_ESTUDIANTE, loader: true});

    api.get(endpoint, params).then((response) => {
        dispatch({type: SET_DATA_ESTUDIANTE, data: response});
        dispatch({type: SET_PAGE_ESTUDIANTE, page: page});        
    }).catch(() => {
    }).finally(() => {
        dispatch({type: SET_LOADER_ESTUDIANTE, loader: false});
    });    
}
export const leer = id => (dispatch) => {
    api.get(`${endpoint}/${id}`).then((response) => {
    response.name=response.profile.name;
    response.last_name=response.profile.last_name;
    response.username = response.profile.user.username;
    response.email = response.profile.user.email;
    response.password = response.profile.user.password;
    dispatch({type: SET_GUARDAR_ESTUDIANTE, data: response}); 
    dispatch(initializeForm('EstudianteForm',response));
    console.log('Datos obtenidos',response)

    }).catch(() => {
    }).finally(() => {
    });
};
export const crear = (data) => (dispatch, getStore) => {    
    api.post(endpoint, data).then(response => {        
        NotificationManager.success('Estudiante creado', 'Éxito', 3000);
        dispatch(push(resourceList));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {        
    });
}
export const editar = (id,data) => (dispatch) => {
    console.log(" al actualizar",data);
    api.put(`${endpoint}/${id}`, data).then(response => {

        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
    });
};

export const actions = {
    listar,
    crear,
    leer,
    editar,
}

export const reducers = {
    [SET_GUARDAR_ESTUDIANTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_DATA_ESTUDIANTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PAGE_ESTUDIANTE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [SET_LOADER_ESTUDIANTE]: (state, {loader}) => {
        return {
            ...state,
            loader,
        }
    }    
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