
import { back } from '../../../actions';
import { ds as dsUnidades } from './../unidades/listar';
import { ds as dsImpuestos } from './../impuestos/listar';
import { ds as dsBodegas } from './../bodegas/listar';

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
        <label>Bodega</label>
        <r-select dataList={ dsBodegas.enum } data-blank="(Seleccionar ...)" data-field="warehouse_id"></r-select>
    </div>

    <div className="field">
        <label>Nombre de Producto</label>
        <input type="text" data-field="name" />
    </div>

    <div className="flex-row" style:gap="1rem">
        <div className="field flex-even">
            <label>Código de Producto</label>
            <input type="text" data-field="code" />
        </div>
        <div className="field flex-even">
            <label>Impuesto</label>
            <r-select dataList={ dsImpuestos.enum } data-blank="Ninguno" data-field="tax_id"></r-select>
        </div>
    </div>

    <div class="flex-row" style:gap="1rem">
        <div className="field flex-even">
            <label>Precio por Unidad</label>
            <input type="text" data-field="price" />
        </div>
        <div className="field flex-even">
            <label>Costo por Unidad</label>
            <input type="text" data-field="cost" />
        </div>
        <div className="field flex-even">
            <label>Unidad</label>
            <r-select dataList={ dsUnidades.enum } data-blank="(Seleccionar ...)" data-field="unit_id"></r-select>
        </div>
    </div>

    <div className="field">
        <label>Unidades en Existencia</label>
        <input type="text" data-field="quantity" />
    </div>

    <div className="field">
        <label>Foto de Producto</label>
        <input type="file" data-field="photo" />
    </div>

    <label class="checkbox">
        <input type="checkbox" data-field="is_visible" data-default="1" />
        <span>Visible al Público</span>
    </label>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/inventario/productos/crear/" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="inventario.productos.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <Campos />

            <br/>
            <div className="message error"></div>
            <div className="message success"></div>

            <button class="alt" type="submit">
                Crear Registro
            </button>

        </r-form>

    </r-panel>
;
