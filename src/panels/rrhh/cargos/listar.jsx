
import { Api, DataSource, watch } from 'riza';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';
import { authStatus } from '../../../signals';

export const ds = new DataSource('rrhh.cargos', { includeEnum: true });

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

    Api.fetch('rrhh/cargos/borrar', { id }).then(r => {
        if (r.response != 200) return alert(r.error);
        ds.refresh();
    });
}

export default () => 
    <r-panel class="flex-fill" data-route="/rrhh/cargos/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1" href="#/rrhh/cargos/crear/"><i class="fa-solid fa-plus"></i> Crear Cargo</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="3rem" data-sort="id"><span>ID</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creado</span></th>
                    <th data-sort="instance"><span>Instancia</span></th>
                    <th data-sort="department"><span>Departamento</span></th>
                    <th data-sort="name"><span>Nombre</span></th>
                    <th data-sort="salary"><span>Salario Base</span></th>
                    <th data-sort="vacation_days"><span>Vacaciones</span></th>
                    <th data-sort="sick_days"><span>Licencia por Enfermedad</span></th>
                    <th data-sort="maternity_days"><span>Licencia por Maternidad</span></th>
                    <th style:width="5rem"></th>
                </tr>
            </thead>

            <thead>
                <tr>
                    <th><input class="input-small" type="text" data-property="filter_id" /></th>
                    <th><input class="input-small" type="date" data-property="filter_created" /></th>
                    <th><input class="input-small" type="date" data-property="filter_instance" /></th>
                    <th><input class="input-small" type="text" data-property="filter_department" /></th>
                    <th><input class="input-small" type="text" data-property="filter_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_salary" /></th>
                    <th><input class="input-small" type="text" data-property="vacation_days" /></th>
                    <th><input class="input-small" type="text" data-property="sick_days" /></th>
                    <th><input class="input-small" type="text" data-property="maternity_days" /></th>
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
                    <td>
                        { !item.is_visible ? <i class="fa-regular fa-eye-slash"></i> : '' }
                        {item.name}
                    </td>
                    <td>{item.salary}</td>
                    <td>
                        {item.vacation_days} dias
                        <br/>
                        {item.cumulative_vacations ? <span><i class="fa-regular fa-square-plus"></i> Acumulables</span> : ''}
                        {item.vacation_leave ? <span><i class="fa-solid fa-dollar-sign"></i> Pagados</span> : ''}
                    </td>
                    <td>
                        {item.sick_days} dias
                        <br/>
                        {item.sick_leave ? <span><i class="fa-solid fa-dollar-sign"></i> Pagados</span> : ''}
                    </td>
                    <td>
                        {item.maternity_days} dias
                        <br/>
                        {item.maternity_leave ? <span><i class="fa-solid fa-dollar-sign"></i> Pagados</span> : ''}
                    </td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" href={"#/rrhh/cargos/editar/"+item.id}><i class="fa-regular fa-pen-to-square"></i></a>
                        <span class="btn-1 btn-red" onClick={ () => borrar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
