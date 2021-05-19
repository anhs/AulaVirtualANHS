import React, {Component} from "react";
import Formulario from './Formulario';

class Asignacion_EstudianteCreate extends Component{

    state={
        creacion: true,
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        const id = match.params.id;

        
        if(id){
            this.setState({creacion: false});
            leer(id);
        }        
    }

    actualizar = (data) => {
        const {editar} = this.props;
        const id = data.id;
        editar(id, data);
    }

    render(){
        const {
            crear, 
            obtenerasignacion,
            obtenerestudiante,
        } = this.props;
        const idasignacion = this.props.match.params.idasignacion;

        const {creacion} = this.state;
        const fun = creacion ? crear : this.actualizar;

        //console.log("Contenido de la propiedad ajunto: ", this.state.adjunto);
        console.log("los props",this.props );
        return(
            <React.Fragment>
                <h3>Nuevo Registro</h3>
                <Formulario
                    obtenerestudiante={obtenerestudiante}
                    obteneridasignacion={idasignacion}
                    crear={creacion}
                    onSubmit={fun}
                    initialValues={{asignacion: idasignacion}}
                    /*obtenerCiclo_escolar={obtenerCiclo_escolar}
                    item={item}
                    setAdjunto={this.setAdjunto}
                    crear={creacion}
                    onSubmit={fun}*/
                />
            </React.Fragment>
        );
    }
}

export default Asignacion_EstudianteCreate;