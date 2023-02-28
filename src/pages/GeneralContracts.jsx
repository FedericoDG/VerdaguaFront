import {Grid, Paper, Typography} from '@mui/material'
import {useSearchParams} from 'react-router-dom'
import {useState} from 'react'

import {UseGetGeneralContractById} from '../hooks/useGeneralContracts'
import {useGetInstitutionCodes} from '../hooks/useInstitutions'
import Dashboard from '../components/Dashboard'
import Form from '../components/generalcontracs/Form'
import Table from '../components/generalcontracs/Table'
import Spinner from '../components/Spinner'

const GeneralContracts = () => {
  const [initialValues, setInitialValues] = useState({
    descripcion: '',
    valor_contrato: '',
    fecha_viaje: '',
    asientos_totales: '',
    grado: '',
    division: '',
    turno: '',
    institucion: '',
    estado: 'vigente',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const {data: generalContract} = UseGetGeneralContractById(id)

  const {data: institutionCodes} = useGetInstitutionCodes()

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
          <Typography variant="h6">Contrato General</Typography>

          {!institutionCodes || (id && !generalContract) ? (
            <Spinner height={251} />
          ) : (
            <Form
              generalContract={generalContract}
              initialValues={initialValues}
              institutionCodes={institutionCodes}
              setInitialValues={setInitialValues}
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
            <Typography variant="h6">Buscar Contrato General</Typography>
            <Table generalContract={generalContract} setInitialValues={setInitialValues} />
          </>
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default GeneralContracts
