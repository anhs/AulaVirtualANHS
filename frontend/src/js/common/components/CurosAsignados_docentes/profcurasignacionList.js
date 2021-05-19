import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class CursosAsigList extends Component{

    componentWillMount = () => {
        const {Cursos_Docente} = this.props;
        Cursos_Docente();
    }

    render(){
        const { data, loader} = this.props;
        console.log ("datas", data);
        console.log("load",loader)
        console.log("PROPS: ", this.props);
        
        return(
            <div>
                <h3> Listado de Cursos Asignados al Docente </h3>
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
                        dataField="curso"
                        dataSort
                        dataFormat={(cell, row)=> {
                            console.log("cell: ", cell);
                            console.log("row: ", row);
                            return row.curso.nombre;
                            
                        }}
                    >
                        Cursos
                    </TableHeaderColumn>
                    <TableHeaderColumn                        
                        dataField="grado"
                        dataSort
                        dataFormat={(cell, row)=> {
                            console.log("cell: ", cell);
                            console.log("row: ", row);
                            return row.grado.nombre+" "+row.seccion.nombre;
                            
                        }}
                    >
                        Grado
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                dirigir: "material_clase",
                                estudiante: "asignacion_estudiante",
                                tarea: "tarea"
                                /*editar: "asignacion",                               
                                eliminar: eliminar*/
                            })}
                    >
                        Material Estudiante Tarea
                    </TableHeaderColumn>
                   
                </Grid>
                }
            </div>
        );
    }
}

export default CursosAsigList;