import {Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'
import LoginPassengers from '../pages/LoginPassengers'

const Public = () => (
  <Routes>
    <Route element={<Login />} path="/backoffice" />
    <Route element={<LoginPassengers />} path="/*" />
  </Routes>
)

export default Public
