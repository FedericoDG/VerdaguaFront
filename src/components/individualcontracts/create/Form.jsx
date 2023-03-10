/* eslint-disable no-shadow */
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {useContext} from 'react'

import CustomAutocomplete from '../../form/CustomAutocomplete'
import CustomSelect from '../../form/CustomSelect'
import CustomTextField from '../../form/CustomTextField'
import formatCurrency from '../../../utils/formatCurrency'
import formatDate from '../../../utils/formatDate'
import appContext from '../../../context/AppContext'
import FormError from '../../form/FormError'
import Spinner from '../../Spinner'
import useCreateIndividualContract from '../../../hooks/useCreateIndividualContract'

import installments from './installments'
import SharesTable from './SharesTable'
import SuggestedPrice from './SuggestedPrice'
import validationSchemaGeneralContract, {validationSchemaValue} from './validationSchema'

const IndividualContractsForm = ({
  generalContractCodes,
  initialValues,
  passengerCodes,
  setInitialValues,
  setSearchParams,
  step02,
  step03,
}) => {
  const {handleScroll} = useContext(appContext)

  const {
    contratoGeneral,
    cuotas,
    generalContract,
    generalContractRef,
    handleCancel,
    initialValues2,
    isFetching,
    pasajero,
    sendButton,
    settings,
    valor,
    valueRef,
    setContratoGeneral,
    setPasajero,
    setValor,
    setCuotas,
  } = useCreateIndividualContract()

  const resetForms = () => {
    setInitialValues({
      contratoGeneral: '',
      pasajero: '',
    })
    setSearchParams({id: ''})
    handleCancel()
  }

  const handleFormSubmitGeneralContract = async ({contratoGeneral, pasajero}) => {
    setContratoGeneral(contratoGeneral)
    setPasajero(pasajero)
    handleScroll(step02)
  }

  const handleFormSubmitValue = async ({valor, cuotas}) => {
    setValor(valor)
    setCuotas(cuotas)
    handleScroll(step03)
  }

  return (
    <>
      <Typography variant="h6">Crear Contrato Individual</Typography>
      <Button
        disableElevation
        color="error"
        sx={{paddingY: '12px', mb: 2, width: 300, ml: 'auto'}}
        type="reset"
        variant="contained"
        onClick={resetForms}
      >
        Limpiar
      </Button>
      <Box alignItems="center" display="flex" mb={2}>
        <Avatar sx={{bgcolor: '#3700B3'}}>01</Avatar>
        <Typography mx={2} variant="button">
          Consultar Contrato General y Pasajero
        </Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        innerRef={generalContractRef}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchemaGeneralContract}
        onSubmit={handleFormSubmitGeneralContract}
      >
        <Form style={{width: '100%'}}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Stack pb={{xs: 1, md: 0}} spacing={1}>
                <Field
                  component={CustomAutocomplete}
                  disabled={
                    (!!contratoGeneral?.id && !!pasajero?.id) ||
                    !!initialValues?.contratoGeneral?.id
                  }
                  label="Contrato General"
                  name="contratoGeneral"
                  options={generalContractCodes}
                  textFieldProps={{
                    fullWidth: true,
                    variant: 'outlined',
                  }}
                />
              </Stack>
            </Grid>
            <Grid item md={12} xs={12}>
              <Stack pb={{xs: 1, md: 0}} spacing={1}>
                <Field
                  component={CustomAutocomplete}
                  disabled={!!contratoGeneral.id && !!pasajero.id}
                  label="DNI Pasajero"
                  name="pasajero"
                  options={passengerCodes}
                  textFieldProps={{
                    fullWidth: true,
                    variant: 'outlined',
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid container mt={1} spacing={1}>
            <Grid item xs={6}>
              <Button
                disableElevation
                fullWidth
                color="primary"
                m={2}
                sx={{paddingY: '12px'}}
                type="submit"
                variant="outlined"
              >
                Consultar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                color="error"
                sx={{paddingY: '12px'}}
                type="reset"
                variant="outlined"
                onClick={resetForms}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>

      {isFetching && <Spinner height={323} />}
      {contratoGeneral.id && pasajero.id && !isFetching && (
        <Box my={2}>
          <Box alignItems="center" display="flex">
            <Avatar sx={{bgcolor: '#3700B3'}}>02</Avatar>
            <Typography mx={2} variant="button">
              Generar Plan de Pago
            </Typography>
          </Box>
          <SuggestedPrice generalContract={generalContract} settings={settings} />

          <TableContainer sx={{marginTop: 2, backgroundColor: '#dadada'}}>
            <Table size="small" sx={{minWidth: 650}}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="40%">
                    Institución
                  </TableCell>
                  <TableCell align="center">Grado</TableCell>
                  <TableCell align="center">División</TableCell>
                  <TableCell align="center">Turno</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="center" component="th" scope="row">
                    {generalContract?.institucion?.nombre}
                  </TableCell>
                  <TableCell align="center">{generalContract.grado}</TableCell>
                  <TableCell align="center">{generalContract.division}</TableCell>
                  <TableCell align="center">{generalContract.turno}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer sx={{marginBottom: 2, backgroundColor: '#f7f7f7'}}>
            <Table size="small" sx={{minWidth: 650}}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="40%">
                    Descripción
                  </TableCell>
                  <TableCell align="center">Valor</TableCell>
                  <TableCell align="center">Fecha de viaje</TableCell>
                  <TableCell align="center">Asientos Totales</TableCell>
                  <TableCell align="center">Asientos Ocupados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="center" component="th" scope="row">
                    {generalContract.descripcion}
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrency(generalContract.valor_contrato)}
                  </TableCell>
                  <TableCell align="center">{formatDate(generalContract.fecha_viaje)}</TableCell>
                  <TableCell align="center">{generalContract.asientos_totales}</TableCell>
                  <TableCell align="center">{generalContract.asientos_ocupados}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Formik
            enableReinitialize
            initialValues={initialValues2}
            innerRef={valueRef}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={validationSchemaValue}
            onSubmit={handleFormSubmitValue}
          >
            <Form style={{width: '100%'}}>
              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <Stack pb={{xs: 1, md: 0}} spacing={1}>
                    <CustomTextField
                      autoFocus
                      autoComplete="off"
                      label="Valor Contrato"
                      name="valor"
                    />
                    <ErrorMessage component={FormError} name="valor" />
                  </Stack>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Stack pb={{xs: 1, md: 0}} spacing={1}>
                    <CustomSelect
                      label="Cantidad de Cuotas"
                      name="cuotas"
                      options={installments.map((el) => el)}
                    />
                    <ErrorMessage component={FormError} name="valor" />
                  </Stack>
                </Grid>
              </Grid>
              <Grid container mt={1} spacing={1}>
                <Grid item xs={6}>
                  <Button
                    ref={step02}
                    disableElevation
                    fullWidth
                    color="primary"
                    disabled={
                      generalContract.asientos_totales === generalContract.asientos_ocupados
                    }
                    m={2}
                    sx={{paddingY: '12px'}}
                    type="submit"
                    variant="outlined"
                    onClick={() => handleScroll(sendButton)}
                  >
                    {generalContract.asientos_totales === generalContract.asientos_ocupados
                      ? 'No hay lugar disponible (Viaje completo)'
                      : 'Generar plan de pagos'}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    color="error"
                    sx={{paddingY: '12px'}}
                    type="reset"
                    variant="outlined"
                    onClick={resetForms}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      )}

      {valor && cuotas && (
        <SharesTable
          contratoGeneral={contratoGeneral}
          cuotas={cuotas}
          handleCancel={resetForms}
          pasajero={pasajero}
          sendButton={sendButton}
          settings={settings}
          valor={valor}
        />
      )}
    </>
  )
}

export default IndividualContractsForm
