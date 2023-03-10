/* eslint-disable no-nested-ternary */
import {Grid, Paper, Typography} from '@mui/material'
import {useRef} from 'react'
import {useSearchParams} from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import Form from '../components/individualcontracts/create/Form'
import Spinner from '../components/Spinner'
import useCreateIndividualContract from '../hooks/useCreateIndividualContract'

const IndividualContracts = () => {
  const {passengerCodes, generalContractCodes, setCode, initialValues, setInitialValues} =
    useCreateIndividualContract()

  const step02 = useRef()
  const step03 = useRef()

  const [searchParams, setSearchParams] = useSearchParams()
  // const id = searchParams.get('id')

  return (
    <Dashboard>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            mb: 2,
          }}
        >
          {!passengerCodes || !generalContractCodes ? (
            <Spinner height={340} />
          ) : passengerCodes.length === 0 || generalContractCodes.length === 0 ? (
            <>
              <Typography align="center" color="GrayText" variant="h6">
                No se encontraron Pasajeros y/o Contratos Generales
              </Typography>
              <Typography align="center" variant="button">
                No es posible crear un Contrato Individual
              </Typography>
            </>
          ) : (
            <Form
              generalContractCodes={generalContractCodes}
              // id={id}
              initialValues={initialValues}
              passengerCodes={passengerCodes}
              // setCode={setCode}
              setInitialValues={setInitialValues}
              setSearchParams={setSearchParams}
              step02={step02}
              step03={step03}
            />
          )}
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default IndividualContracts
