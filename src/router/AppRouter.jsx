import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Private from './Private'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import Public from './Public'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
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
