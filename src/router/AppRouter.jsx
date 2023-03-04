import {BrowserRouter, Route, Routes} from 'react-router-dom'

import DashboardPassenger from '../pages/DashboardPassenger'

import MercadoPagoRoutes from './MercadoPagoRoutes'
import Private from './Private'
import PrivateRoutes from './PrivateRoutes'
import Public from './Public'
import PublicRoutes from './PublicRoutes'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        element={
          <MercadoPagoRoutes>
            <DashboardPassenger />
          </MercadoPagoRoutes>
        }
        path="/mercadopago/*"
      />
      <Route
        element={
          <PrivateRoutes>
            <Private />
          </PrivateRoutes>
        }
        path="/dashboard/*"
      />
      <Route
        element={
          <PublicRoutes>
            <Public />
          </PublicRoutes>
        }
        path="/*"
      />
    </Routes>
    {/* <Footer /> */}
  </BrowserRouter>
)

export default AppRouter
