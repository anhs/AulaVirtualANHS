import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class AsignacionList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        listar();
    }

    render(){
        const { data, loader, eliminar} = this.props;
        console.log("PROPS: ", this.props);
        
        return(
            <div>
                <h3> Listado de Asignaciones </h3>

                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/asignacion/crear'
                >
                    Agregar Asignacion a Docente
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
                        dataField="profesor"
                        dataSort
                        dataFormat={(cell, row)=> {
                            console.log("row: ", cell);
                            return cell.profile.name 
                            + " " + cell.profile.last_name;
                        }}
                    >
                        Profesor
                    </TableHeaderColumn>
                    <TableHeaderColumn                        
                        dataField="curso"
                        dataSort
                        dataFormat={(cell, row)=> {
                            console.log("cell: ", cell);
                            return cell.nombre;
                        }}
                    >
                        Curso
                    </TableHeaderColumn>

                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                editar: "asignacion", 
                                visualizar: "asignacion", 
                                eliminar: eliminar
                            })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
                }
            </div>
        );
    }
}

export default AsignacionList;