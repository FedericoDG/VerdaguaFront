import {Navigate} from 'react-router-dom'
import {useContext} from 'react'

import AppContext from '../context/AppContext'

const MercadoPagoRoutes = ({children}) => {
  const {user} = useContext(AppContext)

  return user?.rol?.name === 'passenger' ? children : <Navigate to="/" />
}

export default MercadoPagoRoutes
