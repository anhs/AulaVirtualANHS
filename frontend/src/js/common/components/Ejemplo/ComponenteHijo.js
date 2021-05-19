import React, { Component } from "react";

class Hijo extends Component{
    render(){
        const {listado} = this.props;
        console.log("lista: ", listado);

        return(
            <div className="d-flex flex-column">
            <h4>Componente Hijo</h4> <br /><br />

            {listado.map(elemento=>(
                <span key={elemento.id}> {elemento.nombre} </span>
            ))}

            </div>
        );
    }
}

export default Hijo;