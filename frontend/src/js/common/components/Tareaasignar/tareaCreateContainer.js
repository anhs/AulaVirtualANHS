import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Tarea/tarea';
import TareaCreate from './tareaCreate';


const ms2p = (state) => {
    return {
        ...state.tarea,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaCreate);