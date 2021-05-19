import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';

import ProfesionList from "./common/components/Profesion/ProfesonListContainer";
import ProfesionCreate from "./common/components/Profesion/ProfesionCreateContainer";

import ProfesorList from "./common/components/Profesor/ProfesorListContainer";
import ProfesorCreate from "./common/components/Profesor/ProfesorCreateContainer";

import EstudianteList from "./common/components/Estudiante/estudiantelistcontainer";
import EstudianteCreate from "./common/components/Estudiante/estudiantecreatecontainer";

import NivelList from "./common/components/Niveles/niveleslistcontainer";
import NivelCreate from "./common/components/Niveles/nivelescreatecontainer";

import SeccionList from "./common/components/Seccion/seccionlistcontainer";
import SeccionCreate from "./common/components/Seccion/seccioncreatecontainer";

import CursoList from "./common/components/curso/cursolistcontainer";
import CursoCreate from "./common/components/curso/cursocreatecontainer";

import Ciclo_escolarList from "./common/components/Ciclo_escolar/cicloescolarlistcontainer";
import Ciclo_escolarCreate from "./common/components/Ciclo_escolar/cicloescolarcreatecontainer";

import GradoList from "./common/components/Grado/gradoListContainer";
import GradoCreate from "./common/components/Grado/gradoCreateContainer";

import AssignacionList from "./common/components/Asigancion/asignacionListContainer";
import AssignacionCreate from "./common/components/Asigancion/asignacionCreateContainer";

import Assignacion_ESList from "./common/components/Asignacion_estudiante/asigestudianteListContainer";
import Assignacion_ESCreate from "./common/components/Asignacion_estudiante/asigestudianteCreateContainer";

import EventosList from "./common/components/Eventos/eventosListContainer";
import EventosCreate from "./common/components/Eventos/eventosCreateContainer";

import Material_claseList from "./common/components/Material_Clase/materialListContainer";
import Material_claseCreate from "./common/components/Material_Clase/materialCreateContainer";

import TareaList from "./common/components/Tareaasignar/tareaListContainer";
import TareaCreate from "./common/components/Tareaasignar/tareaCreateContainer";

import TareaEstuList from "./common/components/TareaEstudiante/tareaestuListContainer";
import TareaEstuCreate from "./common/components/TareaEstudiante/tareaestuCreateContainer";

import ComponenteContainer from "./common/components/Ejemplo/ComponenteContainer";
import Docentecurasig from "./common/components/CurosAsignados_docentes/profcurasignacionListContainer";
import Estudiantecurasig from "./common/components/CursosAsiganados_estudiante/estucurasignacionListContainer";

