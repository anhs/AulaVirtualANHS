import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderField, renderFilePicker } from "../Utils/renderField/renderField";

class Formulario extends Component {
    render() {
        const { handleSubmit, crear, setAdjunto, item, obteneridasignacion} = this.props;
        console.log("Crear: ", obteneridasignacion);
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Tarea';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
        console.log("erro this.props", this.props);
        return (
            <form onSubmit={handleSubmit}>
                {titulo}
                <br></br>
                <label>Texto del Trabajo</label>
                
                <Field
                    name="text"
                    component={renderField}
                    type="text"
                    disabled={disable}

                />
                <label>Adjunto</label>
                <Field
                    photo={item ? item.archivo : null}
                    name="archivo"
                    component={renderFilePicker}
                    setFile={setAdjunto}
                />

                {item &&
                    <a href={item.archivo} target="_blank">Ver / Descargar</a>
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
                        href={`/#/tareaestudiante/${obteneridasignacion}/`}
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
    form: 'TareaEstudianteForm' // a unique identifier for this form
})(Formulario)