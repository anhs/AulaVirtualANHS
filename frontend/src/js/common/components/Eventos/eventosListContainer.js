import { connect } from 'react-redux';
import {actions} from '../../../redux/modules/Eventos/eventos';
import EventosList from './eventosList';


const ms2p = (state) => {
    return {
        ...state.eventos,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(EventosList);