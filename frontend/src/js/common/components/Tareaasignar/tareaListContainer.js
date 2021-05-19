import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Tarea/tarea';
import TareaList from './tareaList';


const ms2p = (state) => {
    return {
        ...state.tarea,
        ...state.login,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaList);