import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Tarea_estudiante/tareaestudiante';
import TareaEstuList from './tareaestuList';


const ms2p = (state) => {
    return {
        ...state.tareaestudiante,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaEstuList);