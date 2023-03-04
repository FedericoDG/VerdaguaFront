import {useEffect, useMemo, useReducer, useRef, useState} from 'react'

import {getRequest} from '../services/httpRequest'
import localStorage from '../utils/localStorage'

import {loginSettingsAction} from './actions/settings'
import appContext from './AppContext'
import authReducer from './reducers/authReducer'
import settingsReducer from './reducers/settingsReducer'

const init = () => localStorage.read('user') || {logged: false}

const AppProvider = ({children}) => {
  const [user, dispatch] = useReducer(authReducer, {}, init)
  const [settings, dispatchSettings] = useReducer(settingsReducer, {})
  const [open, setOpen] = useState(true)

  const top = useRef()
  const bottom = useRef()

  useEffect(() => {
    if (!user) return
    localStorage.write('user', user)
  }, [user])

  useEffect(() => {
    if (user.logged && user.rol.name !== 'passenger') {
      getRequest('/settings/').then((res) => {
        dispatchSettings(loginSettingsAction(res.data))
      })
    }
  }, [user])

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleScroll = (ref) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({behavior: 'smooth'})
    }, 500)
  }

  const value = useMemo(
    () => ({
      user,
      dispatch,
      open,
      toggleDrawer,
      settings,
      dispatchSettings,
      top,
      bottom,
      handleScroll,
    }),
    [user, settings, open]
  )

  return <appContext.Provider value={value}>{children}</appContext.Provider>
}

export default AppProvider
