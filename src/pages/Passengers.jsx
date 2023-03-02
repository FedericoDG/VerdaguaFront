import {Grid, Paper, Typography} from '@mui/material'
import {useSearchParams} from 'react-router-dom'
import {useRef, useState} from 'react'

import {useGetResponsibleDocuments} from '../hooks/useResponsibles'
import {useGetPassengerById} from '../hooks/usePassengers'
import Dashboard from '../components/Dashboard'
import Form from '../components/passengers/Form'
import Spinner from '../components/Spinner'
import Table from '../components/passengers/Table'

const Passengers = () => {
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    fecha_nac: '',
    obs_medicas: '',
    documento_responsable: '',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('passenger')

  const {data: responsibleDocuments} = useGetResponsibleDocuments()

  const {data: passenger} = useGetPassengerById(id)

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
            Pasajero
          </Typography>
          {!responsibleDocuments || (id && !passenger) ? (
            <Spinner height={315} />
          ) : (
            <Form
              initialValues={initialValues}
              passenger={passenger}
              responsibleDocuments={responsibleDocuments}
              setInitialValues={setInitialValues}
            />
          )}
        </Paper>
      </Grid>
      {/* <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">Pasajero</Typography>
          {id && !passenger ? (
            <Spinner height={315} />
          ) : (
            <>
              <Typography variant="h6">Buscar Pasajero</Typography>
              <Table passenger={passenger} setInitialValues={setInitialValues} />
            </>
          )}
        </Paper>
      </Grid> */}
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <>
            <Typography variant="h6">Buscar Pasajero</Typography>
            <Table passenger={passenger} setInitialValues={setInitialValues} />
          </>
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Passengers
