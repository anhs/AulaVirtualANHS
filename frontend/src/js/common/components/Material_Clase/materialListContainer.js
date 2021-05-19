import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Materia_Clase/material_de_clase';
import Material_claseList from './materialList';


const ms2p = (state) => {
    return {
        ...state.material_clase,
        ...state.login,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Material_claseList);