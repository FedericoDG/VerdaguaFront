import {Grid, Paper, Typography} from '@mui/material'
import {useState} from 'react'
import {useSnackbar} from 'notistack'

import ChargeForm from '../components/balance/FormCharge'
import Dashboard from '../components/Dashboard'
import Form from '../components/balance/Form'
import Resume from '../components/balance/Resume'
import Table from '../components/balance/Table'
import TableBig from '../components/balance/TableBig'
import useGetBalance, {usePostBalance} from '../hooks/useBalance'
import Spinner from '../components/Spinner'

const Balance = () => {
  const [initialValues, setInitialValues] = useState({
    desde: '',
    hasta: '',
    info: '',
  })
  const [initialValues2, setInitialValues2] = useState({
    importe: '',
    tipo: 'egreso',
    forma_pago: 'egreso',
    info: '',
  })

  const [all, setAll] = useState(null)

  const {enqueueSnackbar} = useSnackbar()

  const onSuccess = (res) => {
    let code

    if (res.movementsCount > 0) {
      code = 'success'
    } else {
      code = 'warning'
    }

    enqueueSnackbar(`Balance recuperado. Total de movimientos: ${res.movementsCount}`, {
      variant: code,
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

  const {data: allData = [], isFetching} = useGetBalance(all, onSuccess, onError)
  const {mutate: postBalance, isFetching: isFetchingPost} = usePostBalance()

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
            Cargar un movimiento
          </Typography>
          {isFetchingPost ? (
            <Spinner height={188} />
          ) : (
            <ChargeForm
              initialValues2={initialValues2}
              postBalance={postBalance}
              setInitialValues2={setInitialValues2}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{marginBottom: 1}} variant="h6">
            Consultar
          </Typography>
          {isFetching ? (
            <Spinner height={122} />
          ) : (
            <Form
              initialValues={initialValues}
              setAll={setAll}
              setInitialValues={setInitialValues}
            />
          )}
        </Paper>
      </Grid>
      {allData?.movements && (
        <>
          <Resume allData={allData} />
          <Grid item xs={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{marginBottom: 1}} variant="h6">
                Todos los Movimientos
              </Typography>

              <TableBig
                data={allData.movements}
                isFetching={isFetching}
                setInitialValues={setInitialValues}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{marginBottom: 1}} variant="h6">
                Ingresos
              </Typography>

              <Table
                data={allData.incomes}
                isFetching={isFetching}
                setInitialValues={setInitialValues}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{marginBottom: 1}} variant="h6">
                Egresos
              </Typography>

              <Table
                data={allData.outcomes}
                isFetching={isFetching}
                setInitialValues={setInitialValues}
              />
            </Paper>
          </Grid>
        </>
      )}
    </Dashboard>
  )
}

export default Balance
