
import { checkAuth } from './actions';

export default () =>
    <r-panel class="flex-fill flex-row flex-justify-center flex-items-center">

        <div class="flex-static flex-middle" style:paddingBottom="5rem">

            <r-form data-form-action="auth.login" style:width="24rem" onFormSuccess={ checkAuth }>

                <div style:textAlign="center">
                    <img src="img/logo-200.png" style:marginLeft="25px" />
                    <div style:marginTop="1rem" style:fontWeight="900" style:fontSize="1.2rem">Grand Super ERP</div>
                </div>

                <br/><br/>

                <div class="field">
                    <label>Nombre de Usuario</label>
                    <input type="text" data-field="username" autocomplete="off" />
                </div>

                <div class="field">
                    <label>Contraseña</label>
                    <input type="password" data-field="password" />
                </div>

                <br/>
                <div className="message error"></div>

                <button type="submit">
                    Iniciar Sesión
                </button>
            </r-form>

        </div>

    </r-panel>
;