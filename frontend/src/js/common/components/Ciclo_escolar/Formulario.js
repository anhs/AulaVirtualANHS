import React, {Component} from "react";
import { reduxForm, Field } from "redux-form";
import { renderNumber } from "../Utils/renderField/renderField";


class Formulario extends Component{    
    render(){
        const {handleSubmit, crear} = this.props;       
        const ver = window.location.href.includes("ver");
        const editar = window.location.href.includes("editar");
        let titulo = editar ? 'Editar Registro':'Registrar Año escolar';
        let disable = false;
        if(crear==false && editar==false)
        {   titulo='Ver Registro';
            disable = true;
        }
       
        return(
            
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <label>Ciclo Escolar</label>
                <Field
                    name="anio"
                    component={renderNumber}
                    disabled={disable}
                    type="text"
                />
                <br /><br />
                                                                     

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        className='btn btn-secondary btn-sm mr-2'
                        href="/#/ciclo_escolar"
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
    form: 'AnioForm' // a unique identifier for this form
})(Formulario)