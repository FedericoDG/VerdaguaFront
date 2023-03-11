import {Grid, Paper, Typography} from '@mui/material'
import {DateTime} from 'luxon'
import {useState} from 'react'
import {useSnackbar} from 'notistack'

import {formatENDate} from '../utils/formatDate'
import ChargeForm from '../components/balance/FormCharge'
import Dashboard from '../components/Dashboard'
import Form from '../components/balance/Form'
import Resume from '../components/balance/Resume'
import Table from '../components/balance/Table'
import TableBig from '../components/balance/TableBig'
import useGetBalance, {usePostBalance} from '../hooks/useBalance'
import Spinner from '../components/Spinner'
import Chart from '../components/balance/Graph'

const Balance = () => {
  const now = DateTime.now().plus({hours: -3})

  const [initialValues, setInitialValues] = useState({
    desde: formatENDate(now),
    hasta: formatENDate(now),
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

  const {data: allData = [], isFetching, refetch} = useGetBalance(all, onSuccess, onError)
  const {mutate: postBalance, isLoading} = usePostBalance()

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
          <ChargeForm
            initialValues2={initialValues2}
            isLoading={isLoading}
            postBalance={postBalance}
            setInitialValues2={setInitialValues2}
          />
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

          <Form
            all={all}
            initialValues={initialValues}
            refetch={refetch}
            setAll={setAll}
            setInitialValues={setInitialValues}
          />
        </Paper>
      </Grid>
      {isFetching ? (
        <div style={{margin: '0 auto'}}>
          <Spinner height={200} />
        </div>
      ) : (
        allData?.movements && (
          <>
            <Resume allData={allData} />
            <div style={{flex: 1}} />
            <Chart allData={allData} />
            <Grid item xs={12}>
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
        )
      )}
    </Dashboard>
  )
}

export default Balance
