import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AdminRoutes } from './admin.routes';
import { AuthRoutes } from './auth.routes';
import { CostumerRoutes } from './constumer.routes';
import { SaleRoutes } from './sale.routes';
import { USER_ROLE } from '../utils/roles';

export function Routes() {
  const { user } = useAuth();

  function AccessRoute(){
    switch(user.role){
      case USER_ROLE.ADMIN:
        return<AdminRoutes/>
      case USER_ROLE.COSTUMER:
        return<CostumerRoutes/>
      case USER_ROLE.SALE:
        return<SaleRoutes/>
      default:
        <CostumerRoutes/>
    }
  }

  return (
    <BrowserRouter>
      {user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}