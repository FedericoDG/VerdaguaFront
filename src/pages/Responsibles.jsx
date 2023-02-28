import {Grid, Paper, Typography} from '@mui/material'
import {useSearchParams} from 'react-router-dom'
import {useState} from 'react'

import {UseGetResponsibleById} from '../hooks/useResponsibles'
import Dashboard from '../components/Dashboard'
import Form from '../components/responsibles/Form'
import Table from '../components/responsibles/Table'

const Responsibles = () => {
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    fecha_nac: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    codigo_postal: '',
    info: '',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const {data: responsible} = UseGetResponsibleById(id)

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
          <Typography variant="h6">Responsable</Typography>
          <Form
            initialValues={initialValues}
            responsible={responsible}
            setInitialValues={setInitialValues}
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
          <>
            <Typography variant="h6">Buscar Responsable</Typography>
            <Table responsible={responsible} setInitialValues={setInitialValues} />
          </>
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Responsibles
