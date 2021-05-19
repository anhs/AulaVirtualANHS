import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_MOSTRAR_SALUDO = "SET_MOSTRAR_SALUDO";

//Acción pura (Es una intención de cambiar un dato del estado)

const setMostrarSaludo = mostrar_saludo => ({
    type: SET_MOSTRAR_SALUDO,
    mostrar_saludo,
});

//Acción (Una función)
export const mostrarSaludo = (valor) => (dispatch, getStore) => {
    dispatch(setMostrarSaludo(valor));
}

export const actions = {
    mostrarSaludo,
}

//Función Reductora (Es la que reestructurar, cambiar, el estado)
export const reducers = {
    [SET_MOSTRAR_SALUDO]: (state, { mostrar_saludo }) => {
        return {
            ...state,
            mostrar_saludo,
        };
    },    
}

export const initialState = {
    mostrar_saludo: false,  
};

export default handleActions(reducers, initialState);