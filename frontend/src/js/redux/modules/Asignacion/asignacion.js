import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { FormName, initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA_GRADO = "SET_DATA_GRADO";
const SET_PAGE_GRADO = "SET_PAGE_GRADO";
const SET_LOADER_GRADO = "SET_LOADER_GRADO";
const SET_GUARDAR_GRADO ="SET_GUARDAR_GRADO";

const endpoint = "asignacion";
const formname = "AsignacionForm";
const resourceList ="/asignacion";


//dispatch, es la función que voy a utilizar para cambiar el valor de una variable de mi estado.
//getStore me devuelve todo el estado

export const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore().asignacion;

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
        response.ciclo_escolar = {value:response.ciclo_escolar.id, label:response.ciclo_escolar.anio} ;
        response.curso = {value:response.curso.id, label:response.curso.nombre} ;
        response.grado = {value:response.grado.id, label:response.grado.nombre} ;
        response.profesor = {value:response.profesor.id, label:response.profesor.profile.name + " "+ response.profesor.profile.last_name} ;
        response.seccion = {value:response.seccion.id, label:response.seccion.nombre} ;
        dispatch({type: SET_GUARDAR_GRADO, data: response}); 
        dispatch(initializeForm(formname,response));

    }).catch(() => {
    }).finally(() => {
    });
};
export const crear = (data) => (dispatch, getStore) => {
    console.log("registro de asig",data);
    const ciclo_id = data.ciclo_escolar.value;
    const curso_id = data.curso.value;
    const grado_id = data.grado.value;
    const profesor_id = data.profesor.value;
    const seccion_id = data.seccion.value;

    data.ciclo_escolar = ciclo_id;
    data.curso=curso_id;
    data.grado=grado_id;
    data.profesor=profesor_id;
    data.seccion=seccion_id;    
    api.post(endpoint, data).then(response => {        
        NotificationManager.success('Registro creado', 'Éxito', 3000);
        dispatch(push(resourceList));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error('Error en la creación', 'ERROR');
    }).finally(() => {        
    });
}

export const clearItem = () => (dispatch) => {
    dispatch({type: PROFESION_SET_ITEM, item: null});
}
export const obtenerCiclo_escolar = (search) => (dispatch) => {    
    return api.get("ciclo_escolar", {search}).then(response => {
        if(response){
            const DatosObtenidos = [];
            response.results.forEach(ciclo_escolar => {
                DatosObtenidos.push({
                    value: ciclo_escolar.id,
                    label: ciclo_escolar.anio
                })
            });
            return DatosObtenidos;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return [];
    })
}
export const obtenerGrado = (search) => (dispatch) => {    
    return api.get("grado", {search}).then(response => {
        if(response){
            const grados = [];
            response.results.forEach(grado => {
                grados.push({
                    value: grado.id,
                    label: grado.nombre
                })
            });
            return grados;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return [];
    })
}
export const obtenerSeccion = (search) => (dispatch) => {    
    return api.get("seccion", {search}).then(response => {
        if(response){
            const DatosObtenidos = [];
            response.results.forEach(seccion => {
                DatosObtenidos.push({
                    value: seccion.id,
                    label: seccion.nombre
                })
            });
            return DatosObtenidos;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return [];
    })
}
export const obtenercurso = (search) => (dispatch) => {    
    return api.get("curso", {search}).then(response => {
        if(response){
            const DatosObtenidos = [];
            response.results.forEach(curso=> {
                DatosObtenidos.push({
                    value: curso.id,
                    label: curso.nombre
                })
            });
            return DatosObtenidos;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return [];
    })
}
export const obtenerprofesor = (search) => (dispatch) => {    
    return api.get("profesor", {search}).then(response => {
        if(response){
            const DatosObtenidos = [];
            response.results.forEach(profesor => {
                DatosObtenidos.push({
                    value: profesor.id,
                    label: profesor.profile.name +" "+ profesor.profile.last_name
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
    const ciclo_id = data.ciclo_escolar.value;
    const curso_id = data.curso.value;
    const grado_id = data.grado.value;
    const profesor_id = data.profesor.value;
    const seccion_id = data.seccion.value;

    data.ciclo_escolar = ciclo_id;
    data.curso=curso_id;
    data.grado=grado_id;
    data.profesor=profesor_id;
    data.seccion=seccion_id;    

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


export const Cursos_Docente = () => (dispatch) => {

    api.get('/asignacion/Cursos_asignados_docentes').then((response)=>{
        console.log('res: ',response);
        dispatch({ type: SET_DATA_GRADO,  data :response });
        //console.log("mostrar datos profesiones: ",data)
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
    obtenerCiclo_escolar,
    obtenerGrado,
    obtenerSeccion,
    obtenercurso,
    obtenerprofesor,
    crear,
    leer,
    editar,
    eliminar,
    Cursos_Docente,
    //clearItem,
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