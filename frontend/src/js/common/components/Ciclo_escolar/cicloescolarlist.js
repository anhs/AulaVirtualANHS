import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class Ciclo_escolarList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        console.log("noese :", this.props);
        listar();
    }
    
    render(){
        const { data, loader, eliminar} = this.props;
        console.log("data: ", data);
        
        return(
            <div>
                <h3> Listado de ciclos escolares </h3>

                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/ciclo_escolar/crear'
                >
                    Agregar Ciclo Escolar
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
                        dataField="anio"
                        dataSort
                    >
                        Ciclo Escolar
                    </TableHeaderColumn>                    
                                                                                                  
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                editar: "ciclo_escolar", 
                                visualizar: "ciclo_escolar", 
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

export default Ciclo_escolarList;