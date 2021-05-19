import React, {Component} from "react";
import { reduxForm, Field } from "redux-form";
import { renderField } from "../Utils/renderField/renderField";


class Formulario extends Component{    
    render(){
        const {handleSubmit, crear} = this.props;       
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Nivel';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
       
        return(
            
            <form onSubmit={handleSubmit} className='w-60'>
                <h3>{titulo}</h3>
                <label>Nombre</label>
                <Field
                    name="nombre"
                    component={renderField}
                    disabled={disable}
                    type="text"
                />
                <br /><br />
                 <label>Descripcion</label>
                <Field
                    name="descripcion"
                    component={renderField}
                    disabled={disable}
                    type="text"
                />
                <br /><br />                                                             

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        className='btn btn-secondary btn-sm mr-2'
                        href="/#/nivel"
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
    form: 'NivelForm' // a unique identifier for this form
})(Formulario)