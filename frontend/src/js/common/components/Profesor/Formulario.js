import React, {Component} from "react";
import { reduxForm, Field } from "redux-form";
import { renderField } from "../Utils/renderField/renderField";
import { AsyncSelectField } from "../Utils/renderField/renderField";

class Formulario extends Component{    
    render(){
        const {handleSubmit, crear, obtenerProfesiones} = this.props;
        console.log("obtener profesiones",this.props)        
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Profesor';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
        return(
            <form onSubmit={handleSubmit}>
                <label>Nombres</label>
                <Field
                    name="name"
                    component={renderField}
                    type="text"
                />
                <label>Apellidos</label>
                <Field
                    name="last_name"
                    component={renderField}
                    type="text"
                />
                <br /><br />
                <label>Usuario</label>
                <Field
                    name="username"
                    component={renderField}
                    type="text"
                />                
                <br /><br />
                <label>Correo Electrónico</label>
                <Field
                    name="email"
                    component={renderField}
                    type="text"
                />
                <br /><br />
                <label>Contraseña</label>
                <Field
                    name="password"
                    component={renderField}
                    type="password"
                />
                <br /><br />
                
                <Field
                    name="profesion"
                    component={AsyncSelectField}
                    loadOptions={obtenerProfesiones}
                    isClearable
                />
                
                <br /><br />                                                                

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        className='btn btn-secondary btn-sm mr-2'
                        href="/#/profesors"
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
    form: 'ProfesorForm' // a unique identifier for this form
})(Formulario)