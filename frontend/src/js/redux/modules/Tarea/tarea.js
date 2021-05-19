import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import { NotificationManager } from "react-notifications";

const SET_DATA_TAREA = "SET_DATA_TAREA";
const SET_PAGE_TAREA = "SET_PAGE_TAREA";
const TAREA_SET_ITEM = "TAREA_SET_ITEM";

const endpoint = "tareadocente";
const formname = "TareaForm";
var capturadeid = 0;


export const listar = (asignacion = id) => (dispatch, getStore) => {
    const params = { asignacion };
    capturadeid=asignacion;
    api.get("tareadocente/tareas_asignadas", params).then((response) => {
        dispatch({type: SET_DATA_TAREA, data: response});
        dispatch({type: SET_PAGE_TAREA, page: page});
        dispatch(setData(response));
        dispatch(setPage(asignacion));
    }).catch(() => {
    }).finally(() => {
    });
};

export const createProfesion = (formData, archivo) => (dispatch, getStore) => {
    //const formData = getStore().form.ProfesionForm.values;

    var dia=formData.fecha_de_entrega.getDate();
    var mes=formData.fecha_de_entrega.getMonth()+1;
    var año=formData.fecha_de_entrega.getFullYear();
    var fecha =(año+'-'+mes+'-'+dia);
    //console.log("jaja",fecha);
    formData.fecha_de_entrega= fecha;

    api.postAttachments(endpoint, formData, archivo).then((response)=>{        
        //console.log("response",formData);
        dispatch(push(`/tarea/${formData.asignacion}/`));
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
        dispatch({type: TAREA_SET_ITEM, item: response});
        dispatch(initializeForm(formname, response));

    }).catch(() => {
    }).finally(() => {
        
    });
};

const clearItem = () => (dispatch) => {
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
    listar,
    createProfesion,
    updateProfesion,
    getProfesion,
    clearItem,
    eliminar,
}

export const reducers = {
    [SET_DATA_TAREA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PAGE_TAREA]: (state, { page }) => {
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
    item: {},
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);