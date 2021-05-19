import React, {Component} from "react";
import Formulario from './Formulario';

class TareaEstuCreate extends Component{
    state={
        creacion: true,
        adjunto: null,
        idasignacion: null,
    }

    componentWillMount = () => {
        const {leer, getProfesion, Id_Estudiante,match} = this.props;
        const id = match.params.id;
        Id_Estudiante();

        
        if(id){
            this.setState({creacion: false});
            //leer(id);
            getProfesion(id);
        }        
    }

    componentWillUnmount = () => {
        const {limpiarItem} = this.props;
        limpiarItem();
    }

    setAdjunto = (archivo) => {
        this.setState({archivo: archivo});
    }

    create = (data) => {
        const { createTarea } = this.props;
        const idasignacion = this.props.match.params.idasignacion;
        createTarea({...data, ...data.nota_total=0,  archivo: null, idasignacion}, [{"file": this.state.archivo, "name": "archivo"}]);
    };


    

    render(){
        const idtarea = this.props.match.params.idtarea;
        const idasignacion = this.props.match.params.idasignacion;
        const {crear, createProfesion, item} = this.props;
        const {creacion} = this.state;
        const fun = creacion ? this.create : this.update;
        
        //console.log("Contenido de la propiedad ajunto: ", this.state.adjunto);
        console.log("Item: ", item);
        console.log("ififif", this.props);

        return(
            <React.Fragment>
                <h3>Subir Tarea</h3>
                <Formulario
                    item={item}
                    setAdjunto={this.setAdjunto}
                    crear={creacion}
                    obteneridasignacion={idasignacion}
                    onSubmit={fun}
                    initialValues={{tarea: idtarea}}
                />
            </React.Fragment>
        );
    }
}

export default TareaEstuCreate;