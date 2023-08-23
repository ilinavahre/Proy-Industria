
import { Api, DataSource, signal } from 'riza';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';

export const ds = new DataSource('ventas.ventas');
export const enumVendedores = new signal([]);

function onShown() {
    ds.refresh();
    
    Api.fetch('ventas.ventas.vendedores').then(r => {
        enumVendedores.set(r.data);
    });
}

function cancelar(id)
{
    if (!confirm('Esta seguro de cancelar esta venta?'))
        return;

    Api.fetch('ventas/ventas/cancelar', { id }).then(r => {
        ds.refresh();
    });
}

export default () => 
    <r-panel class="flex-fill" data-route="/ventas/ventas/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="8rem" data-sort="id"><span>Factura</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creada</span></th>
                    <th data-sort="instance"><span>Instancia</span></th>
                    <th data-sort="created_by"><span>Creada Por</span></th>
                    <th data-sort="warehouse"><span>Bodega</span></th>
                    <th style:width="12rem" data-sort="status"><span>Estado</span></th>
                    <th data-sort="count"><span>No. Productos</span></th>
                    <th data-sort="subtotal"><span>Sub Total</span></th>
                    <th data-sort="taxes"><span>Impuestos</span></th>
                    <th data-sort="total"><span>Total</span></th>
                    <th style:width="5rem"></th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th><input class="input-small" type="text" data-property="filter_id" /></th>
                    <th><input class="input-small" type="date" data-property="filter_created" /></th>
                    <th><input class="input-small" type="text" data-property="filter_instance" /></th>
                    <th><input class="input-small" type="text" data-property="filter_created_by" /></th>
                    <th><input class="input-small" type="text" data-property="filter_warehouse" /></th>
                    <th>
                        <select class="input-small" data-property="filter_status">
                            <option value="">(Todos)</option>
                            <option value="0">Procesada</option>
                            <option value="1">Cancelada</option>
                        </select>
                    </th>
                    <th></th>
                    <th><input class="input-small" type="text" data-property="filter_subtotal" /></th>
                    <th><input class="input-small" type="text" data-property="filter_taxes" /></th>
                    <th><input class="input-small" type="text" data-property="filter_total" /></th>
                    <th style:textAlign="center">
                        <span class="btn" onClick={ quitarFiltros }>
                            <i class="fa-solid fa-filter-circle-xmark"></i>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody className="x-empty">
                <tr>
                    <td colSpan="11">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.s_created}</td>
                    <td>{item.instance}</td>
                    <td>
                        <span onClick={ (evt) => {
                                let el = <select onChange={ (evt) => Api.fetch('x', { id: item.id, created_by: evt.currentTarget.value }).then( onShown ) }>
                                    {$enumVendedores.map((v) => <option value={v.id}>{v.label}</option>)}
                                </select>;
                                evt.currentTarget.parentElement.append(el);
                            } }>
                                {item.created_by}
                        </span>
                    </td>
                    <td>{item.warehouse}</td>
                    <td>
                        {item.cancelled_by ? <span style:color="#800">Cancelada</span> : <span style:color="#080">Procesada</span>}
                    </td>
                    <td>{item.count}</td>
                    <td>{item.subtotal}</td>
                    <td>{item.taxes}</td>
                    <td>{item.total}</td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" href={"#/ventas/ventas/ver/"+item.id}><i class="fa-solid fa-list"></i></a>
                        <span class="btn-1 btn-red" class:xx-hidden={ !!item.cancelled_by } onClick={ () => cancelar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
