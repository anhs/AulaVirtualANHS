import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut,getMe } = this.props;
        console.log(this.props);
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/profesors" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Docentes</span>
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink to="/estudiante" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Estudiantes</span>
                            </NavLink>
                        </li>        
                        <li className="nav-item">
                            <NavLink to="/profesions" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Profesiones</span>
                            </NavLink>
                        </li> 
                        <li className="nav-item">
                            <NavLink to="/nivel" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Niveles en Educación</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/seccion" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Secciones</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/curso" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Cursos</span>
                            </NavLink>
                        </li> 
                        <li className="nav-item">
                            <NavLink to="/ciclo_escolar" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Ciclo escolar</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/grado" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Grado</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/asignacion" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Asignacion</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cursosestudianteasignado" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Asignar a Estudiante</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Eventos" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Eventos</span>
                            </NavLink>
                        </li>                                                                                           
                        <li className="nav-item">
                            <NavLink to="/page2" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Basic components</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/grids" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Grids</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/notifications" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Notificaciones</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tabs" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Tabs</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;
