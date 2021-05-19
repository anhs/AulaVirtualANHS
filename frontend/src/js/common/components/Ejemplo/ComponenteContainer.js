import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/ejemplo/ejemplo';
import ComponentePadre from './ComponentePadre';


const ms2p = (state) => {
    return {
        ...state.ejemplo,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ComponentePadre);