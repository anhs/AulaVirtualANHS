import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderField, renderFilePicker,renderNumber,renderDatePicker,renderTimePicker } from "../Utils/renderField/renderField";

class Formulario extends Component {
    render() {
        const { handleSubmit, crear, setAdjunto, item, obteneridasignacion } = this.props;
        console.log("Crear: ", obteneridasignacion);
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Tarea de Clase';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
        console.log("erro this.props", this.props);
        return (
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <Field
                    name="nombre"
                    component={renderField}
                    type="text"
                    disabled={disable}

                />
                <label>Descripción</label>
                <Field
                    name="descripcion"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
                <br></br>
                <label>Fecha de entrega</label>
                <Field
                    name="fecha_de_entrega"
                    component={renderDatePicker}
                    disabled={disable}
                    type= "date"
                />
                <br></br>
                <br></br>
                
                <label>Hora de Entrega</label>
                <div className="w-25">
                    <Field
                        name="hora_de_entrega"
                        component={renderField}
                        type="time"
                        max="22:30:00"
                        min="00:00:00"
                        step="1"
                        disabled={disable}
                    />
                </div>
                <br></br>
                <label>Nota </label>
                <Field
                    name="nota"
                    component={renderNumber}
                    disabled={disable}
                />
                <br></br>
                <br></br>
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
                        href={`/#/tarea/${obteneridasignacion}/`}
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
    form: 'TareaForm' // a unique identifier for this form
})(Formulario)