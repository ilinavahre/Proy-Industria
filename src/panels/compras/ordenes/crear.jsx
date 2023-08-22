
import { DataSource, signal } from 'riza';
import { back } from '../../../actions';
import { ds as dsProveedores } from '../proveedores/listar';
import { ds as dsBodegas } from '../../inventario/bodegas/listar';

export const ds = new DataSource('inventario.productos', { request: { unique: true } });
export const productos = signal([]);
let form;

function formSuccess(res) {
    back();
}

function onShown() {
    form.reset();
    productos.value = [];
    ds.refresh();
}

export function agregarProducto (codigo) {
    let item = ds.list.getData().find(p => p.get('code') == codigo);
    if (!item) return;

    let i = productos.value.find(p => p.code == codigo);
    if (i) return;

    productos.value.push({ ...item.get(), count: signal(0) });
    productos.notify();
}

export function beforeSubmit (data) {
    data.data = JSON.stringify(productos.value.map(p => ({ code: p.code, count: ~~p.count.value })));
}

// *********************************************
export const Campos = () => 
<div>

    <div className="field">
        <label>Proveedor</label>
        <r-select dataList={ dsProveedores.enum } data-blank="(Seleccionar ...)" data-field="supplier_id" />
    </div>

    <div className="field">
        <label>Bodega Destino</label>
        <r-select dataList={ dsBodegas.enum } data-blank="(Seleccionar ...)" data-field="warehouse_id" />
    </div>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/compras/ordenes/crear" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <div className="flex-row" style:gap="2rem">
            <r-form class="form" data-form-action="compras.ordenes.crear" onBeforeSubmit={ beforeSubmit } onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

                <Campos />
                <br/>

                <table>
                    <thead>
                        <tr>
                            <th style:width="7rem"><span>Código</span></th>
                            <th><span>Nombre</span></th>
                            <th style:width="8rem"><span>Cantidad</span></th>
                            <th width="3rem"></th>
                        </tr>
                    </thead>

                    <tbody>
                        { $productos.map((item) =>
                            <tr>
                                <td>{item.code}</td>
                                <td>
                                    <img class="profile-pic-tiny alt-1" src={item.photo_url} />
                                    <span style:marginLeft="0.2rem" style:verticalAlign="middle">{item.name}</span>
                                </td>
                                <td>
                                    <input class="input-small" type="number" trait:valueSignal={item.count} />
                                </td>
                                <td>
                                    <span class="btn-1 btn-red" onClick={ () => {
                                        let i = productos.value.findIndex(p => p.code === item.code);
                                        if (i >= 0) productos.value.splice(i, 1);
                                        productos.notify();
                                    } }>
                                        <i class="fa-solid fa-trash-can"></i>
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <br/>

                <div className="message error"></div>
                <div className="message success"></div>

                <button class="alt" type="submit">
                    Crear Orden de Compra
                </button>

            </r-form>

            <div>
                <div class="form">
                    <r-table dataSource={ ds }>
                    <table>
                        <thead>
                            <tr>
                                <th style:width="7rem"><span>Código</span></th>
                                <th><span>Nombre</span></th>
                            </tr>
                        </thead>

                        <thead>
                            <tr>
                                <th><input class="input-small" type="text" data-property="filter_code" /></th>
                                <th><input class="input-small" type="text" data-property="filter_name" /></th>
                            </tr>
                        </thead>

                        <tbody className="x-empty">
                            <tr>
                                <td colSpan="2">No hay registros que mostrar.</td>
                            </tr>
                        </tbody>

                        <tbody class="x-data" content={ (item) =>
                            <tr onClick={ () => agregarProducto(item.code) }>
                                <td>{item.code}</td>
                                <td>
                                    <img class="profile-pic-tiny alt-1" src={item.photo_url} />
                                    <span style:marginLeft="0.2rem" style:verticalAlign="middle">{item.name}</span>
                                </td>
                            </tr>
                        }>
                        </tbody>
                    </table>
                    </r-table>
                </div>
            </div>
        </div>

   </r-panel>
;
