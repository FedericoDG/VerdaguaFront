/* eslint-disable camelcase */
import {Grid, Paper, Typography} from '@mui/material'
import {Navigate} from 'react-router-dom'
import {useContext} from 'react'
import {useSnackbar} from 'notistack'

import appContext from '../context/AppContext'
import Dashboard from '../components/Dashboard'
import Form from '../components/Settings/Form'
import Spinner from '../components/Spinner'
import useGetSettings from '../hooks/useSettings'

const Settings = () => {
  const {
    user: {id_rol},
  } = useContext(appContext)

  if (id_rol > 1) return <Navigate replace to="/dashboard/passengers" />

  const {enqueueSnackbar} = useSnackbar()

  const onSuccess = () => {
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

  const {data: settings, isFetching} = useGetSettings(onSuccess, onError)

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
          {!settings || isFetching ? <Spinner height={313} /> : <Form settings={settings} />}
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Settings
