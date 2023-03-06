import {Navigate} from 'react-router-dom'
import {useContext} from 'react'

import AppContext from '../context/AppContext'

const PublicRoutes = ({children}) => {
  const {user} = useContext(AppContext)

  // eslint-disable-next-line no-nested-ternary
  return user?.rol?.name === 'super' ||
    user?.rol?.name === 'admin' ||
    user?.rol?.name === 'user' ? (
    <Navigate to="/dashboard" />
  ) : user?.rol?.name === 'passenger' ? (
    <Navigate to="/panel" />
  ) : (
    children
  )
}

export default PublicRoutes