require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/profesions" component={ProfesionList} />
                <ProtectedRoute exact path="/profesions/:id/editar" component={ProfesionCreate} />
                <ProtectedRoute exact path="/profesions/:id/ver" component={ProfesionCreate} />
                <ProtectedRoute exact path="/profesions/crear" component={ProfesionCreate} />
                
                <ProtectedRoute exact path="/profesors" component={ProfesorList} />
                <ProtectedRoute exact path="/profesors/:id/editar" component={ProfesorCreate} />
                <ProtectedRoute exact path="/profesors/:id/ver" component={ProfesorCreate} />
                <ProtectedRoute exact path="/profesors/crear" component={ProfesorCreate} />

                <ProtectedRoute exact path="/estudiante" component={EstudianteList} />
                <ProtectedRoute exact path="/estudiante/:id/editar" component={EstudianteCreate} />
                <ProtectedRoute exact path="/estudiante/:id/ver" component={EstudianteCreate} />
                <ProtectedRoute exact path="/estudiante/crear" component={EstudianteCreate} />

                <ProtectedRoute exact path="/nivel" component={NivelList} />
                <ProtectedRoute exact path="/nivel/:id/editar" component={NivelCreate} />
                <ProtectedRoute exact path="/nivel/:id/ver" component={NivelCreate} />
                <ProtectedRoute exact path="/nivel/crear" component={NivelCreate} />

                <ProtectedRoute exact path="/seccion" component={SeccionList} />
                <ProtectedRoute exact path="/seccion/:id/editar" component={SeccionCreate} />
                <ProtectedRoute exact path="/seccion/:id/ver" component={SeccionCreate} />
                <ProtectedRoute exact path="/seccion/crear" component={SeccionCreate} />

                <ProtectedRoute exact path="/curso" component={CursoList} />
                <ProtectedRoute exact path="/curso/:id/editar" component={CursoCreate} />
                <ProtectedRoute exact path="/curso/:id/ver" component={CursoCreate} />
                <ProtectedRoute exact path="/curso/crear" component={CursoCreate} />

                <ProtectedRoute exact path="/grado" component={GradoList} />
                <ProtectedRoute exact path="/grado/:id/editar" component={GradoCreate} />
                <ProtectedRoute exact path="/grado/:id/ver" component={GradoCreate} />
                <ProtectedRoute exact path="/grado/crear" component={GradoCreate} />

                <ProtectedRoute exact path="/ciclo_escolar" component={Ciclo_escolarList} />
                <ProtectedRoute exact path="/ciclo_escolar/:id/editar" component={Ciclo_escolarCreate} />
                <ProtectedRoute exact path="/ciclo_escolar/:id/ver" component={Ciclo_escolarCreate} />
                <ProtectedRoute exact path="/ciclo_escolar/crear" component={Ciclo_escolarCreate} />

                <ProtectedRoute exact path="/asignacion" component={AssignacionList} />
                <ProtectedRoute exact path="/asignacion/:id/editar" component={AssignacionCreate} />
                <ProtectedRoute exact path="/asignacion/:id/ver" component={AssignacionCreate} />
                <ProtectedRoute exact path="/asignacion/crear" component={AssignacionCreate} />

                <ProtectedRoute exact path="/asignacion_estudiante/:idasignacion" component={Assignacion_ESList} />
                <ProtectedRoute exact path="/asignacion_estudiante/:idasignacion/asignacion_estudiante/:id/editar" component={Assignacion_ESCreate} />
                <ProtectedRoute exact path="/asignacion_estudiante/:idasignacion/asignacion_estudiante/:id/ver" component={Assignacion_ESCreate} />
                <ProtectedRoute exact path="/asignacion_estudiante/crear/:idasignacion" component={Assignacion_ESCreate} />

                <ProtectedRoute exact path="/eventos" component={EventosList} />
                <ProtectedRoute exact path="/eventos/:id/editar" component={EventosCreate} />
                <ProtectedRoute exact path="/eventos/:id/ver" component={EventosCreate} />
                <ProtectedRoute exact path="/eventos/crear" component={EventosCreate} />

                <ProtectedRoute exact path="/cursosdocenteasignado" component={Docentecurasig} />
                <ProtectedRoute exact path="/cursosestudianteasignado" component={Estudiantecurasig} />

                <ProtectedRoute exact path="/material_clase/:idasignacion" component={Material_claseList} />
                <ProtectedRoute exact path="/material_clase/:idasignacion/material_clase/:id/editar" component={Material_claseCreate} />
                <ProtectedRoute exact path="/material_clase/:idasignacion/material_clase/:id/ver" component={Material_claseCreate} />
                <ProtectedRoute exact path="/material_clase/crear/:idasignacion" component={Material_claseCreate} />
                
                <ProtectedRoute exact path="/tarea/:idasignacion" component={TareaList} />
                <ProtectedRoute exact path="/tarea/:idasignacion/tarea/:id/editar" component={TareaCreate} />
                <ProtectedRoute exact path="/tarea/:idasignacion/tarea/:id/ver" component={TareaCreate} />
                <ProtectedRoute exact path="/tarea/crear/:idasignacion" component={TareaCreate} />

                <ProtectedRoute exact path="/tareaestudiante/:idasignacion" component={TareaEstuList} />
                <ProtectedRoute exact path="/tareaestudiante/:idasignacion/tarea/:id/editar" component={TareaEstuCreate} />
                <ProtectedRoute exact path="/tareaestudiante/:idasignacion/tarea/:id/ver" component={TareaCreate} />
                <ProtectedRoute exact path="/tareaestudiante/:idasignacion/tareaestudiante/crear/:idtarea" component={TareaEstuCreate} />

                <ProtectedRoute exact path="/ejemplo" component={ComponenteContainer} />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
