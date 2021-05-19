import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Asignacion/asignacion';
import AsignacionCreate from './asignacionCreate';


const ms2p = (state) => {
    return {
        ...state.asignacion,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(AsignacionCreate);