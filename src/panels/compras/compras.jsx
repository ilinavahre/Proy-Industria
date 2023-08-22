
import OrdenesListar from './ordenes/listar';
import OrdenesCrear from './ordenes/crear';
import OrdenesEditar from './ordenes/editar';
import OrdenesActualizar from './ordenes/actualizar';
import OrdenesVer from './ordenes/ver';

import ProveedoresListar from './proveedores/listar';
import ProveedoresCrear from './proveedores/crear';
import ProveedoresEditar from './proveedores/editar';

export default () =>
    <r-panel class="flex-col flex-fill" data-route="/compras/" data-priv="compras|proveedores">

        <h1>Compras</h1>

        <div class="tabs">
            <r-panel data-priv="compras" data-route="/compras/ordenes"> <a href="#/compras/ordenes/listar/">Ordenes de Compra</a> </r-panel>
            <r-panel data-priv="proveedores" data-route="/compras/proveedores"> <a href="#/compras/proveedores/listar/">Proveedores</a> </r-panel>
        </div>

        <div class="flex-fill">

            <OrdenesListar />
            <OrdenesCrear />
            <OrdenesEditar />
            <OrdenesActualizar />
            <OrdenesVer />

            <ProveedoresListar />
            <ProveedoresCrear />
            <ProveedoresEditar />

        </div>
    </r-panel>
;
