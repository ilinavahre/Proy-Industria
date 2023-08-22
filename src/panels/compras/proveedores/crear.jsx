
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
        <label>Nombre de Proveedor</label>
        <input type="text" data-field="name" />
    </div>

    <div class="flex-row" style:gap="1.5rem">
        <div class="flex-even">
            <div className="field flex-even">
                <label>Ciudad</label>
                <input type="text" data-field="city" />
            </div>
            <div className="field flex-even">
                <label>Departamento</label>
                <input type="text" data-field="state" />
            </div>
        </div>

        <div class="flex-even">
            <div className="field">
                <label>Email Contacto</label>
                <input type="text" data-field="email" />
            </div>
            <div className="field">
                <label>Teléfono Contacto</label>
                <input type="text" data-field="phone" />
            </div>
        </div>
    </div>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/compras/proveedores/crear" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="compras.proveedores.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

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
