import React, {Component} from "react";
import Formulario from './Formulario';

class TareaCreate extends Component{
    state={
        creacion: true,
        adjunto: null,
    }

    componentWillMount = () => {
        const {leer, getProfesion, match} = this.props;
        const id = match.params.id;

        
        if(id){
            this.setState({creacion: false});
            //leer(id);
            getProfesion(id);
        }        
    }

    componentWillUnmount = () => {
        const {clearItem} = this.props;
        clearItem();
    }

    setAdjunto = (archivo) => {
        this.setState({archivo: archivo});
    }

    create = (data) => {
        const { createProfesion } = this.props;
        createProfesion({...data, archivo: null}, [{"file": this.state.archivo, "name": "archivo"}]);
    };

    update = (data) => {
        const { updateProfesion } = this.props;
        updateProfesion({...data, archivo: null}, [{"file": this.state.archivo, "name": "archivo"}]);
    };    

    actualizar = (data) => {
        const {editar} = this.props;
        const id = data.id;
        editar(id, data);
    }

    render(){
        const idasignacion = this.props.match.params.idasignacion;
        const {createProfesion, item} = this.props;
        const {creacion} = this.state;
        const fun = creacion ? this.create : this.update;
        
        //console.log("Contenido de la propiedad ajunto: ", this.state.adjunto);
        console.log("Item: ", item);
        console.log("ififif",this.props);
        return(
            <React.Fragment>
                <h3>Nuevo Registro Tarea</h3>
                <Formulario
                    item={item}
                    setAdjunto={this.setAdjunto}
                    crear={creacion}
                    obteneridasignacion={idasignacion}
                    onSubmit={fun}
                    initialValues={{asignacion: idasignacion}}
                />
            </React.Fragment>
        );
    }
}

export default TareaCreate;