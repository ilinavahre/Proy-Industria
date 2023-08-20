
import { checkAuth } from './actions';

export default () =>
    <div class="flex-fill flex-row flex-justify-center flex-items-center">

        <div class="flex-static flex-middle" style:paddingBottom="5rem">
            <r-form data-form-action="auth.initial" style:width="24rem" onFormSuccess={ checkAuth }>

                <div style:textAlign="center">
                    <img src="img/logo-200.png" style:marginLeft="25px" />
                    <div style:marginTop="1rem" style:fontWeight="900" style:fontSize="1.2rem">
                        Configuración Inicial
                    </div>
                </div>

                <br/>
                <p>
                    A continuación escriba la nueva contraseña del usuario <b>admin</b> para poder iniciar sesión.
                </p>
                <br/>

                <div class="field">
                    <label>Nueva Contraseña</label>
                    <input type="password" data-field="npassword" />
                </div>

                <div class="field">
                    <label>Repetir Contraseña</label>
                    <input type="password" data-field="rpassword" />
                </div>

                <br/>

                <button type="submit">
                    Cambiar Contraseña
                </button>
            </r-form>
        </div>

    </div>
;