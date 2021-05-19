import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class CursosAsigEsList extends Component{

    componentWillMount = () => {
        const {Cursos_Estudiante} = this.props;
        Cursos_Estudiante();
    }

    render(){
        const { data, loader} = this.props;
        console.log ("datas", data);
        console.log("load",loader)
        console.log("PROPS: ", this.props);
        
        return(
            <div>
                <h3> Listado de Cursos Asignados al estudiante </h3>
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
                            //console.log("cell: ", cell);
                            //console.log("row: ", row);
                            return cell.curso.nombre;
                            
                        }}
                    >
                        Cursos
                    </TableHeaderColumn>
                    <TableHeaderColumn                        
                        dataField="profesor"
                        dataSort
                        dataFormat={(cell, row)=> {
                            //console.log("cell: ", cell);
                            //console.log("row: ", row);
                            return row.asignacion.profesor.profile.name;
                            
                        }}
                    >
                        Docente
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn 
                        isKey                       
                        dataField="asignacion_id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                dirigir: "material_clase",
                                tarea: "tareaestudiante"
                                /*editar: "asignacion",                               
                                eliminar: eliminar*/
                            })}
 
                       
                    >
                        Material - Subir Tarea
                    </TableHeaderColumn>
                   
                </Grid>
                }
            </div>
        );
    }
}

export default CursosAsigEsList;