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
        variant="button"
      >
        Verdagua - Viajes y Turismo
      </Typography>
    </Stack>
  )
}

export default Copyright
