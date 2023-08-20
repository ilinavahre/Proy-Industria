
import { Api } from 'riza';
import { back } from '../../../actions';
import { Campos } from './crear';

let form;

function formSuccess(res) {
    back();
}

function onShown({ id })
{
    form.reset();

    Api.fetch('inventario/bodegas/leer', { id }).then(r =>
    {
        if (r.response != 200 || !r.data.length)
            return back();

        form.model.set(r.data[0]);
    });
}

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/inventario/bodegas/editar/:id" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="inventario.bodegas.guardar" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <input type="hidden" data-field="id"/>

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
