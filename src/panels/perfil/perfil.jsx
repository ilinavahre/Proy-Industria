
import Detalles from './cuenta/detalles';
import Password from './cuenta/password';

export default () =>
    <r-panel class="flex-col flex-fill" data-route="/perfil/">

        <h1>Mi Perfil</h1>

        <div class="tabs">
            <r-panel data-route="/perfil/cuenta/detalles"> <a href="#/perfil/cuenta/detalles/">Actualizar Datos</a> </r-panel>
            <r-panel data-route="/perfil/cuenta/password"> <a href="#/perfil/cuenta/password/">Cambiar Contraseña</a> </r-panel>
        </div>

        <div class="flex-fill">

            <Detalles/>
            <Password/>

        </div>
    </r-panel>
;
