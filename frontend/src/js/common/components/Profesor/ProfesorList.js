import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ProfesorList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        listar();
    }

    render(){
        const { data, loader, eliminar} = this.props;
        console.log("data: ", data);
        
        return(
            <div>
                <h3> Profesores </h3>

                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/profesors/crear'
                >
                    Agregar profesor
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
                        dataField="profesion"
                        dataSort
                        dataFormat={(cell)=>{
                            return cell.profesion_name;
                        }}
                    >
                        Profesion
                    </TableHeaderColumn>                                                                                                    
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                editar: "profesors", 
                                visualizar: "profesors", 
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

export default ProfesorList;