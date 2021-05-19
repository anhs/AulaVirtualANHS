import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { element } from 'prop-types';

const SET_DATA_TAREA = "SET_DATA_TAREA";
const SET_PAGE_GENERAL = "SET_PAGE_GENERAL";
const TAREA_SET_ITEM = "TAREA_SET_ITEM";
const SET_DATA_GENERAL = "SET_DATA_GENERAL";
const SET_DATA_TAREAS_ENVIADAS = "SET_DATA_TAREAS_ENVIADAS";

const endpoint = "tareaestudiante";
const endpoint1 = "tarea";
const formname = "TareaForm";
var capturadeid = 0;
var idestudiante = 0;

export const listar =() =>(dispatch,getStore) => {
    const resource = getStore().tareaestudiante;
        //params.ordering = resource.ordering;
        //params.search = resource.search;
        api.get(endpoint).then((response) => {
            dispatch({type: SET_DATA_TAREA, data: response});
            dispatch({type: SET_PAGE_GENERAL, page: page});
            dispatch(setData(response));
            dispatch(setPage(page));
        }).catch(() => {
        }).finally(() => {
        });

}



export const createTarea = (formData, archivo, id) => (dispatch, getStore) => {
    //const formData = getStore().form.ProfesionForm.values;
    console.log("form",formData)
    formData.estudiante = idestudiante;
    api.postAttachments(endpoint, formData, archivo).then((response)=>{        
        //console.log("response",formData);
        dispatch(push(`/tareaestudiante/${id}/`));
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
export const listartareasenviadas = (asignacion = id) => (dispatch, getStore) => {
    const params = { asignacion };
    capturadeid=asignacion;
    api.get("tareaestudiante/tareas_enviadasporelestu", params).then((response) => {
        dispatch({type: SET_DATA_TAREAS_ENVIADAS, data2:response});
    }).catch((error) => {
        console.log("error  :", error);
    }).finally(() => {
    });
};


export const Id_Estudiante = () => (dispatch) => {

    api.get('/asignacion_estudiante/idestu').then((response)=>{
        //console.log('res: ',response);
        console.log('solucion', response.id);
        idestudiante=response.id;
        dispatch({ type: SET_DATA_GENERAL, data1:response });
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurio un error al mostrar los cursos',
            'Error',
            0
        );
    }).finally(() => {
    }); 
};

const limpiarItem = () => (dispatch) => {
    dispatch({type: TAREA_SET_ITEM, item: null});
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
    createTarea,
    limpiarItem,
    eliminar,
    Id_Estudiante,
    listar,
    listartareasenviadas,
}

export const reducers = {
    [SET_DATA_TAREA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_DATA_TAREAS_ENVIADAS]: (state, { data2 }) => {
        return {
            ...state,
            data2,
        };
    },
    [SET_DATA_GENERAL]: (state, { data1 }) => {
        return {
            ...state,
            data1,
        };
    },
    [SET_PAGE_GENERAL]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [TAREA_SET_ITEM]: (state, { item }) => {
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
    data1: {
        results: [],
        count: 0,
    },
    data2: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);