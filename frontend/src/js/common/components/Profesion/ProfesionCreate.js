import React, {Component} from "react";
import Formulario from './Formulario';

class ProfesionCreate extends Component{
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
        this.setState({adjunto: archivo});
    }

    create = (data) => {
        const { createProfesion } = this.props;
        createProfesion({...data, adjunto: null}, [{"file": this.state.adjunto, "name": "adjunto"}]);
    };

    update = (data) => {
        const { updateProfesion } = this.props;
        updateProfesion({...data, adjunto: null}, [{"file": this.state.adjunto, "name": "adjunto"}]);
    };    

    actualizar = (data) => {
        const {editar} = this.props;
        const id = data.id;
        editar(id, data);
    }

    render(){
        const {createProfesion, item} = this.props;
        const {creacion} = this.state;
        const fun = creacion ? this.create : this.update;
        
        //console.log("Contenido de la propiedad ajunto: ", this.state.adjunto);
        console.log("Item: ", item);
        return(
            <React.Fragment>
                <h3>Nuevo Registro</h3>
                <Formulario
                    item={item}
                    setAdjunto={this.setAdjunto}
                    crear={creacion}
                    onSubmit={fun}
                />
            </React.Fragment>
        );
    }
}

export default ProfesionCreate;