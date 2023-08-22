
import { signal, expr, watch } from 'riza';

export const authStatus = signal(0);
authStatus.UNDEF = 0;
authStatus.AUTH = 1;
authStatus.NOT_AUTH = 2;
authStatus.INITIAL = 3;

/* *** */
const mapaPrivilegios = {
    'administrador':    ['admin', 'rrhh', 'inventario', 'clientes', 'proveedores', 'compras', 'ventas', 'reportes'],
    'super':            ['super', 'admin', 'rrhh', 'inventario', 'clientes', 'proveedores', 'compras', 'ventas', 'reportes'],
    'recursos humanos': ['rrhh'],
    'inventario':       ['inventario'],
    'clientes':         ['clientes'],
    'proveedores':      ['proveedores'],
    'compras':          ['compras'],
    'ventas':           ['ventas'],
    'reportes':         ['reportes']
};

export const userData = signal({ });
let activePrivileges = null

watch([userData], (userData) =>
{
    if (!userData || !userData.privileges)
        return;

    document.title = userData.company_name;

    activePrivileges = [...new Set(userData.privileges.map(i => mapaPrivilegios[i.toLowerCase()]).reduce((a, b) => a.concat(b), []))];
    checkPrivileges(document.body);
});

export function checkPrivileges (root)
{
    if (!activePrivileges) return;

    root.querySelectorAll('[data-priv]').forEach(e =>
    {
        if (!e.dataset.priv.split('|').some(i => activePrivileges.includes(i)))
            e.remove();
    });
}
