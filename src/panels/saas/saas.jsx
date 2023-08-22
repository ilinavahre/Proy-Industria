
import InstanciasListar from './instancias/listar';
import InstanciasCrear from './instancias/crear';
import InstanciasEditar from './instancias/editar';

export default () =>
    <r-panel class="flex-col flex-fill" data-route="/saas/" data-priv="super">

        <h1>SaaS</h1>

        <div class="tabs">
            <r-panel data-route="/saas/instancias"> <a href="#/saas/instancias/listar/">Instancias</a> </r-panel>
        </div>

        <div class="flex-fill">

            <InstanciasListar />
            <InstanciasCrear />
            <InstanciasEditar />

        </div>
    </r-panel>
;
