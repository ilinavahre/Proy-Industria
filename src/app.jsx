
import { authStatus, checkPrivileges } from './signals';
import { checkAuth } from './actions';

import AreaPublica from './public';
import AreaPrivada from './private';
import AreaInicial from './initial';

import "./css/xui.css"
import "./css/main.css"

const panel = { };
panel[authStatus.UNDEF] = <div>Cargando...</div>;
panel[authStatus.NOT_AUTH] = <AreaPublica/>;
panel[authStatus.AUTH] = <AreaPrivada/>;
panel[authStatus.INITIAL] = <AreaInicial/>;

function init()
{
    const mutationCallback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type !== 'childList') continue;
            mutation.addedNodes.forEach(addedNode => {
                if (addedNode instanceof Element)
                    checkPrivileges(addedNode);
            });
        }
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(document.body, { childList: true, subtree: true });

    checkAuth();
}

export default () =>
    <r-panel class="flex-fill flex-row" onRootReady={ init }>
        { panel[$authStatus] }
    </r-panel>
;
