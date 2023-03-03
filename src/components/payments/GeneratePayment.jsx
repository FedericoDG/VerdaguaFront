/* eslint-disable camelcase */
import {Avatar, Box, Button, Grid, Stack, Typography} from '@mui/material'
import {ErrorMessage, Formik, Form, useFormikContext} from 'formik'
import {useContext, useEffect, useState} from 'react'

import appContext from '../../context/AppContext'
import CustomTextField from '../form/CustomTextField'
import CustomSelect from '../form/CustomSelect'
import FormError from '../form/FormError'

import {validationSchema2} from './validationSchema'

const operation = [{id: 'ingreso'}, {id: 'egreso'}]
const type = [{id: 'efectivo'}, {id: 'debito'}, {id: 'credito'}, {id: 'transferencia'}]

const CheckOperationTypes = ({setDisableDiscount, setDisableCharge}) => {
  const {values} = useFormikContext()

  useEffect(() => {
    if (Number(values.movimiento.recargo) > 0) {
      return setDisableDiscount(true)
    }
    if (Number(values.movimiento.descuento) > 0) {
      return setDisableCharge(true)
    }

    setDisableDiscount(false)

    return setDisableCharge(false)
  }, [values])

  return null
}

const GeneratePayment = ({initialValues2, setInitialValues2, setShowBill, form2Ref, hardReset}) => {
  const {
    bottom,
    handleScroll,
    user: {id_rol},
  } = useContext(appContext)

  const [disableDiscount, setDisableDiscount] = useState(false)
  const [disableCharge, setDisableCharge] = useState(false)

  const handleFormSubmit = (obj) => {
    setInitialValues2(obj)
    setShowBill(true)
    handleScroll(bottom)
  }

  return (
    <>
      <Box alignItems="center" display="flex" my={2}>
        <Avatar sx={{bgcolor: '#3700B3'}}>03</Avatar>
        <Typography mx={2} variant="button">
          Generar Recibo
        </Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={initialValues2}
        innerRef={form2Ref}
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
                  label="Importe"
                  name="movimiento.importe"
                />
                <ErrorMessage component={FormError} name="movimiento.importe" />
                <CustomSelect
                  disabled
                  label="Tipo de operación"
                  name="movimiento.tipo"
                  options={operation}
                />
                <ErrorMessage component={FormError} name="movimiento.tipo" />
                <CustomSelect label="Forma de pago" name="movimiento.forma_pago" options={type} />
                <ErrorMessage component={FormError} name="movimiento.forma_pago" />
              </Stack>
            </Grid>
            <Grid item md={12} xs={12}>
              <Stack direction="row" pb={{xs: 1, md: 0}} spacing={1}>
                <CustomTextField
                  autoComplete="off"
                  disabled={id_rol > 2 || disableCharge}
                  label="Recargo a aplicar (en pesos)"
                  name="movimiento.recargo"
                />
                <ErrorMessage component={FormError} name="movimiento.recargo" />
                <CustomTextField
                  autoComplete="off"
                  disabled={id_rol > 2 || disableDiscount}
                  label="Descuento a aplicar (en pesos)"
                  name="movimiento.descuento"
                />
                <ErrorMessage component={FormError} name="movimiento.descuento" />
                <CustomTextField
                  autoComplete="off"
                  disabled={id_rol > 2}
                  label="Descripción Recargo/Descuento"
                  name="movimiento.diferencia_descripcion"
                />
                <ErrorMessage component={FormError} name="movimiento.diferencia_descripcion" />
              </Stack>
              <CheckOperationTypes
                setDisableCharge={setDisableCharge}
                setDisableDiscount={setDisableDiscount}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Stack pb={{xs: 1, md: 0}} spacing={1}>
                    <CustomTextField autoComplete="off" label="Destinatario" name="destinatario" />
                    <ErrorMessage component={FormError} name="destinatario" />
                    <CustomTextField autoComplete="off" label="DNI" name="DNI" />
                    <ErrorMessage component={FormError} name="DNI" />
                    <CustomTextField autoComplete="off" label="Domicilio" name="domicilio" />
                    <ErrorMessage component={FormError} name="domicilio" />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" pb={{xs: 1, md: 0}} spacing={1}>
                    <CustomTextField
                      disabled
                      multiline
                      autoComplete="off"
                      label="Concepto"
                      minRows={5}
                      name="movimiento.info"
                    />
                    <ErrorMessage component={FormError} name="movimiento.info" />
                  </Stack>
                </Grid>
              </Grid>
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
                Generar recibo
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                color="error"
                sx={{paddingY: '12px'}}
                type="reset"
                variant="outlined"
                onClick={hardReset}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  )
}

export default GeneratePayment
