import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { FormName, initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA_GRADO = "SET_DATA_GRADO";
const SET_PAGE_GRADO = "SET_PAGE_GRADO";
const SET_LOADER_GRADO = "SET_LOADER_GRADO";
const SET_GUARDAR_GRADO ="SET_GUARDAR_GRADO";

const endpoint = "grado";
const formname = "GradoForm";
const resourceList ="/grado";


//dispatch, es la función que voy a utilizar para cambiar el valor de una variable de mi estado.
//getStore me devuelve todo el estado

export const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore().grado;

    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    dispatch({type: SET_LOADER_GRADO, loader: true});

    api.get(endpoint, params).then((response) => {
        dispatch({type: SET_DATA_GRADO, data: response});
        dispatch({type: SET_PAGE_GRADO, page: page});        
    }).catch(() => {
    }).finally(() => {
        dispatch({type: SET_LOADER_GRADO, loader: false});
    });    
}
export const leer = id => (dispatch) => {
    api.get(`${endpoint}/${id}`).then((response) => {
        console.log('Datos obtenidos',response);
        response.nivel = {value:response.nivel.id, label:response.nivel.nombre} ;
        dispatch({type: SET_GUARDAR_GRADO, data: response}); 
        dispatch(initializeForm(formname,response));

    }).catch(() => {
    }).finally(() => {
    });
};
export const crear = (data) => (dispatch, getStore) => {
    console.log("hdhdh",data);
    const nivel_id = data.nivel.value;
    data.nivel = nivel_id;    
    api.post(endpoint, data).then(response => {        
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push(resourceList));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {        
    });
}
export const obtenerNiveles = (search) => (dispatch) => {    
    return api.get("nivel", {search}).then(response => {
        console.log("ressss ",response);
        if(response){
            const niveles = [];
            response.results.forEach(nivel => {
                niveles.push({
                    value: nivel.id,
                    label: nivel.nombre
                })
            });
            return niveles;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return [];
    })
}
export const editar = (id,data) => (dispatch) => {
    const nivel_id = data.nivel.value;
    data.nivel = nivel_id;
    api.put(`${endpoint}/${id}`, data).then(response => {

        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        if (!!resourceList)
            dispatch(push(resourceList));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {
    });
};
export const eliminar = id => (dispatch) => {
    api.eliminar(`${endpoint}/${id}`).then(() => {
        dispatch(listar());
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
    });
};

export const actions = {
    listar,
    obtenerNiveles,
    crear,
    leer,
    editar,
    eliminar,
}

export const reducers = {
    [SET_GUARDAR_GRADO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_DATA_GRADO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PAGE_GRADO]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [SET_LOADER_GRADO]: (state, {loader}) => {
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