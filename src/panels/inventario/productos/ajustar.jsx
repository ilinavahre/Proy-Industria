
import { ModelList, Api, signal, watch } from 'riza';
import { back } from '../../../actions';
import { ds as dsBodegas } from './../bodegas/listar';
import { ds as dsProductos } from './../productos/listar';

const enumProductos = new ModelList();
let form;

function formSuccess(res) {
    back();
}

function onShown() {
    form.reset();

    if (form.initialized) return;
    form.initialized = true;

    form.model.observe('warehouse_id', (evt, args) => {
        enumProductos.setData(dsProductos.enum.getData()
            .filter(x => x.get('warehouse_id') == args.value)
            .map(x => ({ value: x.get('id'), label: x.get('code') + ' - ' + x.get('name') }))
        );
    });

    form.model.observe('id', (evt, args) => {
        Api.fetch('inventario/productos/leer', { id: args.value }).then(r => {
            if (r.response != 200) return;
            form.model.set('initial', r.data[0].quantity);
        });
    });

    form.model.observe('delta', (evt, args) => {
        form.model.set('final', (form.model.getInt('initial') || 0) + ~~args.value);
    });
}

// *********************************************
export const Campos = () => 
<div>

    <input type="hidden" data-field="id" />

    <div className="field">
        <label>Bodega</label>
        <r-select dataList={ dsBodegas.enum } data-blank="(Seleccionar ...)" data-field="warehouse_id"></r-select>
    </div>

    <div className="field flex-even">
        <label>Producto</label>
        <r-select dataList={ enumProductos } data-blank="(Seleccionar ...)" data-field="id"></r-select>
    </div>

    <div className="field">
        <label>Unidades Actuales</label>
        <input type="text" data-field="initial" disabled />
    </div>

    <div className="field">
        <label>Valor del Ajuste</label>
        <input type="text" data-field="delta" />
    </div>

    <div className="field">
        <label>Unidades Finales</label>
        <input type="text" data-field="final" disabled />
    </div>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/inventario/productos/ajustar/" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="inventario.productos.ajustar" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <Campos />

            <br/>
            <div className="message error"></div>
            <div className="message success"></div>

            <button class="alt" type="submit">
                Aplicar Ajuste
            </button>

        </r-form>

    </r-panel>
;
