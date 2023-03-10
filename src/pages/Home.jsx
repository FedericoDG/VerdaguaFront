/* eslint-disable camelcase */
/* eslint-disable react/no-unstable-nested-components */
import {Button, Grid, Paper, Typography} from '@mui/material'
import {Navigate, useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import {useSnackbar} from 'notistack'
import EastIcon from '@mui/icons-material/East'

import {useFinishGeneralContract, useGetGeneralContractExpired} from '../hooks/useGeneralContracts'
import appContext from '../context/AppContext'
import Dashboard from '../components/Dashboard'
import Spinner from '../components/Spinner'
import Table from '../components/home/Table'

const Home = () => {
  const {
    user: {id_rol},
  } = useContext(appContext)

  if (id_rol > 2) return <Navigate replace to="/dashboard/passengers" />

  const {data, isFetching} = useGetGeneralContractExpired()

  const navigate = useNavigate()

  const {enqueueSnackbar} = useSnackbar()

  const action = (id) => navigate(`/dashboard/individual-contracts?code=${id}`)

  const onErrorPut = (error) => {
    enqueueSnackbar(error.response.data.msg, {
      variant: 'error',
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: () => {
        if (error.response.data.valids) {
          return (
            <Button
              color="inherit"
              endIcon={<EastIcon sx={{color: '#ffffff'}} />}
              size="small"
              onClick={() =>
                navigate(
                  `/dashboard/individual-contracts?list=${JSON.stringify(
                    error.response.data.valids
                  )}`
                )
              }
            >
              IR A LOS CONTRATOS
            </Button>
          )
        }

        return <div> </div>
      },
    })
  }

  const {mutate: finishContract} = useFinishGeneralContract(onErrorPut)

  return (
    <Dashboard>
      <Grid item xs={12}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{marginBottom: 1}} variant="h6">
            Próximos viajes
          </Typography>
          {!data || isFetching ? (
            <Spinner height={165} />
          ) : (
            <Table check action={action} generalContracts={data.toExpire} />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{marginBottom: 1}} variant="h6">
            Viajes realizados
          </Typography>
          {!data || isFetching ? (
            <Spinner height={165} />
          ) : (
            <Table action={finishContract} check={false} generalContracts={data.expired} />
          )}
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Home
