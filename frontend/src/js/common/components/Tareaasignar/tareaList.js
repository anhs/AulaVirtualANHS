import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class TareaList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        const idasignacion = this.props.match.params.idasignacion;
        listar(idasignacion);
    }

    render(){
        const { data, loader, eliminar} = this.props;
        console.log("PROPS: ", this.props);
        const idasignacion = this.props.match.params.idasignacion;
        return(
            <div>
                <h3> Listado de Tareas del curso </h3>
                {this.props.me.rol=="Docente"&&
                   <div className="d-flex flex-row justify-content-end mb-3">
                      <a
                         className="btn btn-primary btn-sm"
                         href={`/#/tarea/crear/${idasignacion}`}
                      >
                    Agregar Tarea
                      </a>
                    </div>
                }
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
                        dataField="nombre"
                        dataAlign="center"
                        dataSort
                    >
                        Tareas Registradas
                    </TableHeaderColumn>
                   
                    {this.props.me.rol=="Docente"&&                   
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                visualizar: "tarea",
                                editar: 'tarea', 
                                eliminar: eliminar
                            })}
                    >
                        Acciones
                    </TableHeaderColumn>
                    }
                     {this.props.me.rol=="Estudiante"&&
                                      
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                visualizar: "tarea",
                                tarea: "tareaestudiante/crear",
                                dirigir: "tareaestudiante"
                                /*editar: 'tarea', 
                                eliminar: eliminar*/
                            })}
                    >
                        Subir la tarea / Ver Tarea / Calificacion
                    </TableHeaderColumn>
                    }
                </Grid>
                }

                <a
                    className='btn btn-secondary btn-sm mr-2'
                    href={this.props.me.rol==="Docente" ? '/#/cursosdocenteasignado':'/#/cursosestudianteasignado'}
                >
                        Regresar....
                </a>
            </div>
        );
    }
}

export default TareaList;