import React, {Component} from "react";
import { reduxForm, Field } from "redux-form";
import { renderField,renderDatePicker } from "../Utils/renderField/renderField";
import { AsyncSelectField } from "../Utils/renderField/renderField";

class Formulario extends Component{    
    render(){
        const {handleSubmit, crear, obtenerNiveles} = this.props;
        //console.log("obtener profesiones",this.props)        
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Grado';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
        return(
            <form onSubmit={handleSubmit}>

                <Field
                    name="nivel"
                    component={AsyncSelectField}
                    loadOptions={obtenerNiveles}
                    disabled={disable}
                    isClearable
                />
                
                <br /><br />  
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
                <br /><br />

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        className='btn btn-secondary btn-sm mr-2'
                        href="/#/grado"
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
    form: 'GradoForm' // a unique identifier for this form
})(Formulario)