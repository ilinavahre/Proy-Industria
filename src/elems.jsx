
/* ****************** */
export function MultiSelect ({ list, ...props })
{
    const el = <div {...props}>
            {$list.map(o => 
                <label class="checkbox inline-33">
                    <input type="checkbox" value={ o.value } />
                    <span>{ o.label }</span>
                </label>
            )}
        </div>;

    el.type = 'field';

    el.getValue = function () {
        return [...this.querySelectorAll('input')].filter(i => i.checked).map(i => i.value).join(',');
    };

    el.setValue = function (value) {
        value = value.split(',');
        this.querySelectorAll('input').forEach(i => {
            i.checked = value.indexOf(i.value) !== -1;
        });
    }; 

    return el;
}

/* ****************** */
export function Paginacion ({ dataSource, ...props }, children)
{
    return <r-paginator class="buttons" dataSource={ dataSource }>

        <div class="button-container">
        <div class="button-group">
            {children}
        </div>
        </div>

        <div class="button-container">
        <div class="button-group">
            <span class="btn btn-br" data-action="refresh"><i class="fa-solid fa-arrows-rotate"></i> Recargar</span>
            <span title="Primera Página" class="btn" data-action="firstPage"><i class="fa-solid fa-backward-step"></i></span>
            <span title="Anterior" class="btn" data-action="prevPage"><i class="fa-solid fa-angle-left"></i></span>
            <span class="btn alt-3" data-watch="count" >[offsetStart] al [offsetEnd] de [count]</span>
            <span title="Siguiente" class="btn" data-action="nextPage"><i class="fa-solid fa-angle-right"></i></span>
            <span title="Última Página" class="btn" data-action="lastPage"><i class="fa-solid fa-forward-step"></i></span>
        </div>
        </div>

        <select class="input" data-property="pageSize">
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="25">25</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
        </select>

    </r-paginator>
};
