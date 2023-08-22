
import { Api, DataSource, DataList, watch, signal } from 'riza';
import { authStatus } from '../../../signals';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';

const ds = new DataSource('rrhh.empleados');

export const enumPrivilegios = signal([]);

watch([authStatus], (val) =>
{
    if (val !== authStatus.AUTH)
        return;

    Api.fetch('rrhh/empleados/privilegios').then(r => {
        enumPrivilegios.set(r.data);
    });

    ds.refresh('enum');
});

function onShown() {
    ds.refresh();
}

function borrar(id)
{
    if (!confirm('Esta seguro de borrar este registro?'))
        return;

    Api.fetch('rrhh/empleados/borrar', { id }).then(r => {
        if (r.response != 200) return alert(r.error);
        ds.refresh();
    });
}

export default () => 
    <r-panel class="flex-fill" data-route="/rrhh/empleados/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1" href="#/rrhh/empleados/crear/"><i class="fa-solid fa-plus"></i> Crear Empleado</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="3rem" data-sort="id"><span>ID</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creado</span></th>
                    <th data-sort="instance"><span>Instancia</span></th>
                    <th data-sort="department"><span>Departamento</span></th>
                    <th data-sort="position"><span>Cargo</span></th>
                    <th data-sort="username"><span>Usuario</span></th>
                    <th data-sort="name"><span>Nombre</span></th>
                    <th data-sort="email"><span>Email</span></th>
                    <th>Privilegios</th>
                    <th style:width="5rem"></th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th><input class="input-small" type="text" data-property="filter_id" /></th>
                    <th><input class="input-small" type="date" data-property="filter_created" /></th>
                    <th><input class="input-small" type="date" data-property="filter_instance" /></th>
                    <th><input class="input-small" type="text" data-property="filter_department" /></th>
                    <th><input class="input-small" type="text" data-property="filter_position" /></th>
                    <th><input class="input-small" type="text" data-property="filter_username" /></th>
                    <th><input class="input-small" type="text" data-property="filter_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_email" /></th>
                    <th><input class="input-small" type="text" data-property="filter_privileges" /></th>
                    <th style:textAlign="center">
                        <span class="btn" onClick={ quitarFiltros }>
                            <i class="fa-solid fa-filter-circle-xmark"></i>
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody className="x-empty">
                <tr>
                    <td colSpan="10">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.s_created}</td>
                    <td>{item.instance}</td>
                    <td>{item.department}</td>
                    <td>{item.position}</td>
                    <td>
                        { !item.is_authorized ? <i class="fa-solid fa-ban"></i> : '' }
                        {item.username}
                    </td>
                    <td>
                        <img class="profile-pic-tiny" src={item.photo_url}/>
                        <span style:marginLeft="0.2rem" style:verticalAlign="middle">{item.name}</span>
                    </td>
                    <td>{item.email}</td>
                    <td>{item.privileges}</td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" href={"#/rrhh/empleados/editar/"+item.id}><i class="fa-regular fa-pen-to-square"></i></a>
                        <span class="btn-1 btn-red" onClick={ () => borrar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
