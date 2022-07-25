import { createContext } from 'react';


//provide le contexte a tous les screens
export  const UserContext = createContext(null); //contexte use partout
export const UserListContext = createContext(null); //pas utilisé mais a utiliser pr save call api
export const ReloadContext = createContext(null); //contexte qui permet dafficher le loader a lajout dune nouvelle dépense