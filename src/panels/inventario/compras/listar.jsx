
import { Api, DataSource, watch } from 'riza';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';
import { authStatus } from '../../../signals';

export const ds = new DataSource('inventario.compras', { includeEnum: true });

export const enumEstado = [
    'Pendiente',
    'Procesada',
    'Cancelada',
    'Recibida',
    'Completada'
];

watch([authStatus], (val) =>
{
    if (val !== authStatus.AUTH)
        return;

    ds.refresh('enum');
});

function onShown() {
    ds.refresh();
}

function borrar(id)
{
    if (!confirm('Esta seguro de borrar este registro?'))
        return;

    Api.fetch('inventario/compras/borrar', { id }).then(r => {
        if (r.response != 200) return alert(r.error);
        ds.refresh();
    });
}

export default () => 
    <r-panel class="flex-fill" data-route="/inventario/compras/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1" href="#/inventario/compras/crear/"><i class="fa-solid fa-plus"></i> Crear Orden de Compra</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="8rem" data-sort="id"><span>No. de Orden</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creada</span></th>
                    <th style:width="8rem" data-sort="status"><span>Status</span></th>
                    <th data-sort="supplier"><span>Proveedores</span></th>
                    <th><span>Número de Productos</span></th>
                    <th style:width="8rem"></th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th><input class="input-small" type="text" data-property="filter_id" /></th>
                    <th><input class="input-small" type="date" data-property="filter_created" /></th>
                    <th>
                        <select class="input-small" data-property="filter_status">
                            <option value="">(Todos)</option>
                            { enumEstado.map((v, i) => <option value={i}>{v}</option>) }
                        </select>
                    </th>
                    <th><input class="input-small" type="text" data-property="filter_supplier" /></th>
                    <th></th>
                    <th style:textAlign="center">
                        <span class="btn" onClick={ quitarFiltros }>
                            <i class="fa-solid fa-filter-circle-xmark"></i>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody className="x-empty">
                <tr>
                    <td colSpan="6">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.s_created}</td>
                    <td>{enumEstado[item.status]}</td>
                    <td>{item.supplier}</td>
                    <td>{item.count}</td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" class:xx-hidden={ item.status != 0 } href={"#/inventario/compras/editar/"+item.id}><i class="fa-regular fa-pen-to-square"></i></a>
                        <a class="btn-1 btn-blue" href={"#/inventario/compras/ver/"+item.id}><i class="fa-regular fa-eye"></i></a>
                        <a class="btn-1 btn-gray" class:xx-hidden={ item.status == 2 || item.status == 4 } href={"#/inventario/compras/actualizar/"+item.id}><i class="fa-solid fa-arrow-right-arrow-left"></i></a>
                        <span class="btn-1 btn-red" class:xx-hidden={ item.status != 0 } onClick={ () => borrar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
