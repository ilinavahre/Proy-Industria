
import { Router } from 'riza';
import { logout } from './actions';
import { userData } from './signals';

import CuentaDetalles from './panels/cuenta-detalles';
import CuentaPassword from './panels/cuenta-password';

import EmpleadosListar from './panels/empleados/listar';
import EmpleadosCrear from './panels/empleados/crear';
import EmpleadosEditar from './panels/empleados/editar';

import Inventario from './panels/inventario/inventario';

import VentasVender from './panels/ventas/vender';
import VentasListar from './panels/ventas/listar';
import VentasVer from './panels/ventas/ver';

import ConfigDepartamentosListar from './panels/config/departamentos/listar';
import ConfigDepartamentosCrear from './panels/config/departamentos/crear';
import ConfigDepartamentosEditar from './panels/config/departamentos/editar';
import ConfigCargosListar from './panels/config/cargos/listar';
import ConfigCargosCrear from './panels/config/cargos/crear';
import ConfigCargosEditar from './panels/config/cargos/editar';

function init() {
    Router.refresh();
}

export default () =>
    <r-panel class="flex-fill flex-row" onRootReady={ init }>

        <div class="sidebar">
            <img src="img/logo-200.png" />

            <r-tabs data-base-route="/@/">
                <div>
                    <b>Recursos Humanos</b>
                    <div>
                        <a href="#/config/departamentos/listar/">Departamentos</a>
                        <a href="#/config/cargos/listar/">Cargos</a>
                        <a href="#/empleados/listar/">Empleados</a>
                    </div>
                </div>

                <div>
                    <a href="#/inventario/productos/listar/">Inventario</a>
                </div>

                <div>
                    <b>Ventas</b>
                    <div>
                        <a href="#/ventas/vender/">Realizar Venta</a>
                        <a href="#/ventas/listar/">Ventas</a>
                    </div>
                </div>

                <div>
                    <b>Mi Perfil</b>
                    <div>
                        <a href="#/cuenta/detalles/">Actualizar Datos</a>
                        <a href="#/cuenta/password/">Cambiar Contraseña</a>
                        <a href="#/logout/" onClick={ logout }>Cerrar Sesión</a>
                    </div>
                </div>

                <div>
                    <a href="#/cuenta/detalles/" style:textAlign="center">
                        <img src={ $userData.photo_url } />
                        <b>{$userData.name}</b>
                    </a>
                </div>

            </r-tabs>
        </div>

        <div className="content flex-fill flex-row">

            <CuentaDetalles/>
            <CuentaPassword/>

            <EmpleadosListar/>
            <EmpleadosCrear/>
            <EmpleadosEditar/>

            <Inventario/>

            <VentasVender/>
            <VentasListar/>
            <VentasVer/>

            <ConfigDepartamentosListar/>
            <ConfigDepartamentosCrear/>
            <ConfigDepartamentosEditar/>

            <ConfigCargosListar/>
            <ConfigCargosCrear/>
            <ConfigCargosEditar/>
 
        </div>

    </r-panel>
;