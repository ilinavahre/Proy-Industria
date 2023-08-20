
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
        <label>Nombre de Impuesto</label>
        <input type="text" data-field="name" />
    </div>
    <div className="field">
        <label>Porcentaje</label>
        <input type="text" data-field="value" />
    </div>

    <label class="checkbox">
        <input type="checkbox" data-field="is_visible" data-default="1" />
        <span>Visible</span>
    </label>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/inventario/impuestos/crear" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="inventario.impuestos.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

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
