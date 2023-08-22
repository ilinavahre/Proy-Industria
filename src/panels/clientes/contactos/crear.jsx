
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

    <div class="flex-row" style:gap="1.5rem">
        <div className="field flex-even">
            <label>Primer Nombre</label>
            <input type="text" data-field="first_name" />
        </div>
        <div className="field flex-even">
            <label>Segundo Nombre</label>
            <input type="text" data-field="middle_name" />
        </div>
        <div className="field flex-even">
            <label>Apellido</label>
            <input type="text" data-field="last_name" />
        </div>
    </div>

    <div class="flex-row" style:gap="1.5rem">
        <div className="field flex-even">
            <label>Fecha de Nacimiento</label>
            <input type="date" data-field="birthdate" />
        </div>
        <div className="field flex-even">
            <label>Género</label>
            <select data-field="gender">
                <option value=""></option>
                <option value="M">M - Masculino</option>
                <option value="F">F - Femenino</option>
                <option value="X">X - No Especificado</option>
            </select>
        </div>
    </div>

    <div class="flex-row" style:gap="1.5rem">
        <div className="field flex-even">
            <label>Departamento</label>
            <input type="text" data-field="state" />
        </div>
        <div className="field flex-even">
            <label>Ciudad</label>
            <input type="text" data-field="city" />
        </div>
    </div>

    <div class="flex-row" style:gap="1.5rem">
        <div className="field flex-even">
            <label>Dirección</label>
            <input type="text" data-field="address1" />
        </div>
        <div className="field flex-even">
            <label>&nbsp;</label>
            <input type="text" data-field="address2" />
        </div>
    </div>

    <div class="flex-row" style:gap="1.5rem">
        <div className="field flex-even">
            <label>Email</label>
            <input type="text" data-field="email" />
        </div>
        <div className="field flex-even">
            <label>Teléfono</label>
            <input type="text" data-field="phone" />
        </div>
    </div>

    <br/>

    <div class="flex-row" style:gap="1.5rem">
        <label class="checkbox">
            <input type="checkbox" data-field="can_email" data-default="1" />
            <span>E-Mails</span>
        </label>
        <label class="checkbox">
            <input type="checkbox" data-field="can_call" data-default="1" />
            <span>Llamadas</span>
        </label>
        <label class="checkbox">
            <input type="checkbox" data-field="can_sms" data-default="1" />
            <span>SMS</span>
        </label>
        <label class="checkbox">
            <input type="checkbox" data-field="can_whatsapp" data-default="1" />
            <span>Whatsapp</span>
        </label>
        <label class="checkbox">
            <input type="checkbox" data-field="can_telegram" data-default="1" />
            <span>Telegram</span>
        </label>
    </div>

    <br/>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/clientes/contactos/crear" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="clientes.contactos.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <Campos />

            <br/>

            <div className="message error"></div>
            <div className="message success"></div>

            <button class="alt" type="submit">
                Guardar Registro
           </button>

       </r-form>

   </r-panel>
;
