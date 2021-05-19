import { create } from "lodash";
import React, {Component} from "react";
import { reduxForm, Field } from "redux-form";
import { renderField } from "../Utils/renderField/renderField";
import { AsyncSelectField } from "../Utils/renderField/renderField";

class Formulario extends Component{    
    render(){
        const {handleSubmit, crear} = this.props;        
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Estudiante';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
        return(
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <Field
                    name="name"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
                <br /><br />
                 <label>Apellidos</label>
                <Field
                    name="last_name"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
                <br /><br />
                <label>Usuario</label>
                <Field
                    name="username"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />                
                <br /><br />
               
                <label>Correo Electrónico</label>
                <Field
                    name="email"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
                <br /><br />
                {!ver &&
                <label>Contraseña</label>
                }
                {!ver &&
                <Field
                    name="password"
                    component={renderField}
                    type="password"
                />
                }
                <br /><br />
                <label>Carnet</label>
                <Field
                    name="carnet"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
               
                <br /><br />
                <label>Contacto</label>
                <Field
                    name="contacto"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
               
                <br /><br />        
                <label>Direccion contacto</label>
                <Field
                    name="direccion_contacto"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
               
                <br /><br /> 
                <label>Telefono contacto</label>
                <Field
                    name="telefono_contacto"
                    component={renderField}
                    type="text"
                    disabled={disable}
                />
               
                <br /><br />                                                                                 

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        className='btn btn-secondary btn-sm mr-2'
                        href="/#/estudiante"
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
    form: 'EstudianteForm' // a unique identifier for this form
})(Formulario)