import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class EstudianteList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        listar();
    }

    render(){
        const { data, loader, eliminar} = this.props;
        console.log("data: ", data);
        
        return(
            <div>
                <h3> Listado de estudiantes </h3>

                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/estudiante/crear'
                >
                    Agregar Estudiantes
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
                        dataField="profile"
                        dataSort
                        dataFormat={(cell, row)=> {
                            console.log("cell: ", cell);
                            return cell.name;
                        }}
                    >
                        Nombre
                    </TableHeaderColumn>                    
                    <TableHeaderColumn                        
                        dataField="profile"
                        dataSort
                        dataFormat={(cell)=>{
                            return cell.last_name;
                        }}
                    >
                        Apellidos
                    </TableHeaderColumn>        
                    {/*            
                    <TableHeaderColumn                        
                        dataField="email"
                        dataSort
                    >
                        Correo
                    </TableHeaderColumn>
                    */}
                    <TableHeaderColumn                        
                        dataField="carnet"
                        dataSort
                    >
                        Carnet
                    </TableHeaderColumn>                                                                                                    
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                editar: "estudiante", 
                                visualizar: "estudiante", 
                                eliminar: () => {} 
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

export default EstudianteList;