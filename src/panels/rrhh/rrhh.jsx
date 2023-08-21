
import EmpleadosListar from './empleados/listar';
import EmpleadosCrear from './empleados/crear';
import EmpleadosEditar from './empleados/editar';

import DepartamentosListar from './departamentos/listar';
import DepartamentosCrear from './departamentos/crear';
import DepartamentosEditar from './departamentos/editar';

import CargosListar from './cargos/listar';
import CargosCrear from './cargos/crear';
import CargosEditar from './cargos/editar';

export default () =>
    <r-panel class="flex-col flex-fill" data-route="/rrhh/">

        <h1>Recursos Humanos</h1>

        <div class="tabs">
            <r-panel data-route="/rrhh/empleados"> <a href="#/rrhh/empleados/listar/">Empleados</a> </r-panel>
            <r-panel data-route="/rrhh/departamentos"> <a href="#/rrhh/departamentos/listar/">Departamentos</a> </r-panel>
            <r-panel data-route="/rrhh/cargos"> <a href="#/rrhh/cargos/listar/">Cargos</a> </r-panel>
        </div>

        <div class="flex-fill">

            <EmpleadosListar/>
            <EmpleadosCrear/>
            <EmpleadosEditar/>

            <DepartamentosListar/>
            <DepartamentosCrear/>
            <DepartamentosEditar/>

            <CargosListar/>
            <CargosCrear/>
            <CargosEditar/>

        </div>
    </r-panel>
;
