import React, {Component} from "react";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class MaterialList extends Component{

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
                <h3> Listado de Materiales del curso </h3>
                {this.props.me.rol=="Docente" &&
                    <div className="d-flex flex-row justify-content-end mb-3">
                    <a
                        className="btn btn-primary btn-sm"
                        href={`/#/material_clase/crear/${idasignacion}`}
                    >
                        Agregar Material
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
                        dataField="titulo"
                        dataAlign="center"
                        dataSort
                    >
                        Materiales Registrados
                    </TableHeaderColumn>
                    {this.props.me.rol=="Estudiante" &&
                    

                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
   
                                standardActions({
                                    visualizar: "material_clase"
                                    /*editar: 'material_clase', 
                                    eliminar: eliminar*/
                                })
                            }
                            
                        
                    >
                        Acciones
                    </TableHeaderColumn>
                   }
                   {this.props.me.rol=="Docente" &&
                    

                    <TableHeaderColumn
                        isKey                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={
   
                                standardActions({
                                    visualizar: "material_clase",
                                    editar: 'material_clase', 
                                    eliminar: eliminar
                                })
                            }
                            
                        
                    >
                        Acciones
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

export default MaterialList;