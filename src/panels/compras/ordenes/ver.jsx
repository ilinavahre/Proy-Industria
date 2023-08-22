
import { Api } from 'riza';
import { back } from '../../../actions';
import { ds, productos } from './crear';

let form;

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
                p.count = i.count;
                return p;
            });
        });
    });
}

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/compras/ordenes/ver/:id" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <div className="flex-row" style:gap="2rem">
            <r-form class="form" onCreated={ f=>form=f }>

                <input type="hidden" data-field="id" />

                <div className="field">
                    <label>Proveedor</label>
                    <input type="text" data-field="supplier" disabled />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th style:width="7rem"><span>Código</span></th>
                            <th><span>Nombre</span></th>
                            <th style:width="8rem"><span>Cantidad</span></th>
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
                                    {item.count}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </r-form>

        </div>

   </r-panel>
;
