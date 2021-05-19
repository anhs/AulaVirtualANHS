import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class Asignacion_EstudianteList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        const idasignacion = this.props.match.params.idasignacion;
        listar(idasignacion);
    }

    render(){
        const { data, loader, eliminar} = this.props;
        const idasignacion = this.props.match.params.idasignacion;
        console.log("PROPS: ", this.props);
        
        return(
            <div>
                <h3> Listado de Asignaciones </h3>

                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href={`/#/asignacion_estudiante/crear/${idasignacion}`}

                >
                    Agregar Asignacion a Estudiante
                </a>
                </div>
                {data &&
                <Grid 
                    hover 
                    striped 
                    data={data}
                    loading={loader} 
                    //onPageChange={onPageChange} 
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn                        
                        dataField="asignacion"
                        dataSort
                        dataFormat={(cell, row)=> {
                            console.log("row: ", cell);
                            return cell.grado.nombre+" "+cell.seccion.nombre+" "+cell.curso.nombre; 
                            //+ " " + cell.profile.last_name;
                        }}
                    >
                        Asignacion
                    </TableHeaderColumn>
                    <TableHeaderColumn                        
                        dataField="estudiante"
                        dataSort
                        dataFormat={(cell, row)=> {
                            console.log("cell: ", cell);
                            return cell.profile.name+ " " +cell.profile.last_name;
                        }}
                    >
                        Estudiante
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                editar: "asignacion_estudiante", 
                                visualizar: "asignacion_estudiante", 
                                eliminar: eliminar
                            })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
                }
                <a
                    className='btn btn-secondary btn-sm mr-2'
                    href="/#/cursosdocenteasignado"
                >
                        Regresar....
                </a>
            </div>
        );
    }
}

export default Asignacion_EstudianteList;