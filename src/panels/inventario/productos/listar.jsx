
import { Api, DataSource, watch } from 'riza';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';
import { authStatus } from '../../../signals';

export const ds = new DataSource('inventario.productos', { includeEnum: true });

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

    Api.fetch('inventario/productos/borrar', { id }).then(r => {
        if (r.response != 200) return alert(r.error);
        ds.refresh();
    });
}

export default () => 
    <r-panel class="flex-fill" data-route="/inventario/productos/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1 btn-br" href="#/inventario/productos/crear/"><i class="fa-solid fa-plus"></i> Registrar Producto</a>
            <a class="btn alt-2" href="#/inventario/productos/ajustar/"><i class="fa-solid fa-right-left"></i> Ajuste de Inventario</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="3rem" data-sort="id"><span>ID</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creado</span></th>
                    <th data-sort="instance"><span>Instancia</span></th>
                    <th style:width="8rem" data-sort="code"><span>Código</span></th>
                    <th data-sort="warehouse"><span>Bodega</span></th>
                    <th data-sort="name"><span>Nombre</span></th>
                    <th data-sort="cost" style:width="8rem"><span>Costo</span></th>
                    <th data-sort="price" style:width="8rem"><span>Precio</span></th>
                    <th data-sort="tax"><span>Impuesto</span></th>
                    <th data-sort="unit"><span>Unidad</span></th>
                    <th data-sort="quantity" style:width="8rem"><span>Existencias</span></th>
                    <th style:width="8rem"></th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th><input class="input-small" type="text" data-property="filter_id" /></th>
                    <th><input class="input-small" type="date" data-property="filter_created" /></th>
                    <th><input class="input-small" type="date" data-property="filter_instance" /></th>
                    <th><input class="input-small" type="text" data-property="filter_code" /></th>
                    <th><input class="input-small" type="text" data-property="filter_warehouse" /></th>
                    <th><input class="input-small" type="text" data-property="filter_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_cost" /></th>
                    <th><input class="input-small" type="text" data-property="filter_price" /></th>
                    <th><input class="input-small" type="text" data-property="filter_tax" /></th>
                    <th><input class="input-small" type="text" data-property="filter_unit" /></th>
                    <th><input class="input-small" type="text" data-property="filter_quantity" /></th>
                    <th style:textAlign="center">
                        <span class="btn" onClick={ quitarFiltros }>
                            <i class="fa-solid fa-filter-circle-xmark"></i>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody className="x-empty">
                <tr>
                    <td colSpan="12">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.s_created}</td>
                    <td>{item.instance}</td>
                    <td>{item.code}</td>
                    <td>{item.warehouse}</td>
                    <td>
                        { !item.is_visible ? <i class="fa-regular fa-eye-slash"></i> : '' }
                        <img class="profile-pic-tiny alt-1" src={item.photo_url}/>
                        <span style:marginLeft="0.2rem" style:verticalAlign="middle">{item.name}</span>
                    </td>
                    <td>{item.cost}</td>
                    <td>{item.price}</td>
                    <td>{item.tax}</td>
                    <td>{item.unit}</td>
                    <td>{item.quantity}</td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" href={"#/inventario/productos/editar/"+item.id}><i class="fa-regular fa-pen-to-square"></i></a>
                        <a class="btn-1 btn-gray" href={"#/inventario/productos/copiar/"+item.id}><i class="fa-regular fa-copy"></i></a>
                        <span class="btn-1 btn-red" onClick={ () => borrar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
