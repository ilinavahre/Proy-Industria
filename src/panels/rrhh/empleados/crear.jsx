
import { ModelList } from 'riza';
import { back } from '../../../actions';
import { MultiSelect } from '../../../elems';
import { enumPrivilegios } from '../empleados/listar';
import { ds as dsDepartamentos } from '../departamentos/listar';
import { ds as dsCargos } from '../cargos/listar';

export const enumCargos = new ModelList();
let form;

function formSuccess(res) {
    back();
}

function onShown() {
    form.reset();

    if (!form.initialized) {
        form.initialized = true;
        form.model.observe('department_id', (evt, args) => {
            enumCargos.setData( dsCargos.enum.getData().filter(x => x.get('department_id') == args.value) );
        });
    }
}

// *********************************************
export const Campos = () => 
<div>

    <div className="field">
        <label>Usuario</label>
        <input type="text" data-field="username" />
    </div>
    <div className="field">
        <label>Contraseña</label>
        <input type="password" data-field="password" />
    </div>
    <div className="field">
        <label>Nombre Completo</label>
        <input type="text" data-field="name" />
    </div>
    <div className="field">
        <label>Correo Electrónico</label>
        <input type="text" data-field="email" />
    </div>

    <div className="flex-row">
        <div className="field flex-even" style:marginRight="0.5rem">
            <label>Departamento</label>
            <r-select dataList={ dsDepartamentos.enum } data-blank="(Seleccionar ...)" data-field="department_id"></r-select>
        </div>
        <div className="field flex-even" style:marginLeft="0.5rem">
            <label>Cargo de Empleado</label>
            <r-select dataList={ enumCargos } data-blank="(Seleccionar ...)" data-field="position_id"></r-select>
        </div>
    </div>

    <br/>

    <div className="field">
        <label>Privilegios</label>
        <MultiSelect list={ enumPrivilegios } data-field="privilege_id" style:marginLeft="1rem" />
    </div>

    <br/>

    <div className="field">
        <label>Foto de Perfil</label>
        <input type="file" data-field="photo" />
    </div>

    <label class="checkbox">
        <input type="checkbox" data-field="is_authorized" data-default="1" />
        <span>Autorizado para Iniciar Sesión</span>
    </label>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/rrhh/empleados/crear/" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="rrhh.empleados.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

            <Campos />

            <br/>
            <div className="message error"></div>
            <div className="message success"></div>

            <button class="alt" type="submit">
                Guardar Registro
            </button>

        </r-form>

    </r-panel>
;
