import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderField, renderFilePicker,AsyncSelectField } from "../Utils/renderField/renderField";

class Formulario extends Component {
    render() {
        const {
            handleSubmit, 
            crear, 
            obtenerestudiante,
            obteneridasignacion
        } = this.props;

        console.log("Crear: ", this.props);
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Asignacion de estudiante';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
        
        return (
            <form onSubmit={handleSubmit}>
                
                <label>Seleccione Estudiante</label>  
                <Field
                    name="estudiante"
                    component={AsyncSelectField}
                    loadOptions={obtenerestudiante}
                    disabled={disable}
                    isClearable
                />
                
                <br /><br />

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        className='btn btn-secondary btn-sm mr-2'
                        href={`/#/asignacion_estudiante/${obteneridasignacion}/`}
                        
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
    form: 'AsigEstudianteForm' // a unique identifier for this form
})(Formulario)