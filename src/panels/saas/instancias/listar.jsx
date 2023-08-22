
import { Api, DataSource, watch } from 'riza';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';
import { authStatus } from '../../../signals';

export const ds = new DataSource('saas.instancias');

watch([authStatus], (val) =>
{
    if (val !== authStatus.AUTH)
        return;
});

function onShown() {
    ds.refresh();
}

function borrar(id)
{
    if (!confirm('Esta seguro de borrar este registro?'))
        return;

    Api.fetch('saas/instancias/borrar', { id }).then(r => {
        if (r.response != 200) return alert(r.error);
        ds.refresh();
    });
}

export default () => 
    <r-panel class="flex-fill" data-route="/saas/instancias/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1" href="#/saas/instancias/crear/"><i class="fa-solid fa-plus"></i> Crear Instancia</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="3rem" data-sort="id"><span>ID</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creada</span></th>
                    <th style:width="11rem" data-sort="status"><span>Estado</span></th>
                    <th data-sort="name"><span>Nombre de Instancia</span></th>
                    <th data-sort="company_name"><span>Empresa</span></th>
                    <th data-sort="admin_username"><span>Usuario</span></th>
                    <th><span>Logotipo</span></th>
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
                            <option value="0">Pendiente</option>
                            <option value="1">Activa</option>
                            <option value="2">Bloqueada</option>
                            <option value="3">Cancelada</option>
                        </select>
                    </th>
                    <th><input class="input-small" type="text" data-property="filter_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_company_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_admin_username" /></th>
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
                    <td colSpan="8">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.s_created}</td>
                    <td>{item.s_status}</td>
                    <td>{item.name}</td>
                    <td>{item.company_name}</td>
                    <td>{item.admin_username}</td>
                    <td>
                        <img src={item.company_logo_url} style:width="12rem" />
                    </td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" href={"#/saas/instancias/editar/"+item.id}><i class="fa-regular fa-pen-to-square"></i></a>
                        <a class="btn-1 btn-gray" href={"#/saas/instancias/actualizar/"+item.id}><i class="fa-solid fa-arrow-right-arrow-left"></i></a>
                        <span class="btn-1 btn-red" onClick={ () => borrar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
