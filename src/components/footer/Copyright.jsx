import {Stack, Typography} from '@mui/material'
import {useContext} from 'react'

import appContext from '../../context/AppContext'

const Copyright = () => {
  const {bottom} = useContext(appContext)

  return (
    <Stack
      alignItems="center"
      direction="row"
      display="flex"
      justifyContent="center"
      sx={{paddingTop: 4}}
    >
      <Typography
        ref={bottom}
        align="center"
        color="text.secondary"
        sx={{marginRight: '4px'}}
        variant="caption"
      >
        Desarrollado por Federico González -
      </Typography>
      <Typography ref={bottom} align="center" color="text.secondary" variant="caption">
        <a href="mailto:fede@nazgul.com.ar" target="_top">
          fede@nazgul.com.ar
        </a>
      </Typography>
    </Stack>
  )
}

export default Copyright
