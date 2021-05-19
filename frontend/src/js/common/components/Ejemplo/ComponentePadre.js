import React, { Component } from "react";
import Hijo from "./ComponenteHijo";

class Padre extends Component{    
    render(){
        console.log("PROPS: ", this.props);
        
        const { mostrarSaludo, mostrar_saludo } = this.props;

        const listado = [
            {id: 1, nombre: "fresa"},
            {id: 2, nombre: "zapote"},
            {id: 3, nombre: "melon"},
            {id: 4, nombre: "naranja"},
            {id: 5, nombre: "lima"},
        ]

        return(
            <React.Fragment>
                <h3>Componente Padre</h3>
                <button
                    onClick={()=> mostrarSaludo(!mostrar_saludo)}
                    className='btn btn-primary btn-sm'
                >
                    {mostrar_saludo == true ? "Ocultar Saludo" : "Mostrar Saludo" }
                </button>

                {mostrar_saludo == true &&
                    <div className="alert alert-warning" role="alert">
                        Hola! Muy buenos días
                    </div>
                }

                <Hijo listado={listado} />
            </React.Fragment>
        );
    }
}

export default Padre;