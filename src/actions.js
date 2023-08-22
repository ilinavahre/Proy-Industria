
import { Api } from 'riza';
import { authStatus, userData } from './signals';

export function back()
{
    history.back();
}

/**
 * Verifica si el usuario ya está autenticado y luego ejecuta la callback.
 */
export async function checkAuth (callback=null)
{
    Api.fetch('account/get').then(r =>
    {
        if (r.response == 410) {
            authStatus.set(authStatus.INITIAL);
        }
        else if (r.response != 200) {
            authStatus.set(authStatus.NOT_AUTH);
        }
        else {
            authStatus.set(authStatus.AUTH);
            userData.set(r);
        }

        if (callback !== null && typeof(callback) === 'function')
            callback();
    });
}

/**
 * Cierra la sesión actual.
 */
export function logout()
{
    Api.fetch('auth/logout').then(r => {
        location.reload();
        //authStatus.set(authStatus.NOT_AUTH);
    });

    return false;
}

/**
 * Quita los filtros de un r-table.
 * @param {Event} evt 
 */
export function quitarFiltros (evt)
{
    let model = evt.currentTarget.querySelectorParent('r-table').getModel();
    Object.keys(model.get()).filter(i => i.startsWith('filter_')).forEach(i => model.set(i, ''));
}
