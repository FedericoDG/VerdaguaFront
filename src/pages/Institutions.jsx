/* eslint-disable camelcase */
import {Grid, Paper, Typography} from '@mui/material'
import {Navigate, useSearchParams} from 'react-router-dom'
import {useContext, useState} from 'react'

import {useGetInstitutionById} from '../hooks/useInstitutions'
import appContext from '../context/AppContext'
import Dashboard from '../components/Dashboard'
import Form from '../components/institutions/Form'
import Table from '../components/institutions/Table'
import Spinner from '../components/Spinner'

const Institutions = () => {
  const {
    user: {id_rol},
  } = useContext(appContext)

  if (id_rol > 2) return <Navigate replace to="/dashboard/passengers" />

  const [initialValues, setInitialValues] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    localidad: '',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const {data: institution} = useGetInstitutionById(id)

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
            Institución
          </Typography>
          {id && !institution ? (
            <Spinner height={187} />
          ) : (
            <Form
              initialValues={initialValues}
              institution={institution}
              setInitialValues={setInitialValues}
              setSearchParams={setSearchParams}
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
          <>
            <Typography variant="h6">Buscar Institución</Typography>

            <Table institution={institution} setInitialValues={setInitialValues} />
          </>
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Institutions
