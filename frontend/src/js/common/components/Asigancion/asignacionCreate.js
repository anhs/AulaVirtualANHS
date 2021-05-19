import React, {Component} from "react";
import Formulario from './Formulario';

class AsignacionCreate extends Component{

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
            obtenerCiclo_escolar,
            obtenerGrado,
            obtenerSeccion,
            obtenercurso,
            obtenerprofesor
        } = this.props;

        const {creacion} = this.state;
        const fun = creacion ? crear : this.actualizar;

        //console.log("Contenido de la propiedad ajunto: ", this.state.adjunto);
        console.log("los props",this.props );
        return(
            <React.Fragment>
                <h3>Nuevo Registro</h3>
                <Formulario
                    obtenerSeccion={obtenerSeccion}
                    obtenercurso={obtenercurso}
                    obtenerprofesor={obtenerprofesor}
                    obtenerCiclo_escolar={obtenerCiclo_escolar}
                    obtenerGrado={obtenerGrado}
                    crear={creacion}
                    onSubmit={fun}
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

export default AsignacionCreate;