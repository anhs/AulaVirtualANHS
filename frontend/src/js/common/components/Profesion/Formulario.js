import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderField, renderFilePicker } from "../Utils/renderField/renderField";

class Formulario extends Component {
    render() {
        const { handleSubmit, crear, setAdjunto, item } = this.props;
        console.log("Crear: ", crear);
        const ver = window.location.href.includes("ver");
        
        return (
            <form onSubmit={handleSubmit}>
                <label>Nombre de la profesión</label>
                <Field
                    name="profesion_name"
                    component={renderField}
                    type="text"
                />

                <label>Adjunto</label>
                <Field
                    photo={item ? item.adjunto : null}
                    name="adjunto"
                    component={renderFilePicker}
                    setFile={setAdjunto}
                />

                {item &&
                    <a href={item.adjunto} target="_blank">Ver / Descargar</a>
                }

                {/*
                <Field 
                    photo={me.profile && me.profile.avatar ? me.profile.avatar : null} 
                    setFile={setAvatar} 
                    name="avatar" 
                    component={renderFilePicker} 
                /> */}

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        className='btn btn-secondary btn-sm mr-2'
                        href="/#/profesions"
                    >
                        Cancelar
                    </a>

                    {!ver &&
                        <button
                            className='btn btn-primary btn-sm'
                        >
                            {crear ? "Registrar" : "Actualizar"}
                        </button>
                    }
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'ProfesionForm' // a unique identifier for this form
})(Formulario)