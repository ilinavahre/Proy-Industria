
import { Api, DataSource, watch } from 'riza';
import { quitarFiltros } from '../../../actions';
import { Paginacion } from '../../../elems';
import { authStatus } from '../../../signals';

export const ds = new DataSource('clientes.contactos');

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

    Api.fetch('clientes/contactos/borrar', { id }).then(r => {
        if (r.response != 200) return alert(r.error);
        ds.refresh();
    });
}

function reportBirthdates() {
    window.open(Api.makeUrl('clientes/contactos/reporte-birthdates'), '_blank');
}

export default () => 
    <r-panel class="flex-fill" data-route="/clientes/contactos/listar/" onPanelShown={ onShown }>

        <Paginacion dataSource={ ds }>
            <a class="btn alt-1" href="#/clientes/contactos/crear/"><i class="fa-solid fa-plus"></i> Agregar Contacto</a>
            <a class="btn alt-2" onClick={ reportBirthdates }><i class="fa-solid fa-cake-candles"></i> Cumpleaños del Mes</a>
        </Paginacion>

        <r-table dataSource={ ds }>
        <table>
            <thead>
                <tr>
                    <th style:width="3rem" data-sort="id"><span>ID</span></th>
                    <th style:width="11rem" data-sort="created"><span>Creado</span></th>
                    <th data-sort="instance"><span>Instancia</span></th>
                    <th data-sort="status"><span>Estado</span></th>
                    <th data-sort="first_name"><span>Primer Nombre</span></th>
                    <th data-sort="middle_name"><span>Segundo Nombre</span></th>
                    <th data-sort="last_name"><span>Apellido</span></th>
                    <th data-sort="birthdate"><span>Fecha de Nacimiento</span></th>
                    <th data-sort="gender"><span>Género</span></th>
                    <th data-sort="address"><span>Dirección</span></th>
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
                    <th><input class="input-small" type="text" data-property="filter_instance" /></th>
                    <th>
                        <select class="input-small" data-property="filter_status">
                            <option value="">(Todos)</option>
                            <option value="0">Oportunidad</option>
                            <option value="1">Cliente</option>
                            <option value="2">Potencial</option>
                            <option value="3">Cliente Recurrente</option>
                        </select>
                    </th>
                    <th><input class="input-small" type="text" data-property="filter_first_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_middle_name" /></th>
                    <th><input class="input-small" type="text" data-property="filter_last_name" /></th>
                    <th></th>
                    <th>
                        <select class="input-small" data-property="filter_gender">
                            <option value=""></option>
                            <option value="M">M - Masculino</option>
                            <option value="F">F - Femenino</option>
                            <option value="X">X - No Especificado</option>
                        </select>
                    </th>
                    <th><input class="input-small" type="text" data-property="filter_address" /></th>
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
                    <td colSpan="15">No hay registros que mostrar.</td>
                </tr>
            </tbody>

            <tbody class="x-data" content={ (item) =>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.s_created}</td>
                    <td>{item.instance}</td>
                    <td>{item.s_status}</td>
                    <td>{item.first_name}</td>
                    <td>{item.middle_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.birthdate}</td>
                    <td>{item.gender}</td>
                    <td>{item.address1}<br/>{item.address2}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td style:textAlign="center">
                        <a class="btn-1 btn-blue" href={"#/clientes/contactos/editar/"+item.id}><i class="fa-regular fa-pen-to-square"></i></a>
                        <span class="btn-1 btn-red" onClick={ () => borrar(item.id) }><i class="fa-solid fa-trash-can"></i></span>
                    </td>
                </tr>
            }>
            </tbody>
        </table>
        </r-table>


    </r-panel>
;
