import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import profesion from "./modules/profesion/profesion";
import profesor from "./modules/profesor/profesor";
import ejemplo from "./modules/ejemplo/ejemplo";
import estudiante from "./modules/estudiante/estudiante";
import nivel from "./modules/nivel/nivel";
import seccion from "./modules/Seccion/seccion";
import curso from "./modules/Curso/curso";
import ciclo_escolar from "./modules/Ciclo_Escolar/ciclo_escolar";
import grado from "./modules/Grado/grado";
import asignacion from "./modules/Asignacion/asignacion";
import asignacion_estudiante from "./modules/Asigancion_Estudiante/Asignacion_estudiante";
import eventos from "./modules/Eventos/eventos";
import material_clase from "./modules/Materia_Clase/material_de_clase";
import tarea from "./modules/Tarea/tarea";
import tareaestudiante from "./modules/Tarea_estudiante/tareaestudiante";

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    profesion,
    profesor,
    ejemplo,
    grado,
    asignacion_estudiante,
    asignacion,
    routing,
    notificaciones,
    estudiante,
    nivel,
    seccion,
    curso,
    ciclo_escolar,
    eventos,
    material_clase,
    tarea,
    tareaestudiante,
});
