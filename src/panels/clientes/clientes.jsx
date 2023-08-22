
import ContactosListar from './contactos/listar';
import ContactosCrear from './contactos/crear';
import ContactosEditar from './contactos/editar';

export default () =>
    <r-panel class="flex-col flex-fill" data-route="/clientes/" data-priv="clientes">

        <h1>Clientes</h1>

        <div class="tabs">
            <r-panel data-route="/clientes/contactos"> <a href="#/clientes/contactos/listar/">Contactos</a> </r-panel>
        </div>

        <div class="flex-fill">

            <ContactosListar />
            <ContactosCrear />
            <ContactosEditar />

        </div>
    </r-panel>
;
