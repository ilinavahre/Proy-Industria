
import UnidadesListar from './unidades/listar';
import UnidadesCrear from './unidades/crear';
import UnidadesEditar from './unidades/editar';

import ImpuestosListar from './impuestos/listar';
import ImpuestosCrear from './impuestos/crear';
import ImpuestosEditar from './impuestos/editar';

import ComprasListar from './compras/listar';
import ComprasCrear from './compras/crear';
import ComprasEditar from './compras/editar';
import ComprasActualizar from './compras/actualizar';
import ComprasVer from './compras/ver';

import BodegasListar from './bodegas/listar';
import BodegasCrear from './bodegas/crear';
import BodegasEditar from './bodegas/editar';

import ProveedoresListar from './proveedores/listar';
import ProveedoresCrear from './proveedores/crear';
import ProveedoresEditar from './proveedores/editar';

import ProductosListar from './productos/listar';
import ProductosCrear from './productos/crear';
import ProductosEditar from './productos/editar';
import ProductosCopiar from './productos/copiar';
import ProductosAjustar from './productos/ajustar';

export default () =>
    <r-panel class="flex-col flex-fill" data-route="/inventario/">

        <h1>Inventario</h1>

        <div class="tabs">
            <r-panel data-route="/inventario/productos"> <a href="#/inventario/productos/listar/">Productos en Inventario</a> </r-panel>
            <r-panel data-route="/inventario/compras"> <a href="#/inventario/compras/listar/">Ordenes de Compra</a> </r-panel>
            <r-panel data-route="/inventario/bodegas"> <a href="#/inventario/bodegas/listar/">Bodegas</a> </r-panel>
            <r-panel data-route="/inventario/proveedores"> <a href="#/inventario/proveedores/listar/">Proveedores</a> </r-panel>
            <r-panel data-route="/inventario/unidades/listar/"> <a href="#/inventario/unidades/listar/">Unidades</a> </r-panel>
            <r-panel data-route="/inventario/impuestos/listar/"> <a href="#/inventario/impuestos/listar/">Impuestos</a> </r-panel>
        </div>

        <div class="flex-fill">
            <UnidadesListar />
            <UnidadesCrear />
            <UnidadesEditar />

            <ImpuestosListar />
            <ImpuestosCrear />
            <ImpuestosEditar />

            <ComprasListar />
            <ComprasCrear />
            <ComprasEditar />
            <ComprasActualizar />
            <ComprasVer />

            <BodegasListar />
            <BodegasCrear />
            <BodegasEditar />

            <ProveedoresListar />
            <ProveedoresCrear />
            <ProveedoresEditar />

            <ProductosListar />
            <ProductosCrear />
            <ProductosEditar />
            <ProductosCopiar />
            <ProductosAjustar />

        </div>
    </r-panel>
;
