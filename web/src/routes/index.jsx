import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AdminRoutes } from './admin.routes';
import { AuthRoutes } from './auth.routes';
import { CostumerRoutes } from './constumer.routes';
import { SaleRoutes } from './sale.routes';
import { USER_ROLE } from '../utils/roles';
import { useEffect } from 'react';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

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

  useEffect(()=>{
    api.get('/users/validated').catch((error) => {
        signOut()
      // console.log(error)
      // if(error.reposnse?.status === 401){
        // signOut()
      // }
    })
  },[])

  return (
    <BrowserRouter>
      {user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}