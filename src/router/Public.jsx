import {Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'

const Public = () => (
  <Routes>
    <Route element={<Login />} path="/*" />
  </Routes>
)

export default Public
