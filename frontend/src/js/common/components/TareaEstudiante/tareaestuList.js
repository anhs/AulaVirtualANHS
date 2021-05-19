import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class TareaEstuList extends Component{

    componentWillMount = () => {
        const {listartareasenviadas} = this.props;
        const idasignacion = this.props.match.params.idasignacion;
        listartareasenviadas(idasignacion);
    }

    render(){
        const { data2, loader, eliminar} = this.props;
        console.log("PROPS: ", this.props);
        console.log("dadsdsd ",data2.mensaje);
        return(
            <div>
                <h3> Listado de tareas enviadas del curso </h3>

                {data2 &&
                <Grid 
                    hover 
                    striped 
                    data={data2}
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
                    <TableHeaderColumn                        
                        dataField="mensaje"
                        dataAlign="center"
                        dataSort
                    >
                        Estado de la Tarea
                    </TableHeaderColumn>
                                      
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                visualizar: "tarea",
                                tarea: "tareaestudiante/crear"
                                /*editar: 'tarea', 
                                visualizar: "tarea", 
                                eliminar: eliminar*/
                            })}
                    >
                        Subir_tarea - Ver tarea
                    </TableHeaderColumn>
                    
                    
                </Grid>
                }
                <a
                    className='btn btn-secondary btn-sm mr-2'
                    href="/#/cursosestudianteasignado"
                >
                        Regresar....
                </a>
            </div>
        );
    }
}

export default TareaEstuList;