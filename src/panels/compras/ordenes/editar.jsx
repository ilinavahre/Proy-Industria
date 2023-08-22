
import { Api, signal } from 'riza';
import { back } from '../../../actions';
import { Campos, beforeSubmit, agregarProducto, ds, productos } from './crear';

let form;

function formSuccess(res) {
    back();
}

function onShown({ id })
{
    form.reset();
    productos.value = [];
    ds.refresh();

    Api.fetch('compras/ordenes/leer', { id }).then(r =>
    {
        if (r.response != 200 || !r.data.length)
            return back();

        form.model.set(r.data[0]);
        productos.value = r.data[0].data;

        Api.fetch('inventario/productos/leer-codigo', { unique: true, code: productos.value.map(i => i.code).join(',') }).then(r => {
            productos.value = productos.value.map(i => {
                let p = r.data.find(p => p.code === i.code);
                p.count = signal(i.count);
                return p;
            });
        });
    });
}

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/compras/ordenes/editar/:id" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <div className="flex-row" style:gap="2rem">
            <r-form class="form" data-form-action="compras.ordenes.guardar" onBeforeSubmit={ beforeSubmit } onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

                <input type="hidden" data-field="id" />

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
