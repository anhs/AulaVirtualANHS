import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class GradoList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        listar();
    }

    render(){
        const { data, loader, eliminar} = this.props;
        console.log("data: ", data);
        
        return(
            <div>
                <h3> Grados registrados </h3>

                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/grado/crear'
                >
                    Agregar grado
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
                        dataField="nombre"
                        dataSort
                    >
                        Grado

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
                        dataField="nivel"
                        dataSort
                        dataFormat={(cell, row)=>{
                            //console.log("cell: ", cell);
                            //console.log("row: ", row);
                            return cell.nombre;
                        }}
                    >
                        Nivel de Educacion
                    </TableHeaderColumn>                                                                                                    
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                editar: "grado", 
                                visualizar: "grado", 
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

export default GradoList;