import {Grid, Paper, Typography} from '@mui/material'
import {useSnackbar} from 'notistack'

import Dashboard from '../components/Dashboard'
import Form from '../components/Settings/Form'
import Spinner from '../components/Spinner'
import useGetSettings from '../hooks/useSettings'

const Settings = () => {
  const {enqueueSnackbar} = useSnackbar()

  const onSuccess = (res) => {
    enqueueSnackbar('Parámetros recuperados', {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    })
  }

  const onError = (error) => {
    enqueueSnackbar(error.response.data.msg, {
      variant: 'error',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    })
  }

  const {data: settings, isLoading} = useGetSettings(onSuccess, onError)

  return (
    <Dashboard>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{marginBottom: 1}} variant="h6">
            Parámetros del sitio
          </Typography>
          {!settings || isLoading ? <Spinner height={187} /> : <Form settings={settings} />}
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Settings
