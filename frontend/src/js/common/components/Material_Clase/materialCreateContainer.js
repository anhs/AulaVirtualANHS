import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Materia_Clase/material_de_clase';
import Material_claseCreate from './materialCreate';


const ms2p = (state) => {
    return {
        ...state.material_clase,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Material_claseCreate);