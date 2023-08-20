
let form;

function formSuccess(res) {
    form.reset();
}

function onShown() {
    form.reset();
}

export default () => 
    <r-panel class="flex-fill" data-route="/cuenta/password/" onPanelShown={ onShown }>

        <h1>Cambiar Contraseña</h1>

        <r-form class="form" data-form-action="account.update-password" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <div className="field">
                <label>Contraseña Actual</label>
                <input type="password" data-field="cpassword" />
            </div>
            <div className="field">
                <label>Nueva Contraseña</label>
                <input type="password" data-field="npassword" />
            </div>
            <div className="field">
                <label>Repetir Nueva Contraseña</label>
                <input type="password" data-field="rpassword" />
            </div>

            <br/>
            <div className="message error"></div>
            <div className="message success"></div>

            <button class="alt" type="submit">
                Guardar
            </button>

        </r-form>

    </r-panel>
;
