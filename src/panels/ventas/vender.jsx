
import { Api, DataSource, DataList, watch, signal } from 'riza';
import { authStatus } from '../../signals';
import { quitarFiltros } from '../../actions';
import { Paginacion } from '../../elems';
import { ds as dsProductos } from '../inventario/productos/listar';

const productos = signal([]);
const enumProductos = signal([]);
const codigo = signal('');

const carrito = signal([]);
const subTotal = signal(0);
const impuestos = signal(0);
const total = signal(0);

dsProductos.enum.addEventListener('itemsChanged', () => {
    enumProductos.value = dsProductos.enum.getData().map(i => i.get());
    filtrar();
});

watch([authStatus], (val) =>
{
    if (val !== authStatus.AUTH)
        return;
});

watch([carrito], (lista) => {
    subTotal.value = lista.reduce((a, b) => a + b.price * b.count, 0);
    impuestos.value = lista.reduce((a, b) => a + b.price * b.count * b.tax * 0.01, 0);
    total.value = subTotal.value + impuestos.value;
});

watch([codigo], () => {
    filtrar();
});

function filtrar()
{
    let lista = enumProductos.value;

    if (codigo.value)
        lista = lista.filter(p => p.code.toLowerCase().indexOf(codigo.value.toLowerCase()) >= 0);

    productos.value = lista;
}

function onShown()
{
}

function quitarProducto(id) {
    carrito.value = carrito.value.filter(c => c.id !== id);
}

function actualizarProducto(id, count)
{
    const p = enumProductos.value.find(p => p.id === id);
    if (!p) return;

    let c = carrito.value.find(c => c.id === id);
    if (!c) carrito.value.push(c = { ...p, count: 0 });

    c.count += count;
    if (c.count <= 0) return quitarProducto(id);

    carrito.notify();
}

function limpiar() {
    carrito.value = [];
}

function completar() {

    if (!carrito.value.length) {
        alert('No hay productos en el carrito.');
        return;
    }

    let venta = carrito.value.map(p => ({ id: p.id, count: p.count }));

    Api.fetch('ventas.vender', JSON.stringify(venta)).then(r =>
    {
        if (r.response != 200) {
            alert(r.error);
            return;
        }

        alert('Venta completada exitosamente.');
        limpiar();
    });
}

export default () => 
    <r-panel class="flex-fill flex-col" data-route="/ventas/vender/" onPanelShown={ onShown }>

        <div class="flex-fill flex-row ovf-hidden">

            <div style:width="75%">
                <div className="buttons flex-row flex-static">
                    <div class="field">
                        <label>Código de Producto</label>
                        <input class="input" type="text" trait:valueSignal={ codigo } />
                    </div>
                    <div class="field">
                        <label>&nbsp;</label>
                        <span class="flex-even btn alt-3" style:marginTop="0.1rem" onClick={ () => codigo.value = '' }><i class="fa-solid fa-xmark"></i></span>
                    </div>
                </div>

                {$productos.map((p) =>
                    <span class="product" onClick={ () => actualizarProducto(p.id, 1) }>
                        <img src={p.photo_url} />
                        <span>
                            <span>{p.code}</span>
                            {p.name}
                        </span>
                        <b>{p.price} <span>/ {p.unit}</span></b>
                    </span>
                )}
            </div>

            <div class="flex-fill flex-col ovf-hidden" style:padding="0 1rem">
                <div class="buttons flex-row">
                    <span class="flex-even btn alt-1" onClick={ completar }><i class="fas fa-check" style:marginRight="0.25rem"></i> Completar</span>
                    <span class="flex-even btn alt-2" onClick={ limpiar }><i class="fas fa-broom" style:marginRight="0.25rem"></i> Limpiar</span>
                </div>

                <div class="cart-list flex-fill ovf-auto">

                    {$carrito.length == 0 ? <div class="no-data">No hay productos en el carrito.</div> : ''}

                    {$carrito.map((p) =>
                        <div class="line">
                            <div class="sub-1">
                                <span class="code">{p.code}</span>
                                <span class="name">{p.name}</span>
                            </div>
                            <div class="sub-2">
                                <span class="price"></span>
                                <span class="count">{p.price} x {p.count} {p.unit}</span>
                                <span class="total">{(p.price * p.count).toFixed(2)}</span>
                            </div>

                            <span class="sub-3">
                                <i class="far fa-trash-can" onClick={ () => quitarProducto(p.id) }></i>
                                <i class="fa fa-plus" onClick={ () => actualizarProducto(p.id, 1) }></i>
                                <i class="fa fa-minus" onClick={ () => actualizarProducto(p.id, -1) }></i>
                            </span>
                        </div>
                    )}
                </div>

                <div class="line">
                    <div class="sub-4 first">
                        <span class="label">Sub-Total</span>
                        <span class="value">{$subTotal.toFixed(2)}</span>
                    </div>
                    <div class="sub-4">
                        <span class="label">Impuestos</span>
                        <span class="value">{$impuestos.toFixed(2)}</span>
                    </div>
                    <div class="sub-4 last">
                        <span class="label">Total</span>
                        <span class="value">{$total.toFixed(2)}</span>
                    </div>
                </div>

            </div>
        </div>

    </r-panel>
;
