import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './acciones.css';
import Swal from 'sweetalert2';


class Acciones extends Component {
    constructor(props) {
        super(props);
    }

    eliminar = (id) => {
        return () => {
            Swal.fire({
                title: '¿Eliminar?',
                text: '¡No podrá revertir esta acción!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '¡Sí, eliminar!',
                cancelButtonText: 'No, cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    this.props.eliminar(id);
                }
            });
        }
    };

    render() {
        const { id, ver, editar, eliminar, visualizar,dirigir,estudiante,tarea } = this.props;

        return (
            <div className="d-flex justify-content-center">
                {(dirigir !== undefined) && (
                    <Link to={`${dirigir}/${id}/`} className="px-2" ><i className="material-icons">book</i></Link>
                )}
                {(ver !== undefined) && (
                    <Link to={`${ver}/${id}/`} className="px-2" ><i className="material-icons">remove_red_eye</i></Link>
                )}
                {(estudiante !== undefined) && (
                    <Link to={`${estudiante}/${id}/`} className="px-2" ><i className="material-icons">accessibility</i></Link>
                )}
                {(tarea !== undefined) && (
                    <Link to={`${tarea}/${id}/`} className="px-2" ><i className="material-icons">note_add</i></Link>
                )}  
                {(visualizar !== undefined) && (
                    <Link to={`${visualizar}/${id}/ver`} className="px-2" ><i className="material-icons">remove_red_eye</i></Link>
                )}                
                {(editar !== undefined) && (
                    <Link className="text-warning" to={`${editar}/${id}/editar`} ><i className="material-icons">edit</i></Link>
                )}
                {(eliminar !== undefined) && (
                    <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} onClick={this.eliminar(id)}><i className="material-icons">delete</i></a>
                )}
               
            </div>
        );
    }
}
Acciones.propTypes = {
};

export function standardActions(acciones) {
    return (cell, row) => {
        return ( <Acciones id={cell} {...acciones}/> )
    };
}
