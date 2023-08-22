
import { Api, signal } from 'riza';
import { back } from '../../../actions';
import { enumEstado } from '../ordenes/listar';

let form;

function formSuccess(res) {
    back();
}

function onShown({ id })
{
    form.reset();

    Api.fetch('compras/ordenes/leer', { id }).then(r =>
    {
        if (r.response != 200 || !r.data.length)
            return back();

        form.model.set(r.data[0]);
        form.model.set('curr_status', enumEstado[r.data[0].status]);
        form.model.set('status', '');
    });
}

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/compras/ordenes/actualizar/:id" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="compras.ordenes.actualizar" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <input type="hidden" data-field="id" />

            <div className="field">
                <label>Estado Actual</label>
                <input type="text" data-field="curr_status" disabled />
            </div>

            <div className="field">
                <label>Nuevo Estado</label>
                <select class="input-small" data-field="status">
                    <option value="">(Seleccionar ...)</option>
                    { enumEstado.map((v, i) => <option value={i}>{v}</option>) }
                </select>
            </div>

            <br/>

            <div className="message error"></div>
            <div className="message success"></div>

            <button class="alt" type="submit">
                Actualizar Estado
            </button>

        </r-form>

   </r-panel>
;
