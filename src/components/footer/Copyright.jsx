import {Typography} from '@mui/material'
import {useContext} from 'react'

import appContext from '../../context/AppContext'

const Copyright = (props) => {
  const {bottom} = useContext(appContext)

  return (
    <Typography align="center" color="text.secondary" variant="body2" {...props} ref={bottom}>
      {'Copyright © '}
      {`Nombre de la empresa de Francisco/Diego - `}
      {new Date().getFullYear()}.
    </Typography>
  )
}

export default Copyright
