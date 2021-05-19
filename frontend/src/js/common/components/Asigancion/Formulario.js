import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { renderField, renderFilePicker,AsyncSelectField } from "../Utils/renderField/renderField";

class Formulario extends Component {
    render() {
        const {
            handleSubmit, 
            crear, 
            obtenerCiclo_escolar,
            obtenerGrado,
            obtenerprofesor,
            obtenerSeccion,
            obtenercurso

        } = this.props;

        console.log("Crear: ", this.props);
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Asignacion';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
        
        return (
            <form onSubmit={handleSubmit}>
                <label>Seleccione Ciclo Escolar</label>  
                 <Field
                    name="ciclo_escolar"
                    component={AsyncSelectField}
                    loadOptions={obtenerCiclo_escolar}
                    disabled={disable}
                    isClearable
                />
                <br /><br />
                <label>Seleccione Grado</label>  
                <Field
                    name="grado"
                    component={AsyncSelectField}
                    loadOptions={obtenerGrado}
                    disabled={disable}
                    isClearable
                />
                
                <br /><br />
                <label>Seleccione Seccion</label>
                <Field
                    name="seccion"
                    component={AsyncSelectField}
                    loadOptions={obtenerSeccion}
                    disabled={disable}
                    isClearable
                />
                
                <br /><br />
                <label>Seleccione Curso</label>
                <Field
                    name="curso"
                    component={AsyncSelectField}
                    loadOptions={obtenercurso}
                    disabled={disable}
                    isClearable
                />
                
                <br /><br />
                <label>Seleccione Profesor</label>
                <Field
                    name="profesor"
                    component={AsyncSelectField}
                    loadOptions={obtenerprofesor}
                    disabled={disable}
                    isClearable
                />
                
                <br /><br />         
                <label>Descripcion</label>
                <Field
                    name="descripcion"
                    component={renderField}
                    disabled={disable}
                    type="text"
                />
                {/*
                <label>Imagen Portada</label>
                <Field
                    photo={item ? item.adjunto : null}
                    name="imagen_portada"
                    component={renderFilePicker}
                    setFile={setAdjunto}
                />

                {item &&
                    <a href={item.adjunto} target="_blank">Ver / Descargar</a>
                }
                */}
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
                        href="/#/asignacion"
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
    form: 'AsignacionForm' // a unique identifier for this form
})(Formulario)