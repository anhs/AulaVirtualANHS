import React, { Component } from 'react';


class Demo extends Component {
    render() {
        return (
            <div className="page-header py-4 no-gutters row">
                <div className="text-sm-left mb-3 text-center text-md-left mb-sm-0 col-12 col-sm-4">
                    <span
                        className="text-uppercase page-subtitle">Escritorio ejemplo
                    </span>
                    <h3 className="page-title">Titulo secundario</h3>
                </div>
                <div className="d-flex flex-row justify-content-end mb-5">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/cursosdocenteasignado'
                >
                    Cursos Asignados al Docente
                </a>
                </div>
                <br></br>
                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/cursosestudianteasignado'
                >
                    Cursos Asignados al Estudiante
                </a>
                </div>
            </div>
        );
    }
}

export default Demo;
