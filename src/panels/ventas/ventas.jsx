
import VentasPosCrear from './pos/crear';
import VentasVentasListar from './ventas/listar';
import VentasVentasVer from './ventas/ver';

export default () =>
    <r-panel class="flex-col flex-fill" data-route="/ventas/">

        <h1>Ventas</h1>

        <div class="tabs">
            <r-panel data-route="/ventas/pos"> <a href="#/ventas/pos/crear/">Punto de Ventas</a> </r-panel>
            <r-panel data-route="/ventas/ventas"> <a href="#/ventas/ventas/listar/">Registro de Ventas</a> </r-panel>
        </div>

        <div class="flex-fill">

            <VentasPosCrear />
            <VentasVentasListar />
            <VentasVentasVer />

        </div>
    </r-panel>
;
