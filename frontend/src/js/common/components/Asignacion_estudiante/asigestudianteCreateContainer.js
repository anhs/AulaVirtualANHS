import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Asigancion_Estudiante/Asignacion_estudiante';
import Asignacion_EsCreate from './asigestudianteCreate';


const ms2p = (state) => {
    return {
        ...state.asignacion_estudiante,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Asignacion_EsCreate);