import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Ciclo_Escolar/ciclo_escolar';
import Ciclo_escolarCreate from './cicloescolarcreate';


const ms2p = (state) => {
    return {
        ...state.ciclo_escolar,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Ciclo_escolarCreate);