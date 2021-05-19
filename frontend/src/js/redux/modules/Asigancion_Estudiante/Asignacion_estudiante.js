import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { FormName, initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA_GENERAL = "SET_DATA_GENERAL";
const SET_PAGE_GENERAL = "SET_PAGE_GENERAL";
const SET_LOADER_GENERAL = "SET_LOADER_GENERAL";
const SET_GUARDAR_GENERAL ="SET_GUARDAR_GENERAL";

const endpoint = "asignacion_estudiante";
const formname = "AsigEstudianteForm";
const resourceList ="/asignacion_estudiante";
var capturadeid = 0;


//dispatch, es la función que voy a utilizar para cambiar el valor de una variable de mi estado.
//getStore me devuelve todo el estado

export const listar = (asignacion = id) => (dispatch, getStore) => {
    //const resource = getStore().asignacion_estudiante/asignacionestu;
    const params = { asignacion };
    capturadeid=asignacion;

    api.get("asignacion_estudiante/asignacionestu", params).then((response) => {
        dispatch({type: SET_DATA_GENERAL, data: response});
        dispatch({type: SET_PAGE_GENERAL, page: page});
        dispatch(setData(response));
        dispatch(setPage(asignacion));        
    }).catch(() => {
    }).finally(() => {
    });    
}
export const leer = id => (dispatch) => {
    api.get(`${endpoint}/${id}`).then((response) => {
        console.log('Datos obtenidos',response);
        response.asignacion = {value:response.asignacion.id, label:response.asignacion.grado.nombre+ " seccion "+ response.asignacion.seccion.nombre
        +" "+response.asignacion.curso.nombre} ;
        response.estudiante = {value:response.estudiante.id, label:response.estudiante.profile.name + " "+ response.estudiante.profile.last_name} ;
        dispatch({type: SET_GUARDAR_GENERAL, data: response}); 
        dispatch(initializeForm(formname,response));

    }).catch(() => {
    }).finally(() => {
    });
};
export const crear = (data) => (dispatch, getStore) => {
    //console.log("registro de asig",data);
    const estudiante_id = data.estudiante.value;
    data.estudiante=estudiante_id;    
    api.post(endpoint, data).then(response => {        
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push(`/asignacion_estudiante/${data.asignacion}/`));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {        
    });
}


export const obtenerestudiante = (search) => (dispatch) => {    
    return api.get("estudiante", {search}).then(response => {
        if(response){
            const DatosObtenidos = [];
            response.results.forEach(estudiante => {
                DatosObtenidos.push({
                    value: estudiante.id,
                    label: estudiante.profile.name +" "+ estudiante.profile.last_name
                })
            });
            return DatosObtenidos;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return [];
    })
}
export const editar = (id,data) => (dispatch) => {
    const estudiante_id = data.estudiante.value;
    data.estudiante=estudiante_id;    
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
        dispatch(listar(capturadeid));
        NotificationManager.success('Registro eliminado', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.success('Error en la transacción', 'Éxito', 3000);
    }).finally(() => {
    });
};
export const Cursos_Estudiante = () => (dispatch) => {

    api.get('/asignacion_estudiante/Cursos_asignados_estudiante').then((response)=>{
        //console.log('res: ',response);
        dispatch({ type: SET_DATA_GENERAL,  data :response });
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurio un error al mostrar los cursos',
            'Error',
            0
        );
    }).finally(() => {
    });   
}
export const actions = {
    listar,
    crear,
    leer,
    editar,
    obtenerestudiante,
    eliminar,
    Cursos_Estudiante,
}

export const reducers = {
    [SET_GUARDAR_GENERAL]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_DATA_GENERAL]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PAGE_GENERAL]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [SET_LOADER_GENERAL]: (state, {loader}) => {
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