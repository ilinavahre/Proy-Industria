import { userData } from '../signals';

let form;

function formSuccess(res) {
    userData.set(res.data);
}

function onShown() {
    form.model.set(userData.get());
}

export default () => 
    <r-panel class="flex-fill" data-route="/cuenta/detalles/" onPanelShown={ onShown }>

        <h1>Actualizar Datos</h1>

        <r-form class="form" data-form-action="account.update-details" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <div style:textAlign="center">
                <img class="profile-pic" src={ $userData.photo_url }/>
            </div>

            <div className="field">
                <label>Usuario</label>
                <input type="text" data-field="username" disabled />
            </div>
            <div className="field">
                <label>Dirección de Email</label>
                <input type="text" data-field="email" />
            </div>
            <div className="field">
                <label>Nombre Completo</label>
                <input type="text" data-field="name" />
            </div>
            <div className="field">
                <label>Foto de Perfil</label>
                <input type="file" data-field="photo" />
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
