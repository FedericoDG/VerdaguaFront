/* eslint-disable no-nested-ternary */
import {Navigate} from 'react-router-dom'
import {useContext} from 'react'

import AppContext from '../context/AppContext'

const PublicRoutes = ({children}) => {
  const {user} = useContext(AppContext)

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
