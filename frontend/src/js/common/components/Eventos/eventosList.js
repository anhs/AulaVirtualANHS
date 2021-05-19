import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class EventosList extends Component{

    componentWillMount = () => {
        const {listar} = this.props;
        listar();
    }

    render(){
        const { data, loader, eliminar} = this.props;
        console.log("data: ", data);
        
        return(
            <div>
                <h3> Eventos Registrados </h3>

                <div className="d-flex flex-row justify-content-end mb-3">
                <a
                    className="btn btn-primary btn-sm"
                    href='/#/eventos/crear'
                >
                    Agregar Eventos
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
                        dataField="titulo"
                        dataSort
                    >
                        Titulo del Evento

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
                        dataField="fecha"
                        dataSort
                    >
                        Fecha
                    </TableHeaderColumn>
                    <TableHeaderColumn                        
                        dataField="hora"
                        dataSort
                    >
                        Hora
                    </TableHeaderColumn>                                                                                                      
                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
                            standardActions({
                                editar: "eventos", 
                                visualizar: "eventos", 
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

export default EventosList;