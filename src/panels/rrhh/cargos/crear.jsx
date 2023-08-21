
import { back } from '../../../actions';
import { ds as dsDepartamentos } from '../departamentos/listar';

let form;

function formSuccess(res) {
    back();
}

function onShown() {
    form.reset();
}

// *********************************************
export const Campos = () => 
<div>

    <div className="field">
        <label>Departamento</label>
        <r-select dataList={ dsDepartamentos.enum } data-blank="(Seleccionar ...)" data-field="department_id"></r-select>
    </div>
    <div className="field">
        <label>Nombre de Cargo</label>
        <input type="text" data-field="name" />
    </div>
    <div className="field">
        <label>Salario Base</label>
        <input type="text" data-field="salary" />
    </div>

    <div class="flex-row flex-items-center">
        <div className="field flex-even" style:marginRight="2rem">
            <label>Dias de Vacaciones</label>
            <input type="number" data-field="vacation_days" />
        </div>

        <div class="flex-even">
            <label class="checkbox">
                <input type="checkbox" data-field="cumulative_vacations" data-default="0" />
                <span>Vacaciones Acumulables</span>
            </label>
            <label class="checkbox">
                <input type="checkbox" data-field="vacation_leave" data-default="0" />
                <span>Vacaciones Pagadas</span>
            </label>
        </div>
    </div>

    <div class="flex-row flex-items-center">
        <div className="field flex-even" style:marginRight="2rem">
            <label>Licencia por Enfermedad (Dias)</label>
            <input type="number" data-field="sick_days" />
        </div>

        <div class="flex-even">
            <label class="checkbox">
                <input type="checkbox" data-field="sick_leave" data-default="0" />
                <span>Dias Pagados</span>
            </label>
        </div>
    </div>

    <div class="flex-row flex-items-center">
        <div className="field flex-even" style:marginRight="2rem">
            <label>Licencia por Maternidad (Dias)</label>
            <input type="number" data-field="maternity_days" />
        </div>

        <div class="flex-even">
            <label class="checkbox">
                <input type="checkbox" data-field="maternity_leave" data-default="0" />
                <span>Dias Pagados</span>
            </label>
        </div>
    </div>

    <label class="checkbox">
        <input type="checkbox" data-field="is_visible" data-default="1" />
        <span>Cargo está habilitado</span>
    </label>

</div>;

// *********************************************
export default () => 
    <r-panel class="flex-fill" data-route="/rrhh/cargos/crear" onPanelShown={ onShown }>

        <div class="buttons">
            <a class="btn alt-1" onClick={ back }><i class="fa-solid fa-arrow-left-long"></i> Regresar</a>
        </div>

        <r-form class="form" data-form-action="rrhh.cargos.crear" onFormSuccess={ formSuccess } onCreated={ f=>form=f }>

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
