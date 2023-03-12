/* eslint-disable camelcase */
import {
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
import {ErrorMessage, Form, Formik} from 'formik'
import {nanoid} from 'nanoid'
import {useContext, useEffect} from 'react'
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp'

import {useRecalculate} from '../../../hooks/useIndividualContracts'
import appContext from '../../../context/AppContext'
import CustomTextField from '../../form/CustomTextField'
import formatCurrency from '../../../utils/formatCurrency'
import FormError from '../../form/FormError'
import useIndividualContractsComponents from '../../../hooks/useIndividualContractsComponents'
import useListIndividualContract from '../../../hooks/useListIndividualContract'

import {validationSchema2} from './validationSchema'
import Sheet from './Sheet'

const Recalc = ({
  individualContract,
  initialValues,
  installments,
  setInitialValues,
  setShowRecalc,
}) => {
  const {top, handleScroll} = useContext(appContext)

  const {resetValues, newImplements, isLoading} = useIndividualContractsComponents()
  const {recalculated, setRecalculated, newContractValue, setNewContractValue} =
    useListIndividualContract()

  const onSuccess = (res) => {
    setRecalculated([res.senia, ...res.cuotasPagadas, ...res.cuotasRecalculadas])
    setNewContractValue(res.newContractValue)
  }

  const {mutate: recalculate, isLoading: isLoadingRecalculate} = useRecalculate(onSuccess)

  const handleFormSubmit = async ({nuevo_valor}) => {
    recalculate({id: initialValues.id, nuevo_valor})
  }

  const handelConfirm = () => {
    newImplements({
      id: initialValues.id,
      newContractValue,
      shares: recalculated.filter((el) => el.estado === 'pendiente'),
    })
    setInitialValues(resetValues)
    setShowRecalc(null) // OJO ACA2
  }

  useEffect(() => {
    if (individualContract?.id) {
      setInitialValues({
        ...individualContract,
        nuevo_valor: individualContract.valor_contrato,
      })
    }
  }, [individualContract])

  const noPaysRemaning = installments.every((el) => el.estado === 'pagada')

  return (
    <>
      <Sheet initialValues={initialValues} />

      <Box marginY={1} />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema2}
        onSubmit={handleFormSubmit}
      >
        <Form style={{width: '100%'}}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Stack direction="row" pb={{xs: 1, md: 0}} spacing={1}>
                <CustomTextField
                  disabled
                  autoComplete="off"
                  label="Valor Actual"
                  name="valor_contrato"
                />
                <ErrorMessage component={FormError} name="valor_contrato" />
                <CustomTextField autoComplete="off" label="Nuevo Valor" name="nuevo_valor" />
                <ErrorMessage component={FormError} name="nuevo_valor" />
              </Stack>
            </Grid>
          </Grid>
          <Grid container mt={1} spacing={1}>
            <Grid item xs={6}>
              <Button
                disableElevation
                fullWidth
                color="primary"
                disabled={noPaysRemaning || isLoadingRecalculate}
                m={2}
                sx={{paddingY: '12px'}}
                type="submit"
                variant="contained"
              >
                Recalcular
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                color="error"
                sx={{paddingY: '12px'}}
                type="reset"
                variant="outlined"
                onClick={() => {
                  setInitialValues(resetValues)
                  setShowRecalc(null)
                  handleScroll(top)
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>

      <Box marginY={1} />
      <Grid container spacing={0}>
        <Grid item md={6} p={1}>
          <Typography variant="caption">Actual plan de pago</Typography>
          <TableContainer sx={{backgroundColor: '#f7f7f7'}}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Cuota</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Valor 1er. Venc.</TableCell>
                  <TableCell align="center">Valor 2do. Venc.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {installments &&
                  installments.map((row, idx) => (
                    <TableRow
                      key={nanoid()}
                      sx={{
                        '&:last-child td, &:last-child th': {border: 0},
                        backgroundColor: `${row.estado === 'pagada' && '#adadad'}`,
                      }}
                    >
                      <TableCell align="center" component="th" scope="row" sx={{}}>
                        {idx === 0 ? 'seña' : row.numero}
                      </TableCell>
                      <TableCell align="center">{row.estado}</TableCell>
                      <TableCell align="center">
                        {formatCurrency(row.valor_primer_vencimiento)}
                      </TableCell>
                      <TableCell align="center">
                        {formatCurrency(row.valor_segundo_vencimiento)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={6} p={1}>
          <Typography variant="caption">Nuevo plan de pago</Typography>
          <TableContainer sx={{backgroundColor: '#f7f7f7'}}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Cuota</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Valor 1er Venc.</TableCell>
                  <TableCell align="center">Valor 2do Venc.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recalculated?.length > 0 &&
                  recalculated.map((row, idx) => (
                    <TableRow
                      key={nanoid()}
                      sx={{
                        '&:last-child td, &:last-child th': {border: 0},
                        backgroundColor: `${row.estado === 'pagada' && '#adadad'}`,
                      }}
                    >
                      <TableCell align="center" component="th" scope="row" sx={{}}>
                        {idx === 0 ? 'seña' : row.numero}
                      </TableCell>
                      <TableCell align="center">{row.estado}</TableCell>
                      <TableCell align="center">
                        {formatCurrency(row.valor_primer_vencimiento)}
                      </TableCell>
                      <TableCell align="center">
                        {formatCurrency(row.valor_segundo_vencimiento)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Box display="flex" sx={{margin: '0 auto'}}>
        <Button
          color="success"
          disabled={!newContractValue || isLoading}
          startIcon={<TaskAltSharpIcon />}
          sx={{paddingY: '12px'}}
          type="reset"
          variant="contained"
          onClick={handelConfirm}
        >
          Confirmar nuevo plan de cuotas
        </Button>
      </Box>
    </>
  )
}

export default Recalc
