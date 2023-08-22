
import { Api, DataSource, watch } from 'riza';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';
import { authStatus } from '../../../signals';

export const ds = new DataSource('compras.proveedores', { includeEnum: true });

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

    Api.fetch('compras/proveedores/borrar', { id }).then(r => {
        if (r.response != 200) return alert(r.error);
        ds.refresh();
    });
}

export default () => 
    <r-panel class="flex-fill" data-route="/compras/proveedores/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1" href="#/compras/proveedores/crear/"><i class="fa-solid fa-plus"></i> Registrar Proveedor</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="3rem" data-sort="id"><span>ID</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creada</span></th>
                    <th data-sort="instance"><span>Instancia</span></th>
                    <th data-sort="name"><span>Nombre</span></th>
                    <th data-sort="city"><span>Ciudad</span></th>
                    <th data-sort="state"><span>Departamento</span></th>
                    <th data-sort="email"><span>Email</span></th>
                    <th data-sort="phone"><span>Teléfono</span></th>
                    <th style:width="5rem"></th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th><input class="input-small" type="text" data-property="filter_id" /></th>
                    <th><input class="input-small" type="date" data-property="filter_created" /></th>
                    <th><input class="input-small" type="date" data-property="filter_instance" /></th>
                    <th><input class="input-small" type="text" data-property="filter_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_city" /></th>
                    <th><input class="input-small" type="text" data-property="filter_state" /></th>
                    <th><input class="input-small" type="text" data-property="filter_email" /></th>
                    <th><input class="input-small" type="text" data-property="filter_phone" /></th>
                    <th style:textAlign="center">
                        <span class="btn" onClick={ quitarFiltros }>
                            <i class="fa-solid fa-filter-circle-xmark"></i>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody className="x-empty">
                <tr>
                    <td colSpan="9">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.s_created}</td>
                    <td>{item.instance}</td>
                    <td>{item.name}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" href={"#/compras/proveedores/editar/"+item.id}><i class="fa-regular fa-pen-to-square"></i></a>
                        <span class="btn-1 btn-red" onClick={ () => borrar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
