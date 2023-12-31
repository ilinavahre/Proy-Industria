
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
        <label>Nombre de Unidad</label>
        <input type="text" data-field="name" />
    </div>
    <div className="field">
        <label>Abreviatura</label>
        <input type="text" data-field="short" />
    </div>

    <label class="checkbox">
        <input type="checkbox" data-field="is_visible" data-default="1" />
        <span>Visible</span>
    </label>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/inventario/unidades/crear" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="inventario.unidades.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

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
