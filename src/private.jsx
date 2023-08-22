import { userData } from './signals';

import { Router } from 'riza';
import { logout } from './actions';

import SaaS from './panels/saas/saas';
import Inventario from './panels/inventario/inventario';
import RecursosHumanos from './panels/rrhh/rrhh';
import Ventas from './panels/ventas/ventas';
import Compras from './panels/compras/compras';
import Clientes from './panels/clientes/clientes';
import Perfil from './panels/perfil/perfil';

function isVisible(elem) {
    const style = window.getComputedStyle(elem);
    if (style.display !== 'none' && style.visibility !== 'hidden' && elem.offsetWidth > 0 && elem.offsetHeight > 0)
        return true;
    return false;
}

function getFirstVisibleElement(selector) {
    const elements = document.querySelectorAll(selector);
    for (let el of elements)
        if (isVisible(el)) return el;
    return null;
}

function init() {
    Router.refresh();

    let elem = getFirstVisibleElement('.sidebar r-tabs > div > a');
    if (elem) {
        console.log(elem.href.split('#')[1]);
        console.log(Router.location);
        //elem.click();
    }
}

export default () =>
    <r-panel class="flex-fill flex-row" onRootReady={ init }>

        <div class="sidebar is-compact">
            <img src={$userData.company_logo_url} data-action=":toggleClass is-compact .sidebar" />

            <div class="r-tabs">
                <div data-priv="super">
                    <r-panel data-route="/saas/">
                    <a href="#/saas/instancias/listar/">
                        <i class="fa-solid fa-bolt"></i>
                        <span>SaaS</span>
                    </a>
                    </r-panel>
                </div>

                <div data-priv="rrhh">
                    <r-panel data-route="/rrhh/">
                    <a href="#/rrhh/empleados/listar/">
                        <i class="fa-solid fa-users"></i>
                        <span>Recursos Humanos</span>
                    </a>
                    </r-panel>
                </div>

                <div data-priv="inventario">
                    <r-panel data-route="/inventario/">
                    <a href="#/inventario/productos/listar/">
                        <i class="fa-solid fa-cart-flatbed"></i>
                        <span>Inventario</span>
                    </a>
                    </r-panel>
                </div>

                <div data-priv="compras|proveedores">
                    <r-panel data-route="/compras/">
                    <a href="#/compras/ordenes/listar/">
                        <i class="fa-solid fa-truck-moving"></i>
                        <span>Compras</span>
                    </a>
                    </r-panel>
                </div>

                <div data-priv="ventas">
                    <r-panel data-route="/ventas/">
                    <a href="#/ventas/pos/crear/">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span>Ventas</span>
                    </a>
                    </r-panel>
                </div>

                <div data-priv="clientes">
                    <r-panel data-route="/clientes/">
                    <a href="#/clientes/contactos/listar/">
                        <i class="fa-regular fa-face-smile-beam"></i>
                        <span>Clientes</span>
                    </a>
                    </r-panel>
                </div>

                <div>
                    <r-panel data-route="/perfil/">
                    <a href="#/perfil/cuenta/detalles/">
                        <img src={ $userData.photo_url } />
                        <span>{$userData.name}</span>
                    </a>
                    </r-panel>
                </div>

                <div>
                    <r-panel data-route="/logout/">
                    <a href="#/logout/" onClick={ logout }>
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Cerrar Sesión</span>
                    </a>
                    </r-panel>
                </div>

            </div>
        </div>

        <div className="content flex-fill flex-row">

            <SaaS />
            <RecursosHumanos />
            <Inventario />
            <Ventas />
            <Compras />
            <Clientes />
            <Perfil />

        </div>

    </r-panel>
;
