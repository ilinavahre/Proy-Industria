
import { Api, DataSource } from 'riza';
import { back, quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';

export const ds = new DataSource('ventas.ventas.detalles');

function onShown({ id })
{
    ds.request.set('sale_id', id);
    ds.refresh();
}

export default () => 
    <r-panel class="flex-fill" data-route="/ventas/ventas/ver/:id" onPanelShown={ onShown }>

        <h1>Detalles de Venta</h1>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th data-sort="product"><span>Producto</span></th>
                    <th data-sort="quantity"><span>Cantidad</span></th>
                    <th data-sort="subtotal"><span>Sub Total</span></th>
                    <th data-sort="taxes"><span>Impuestos</span></th>
                    <th data-sort="total"><span>Total</span></th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th><input class="input-small" type="text" data-property="filter_product" /></th>
                    <th><input class="input-small" type="text" data-property="filter_quantity" /></th>
                    <th><input class="input-small" type="text" data-property="filter_subtotal" /></th>
                    <th><input class="input-small" type="text" data-property="filter_taxes" /></th>
                    <th><input class="input-small" type="text" data-property="filter_total" /></th>
                </tr>
            </thead>

            <tbody className="x-empty">
                <tr>
                    <td colSpan="5">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>{item.subtotal}</td>
                    <td>{item.taxes}</td>
                    <td>{item.total}</td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
