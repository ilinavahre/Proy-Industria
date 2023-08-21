
import { Router } from 'riza';
import { logout } from './actions';
import { userData } from './signals';

import CuentaDetalles from './panels/cuenta-detalles';
import CuentaPassword from './panels/cuenta-password';

import Inventario from './panels/inventario/inventario';
import RecursosHumanos from './panels/rrhh/rrhh';

import VentasVender from './panels/ventas/vender';
import VentasListar from './panels/ventas/listar';
import VentasVer from './panels/ventas/ver';

function init() {
    Router.refresh();
}

export default () =>
    <r-panel class="flex-fill flex-row" onRootReady={ init }>

        <div class="sidebar">
            <img src="img/logo-200.png" />

            <r-tabs data-base-route="/@/">
                <div>
                    <a href="#/rrhh/empleados/listar/">Recursos Humanos</a>
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

            <RecursosHumanos/>
            <Inventario/>

            <VentasVender/>
            <VentasListar/>
            <VentasVer/>

        </div>

    </r-panel>
;