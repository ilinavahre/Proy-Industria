
import { back } from '../../../actions';

let form;

function formSuccess(res) {
    back();
}

function onShown() {
    form.reset();
}

// *********************************************
export const Campos = () => 
<div>

    <div className="field">
        <label>Nombre de Instancia</label>
        <input type="text" data-field="name" />
    </div>

    <div className="field">
        <label>Nombre de Empresa</label>
        <input type="text" data-field="company_name" />
    </div>

    <div className="field">
        <label>Logotipo de Empresa</label>
        <input type="file" data-field="company_logo" />
    </div>

    <div class="flex-row" style:gap="1rem">
        <div className="field flex-even">
            <label>Usuario Administrador</label>
            <input type="text" data-field="admin_username" />
        </div>
        <div className="field flex-even">
            <label>Contraseña</label>
            <input type="password" data-field="admin_password" />
        </div>
    </div>

    <div className="field">
        <label>Estado de Instancia</label>
        <select data-field="status">
            <option value="">(Seleccionar ...)</option>
            <option value="0">Pendiente</option>
            <option value="1">Activa</option>
            <option value="2">Bloqueada</option>
            <option value="3">Cancelada</option>
        </select>
    </div>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/saas/instancias/crear" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="saas.instancias.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <Campos />

            <br/>

            <div className="message error"></div>
            <div className="message success"></div>

            <button class="alt" type="submit">
                Crear Instancia
           </button>

       </r-form>

   </r-panel>
;
