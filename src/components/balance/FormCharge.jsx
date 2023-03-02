/* eslint-disable no-alert */
import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Form, Formik, useFormikContext} from 'formik'
import {useEffect, useState} from 'react'

import CustomTextField from '../form/CustomTextField'
import CustomSelect from '../form/CustomSelect'
import FormError from '../form/FormError'

import {validationSchema2} from './validationSchema'

const tipos = [{id: 'ingreso'}, {id: 'egreso'}]

const formasPago = [
  {id: 'efectivo'},
  {id: 'debito'},
  {id: 'credito'},
  {id: 'transferencia'},
  {id: 'egreso'},
]

const CheckOperationTypes = ({setBtnDisable}) => {
  const {values} = useFormikContext()

  useEffect(() => {
    if (values.tipo === 'egreso' && values.forma_pago === 'egreso') {
      return setBtnDisable(false)
    }
    if (values.tipo === 'ingreso' && values.forma_pago !== 'egreso') {
      return setBtnDisable(false)
    }

    return setBtnDisable(true)
  }, [values])

  return null
}

const BalanceForm = ({initialValues2, setInitialValues2, postBalance}) => {
  const [btnDisable, setBtnDisable] = useState(true)

  const handleFormSubmit = async (values, {resetForm}) => {
    let operation = values

    if (values.tipo === 'egreso') {
      operation = {...values, importe: Number(values.importe) * -1}
    }
    postBalance(operation)
    resetForm()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues2}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema2}
      onSubmit={handleFormSubmit}
    >
      <Form style={{width: '100%'}}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField autoComplete="off" label="Importe" name="importe" />
              <ErrorMessage component={FormError} name="importe" />
              <CustomSelect label="Tipo de operación" name="tipo" options={tipos.map((el) => el)} />
              <ErrorMessage component={FormError} name="tipo" />
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomSelect
                label="Forma de Pago"
                name="forma_pago"
                options={formasPago.map((el) => el)}
              />
              <ErrorMessage component={FormError} name="forma_pago" />
              <CustomTextField autoComplete="off" label="Descripción" name="info" />
              <ErrorMessage component={FormError} name="info" />
            </Stack>
          </Grid>
        </Grid>
        <CheckOperationTypes setBtnDisable={setBtnDisable} />
        <Grid container mt={1} spacing={1}>
          <Grid item xs={6}>
            <Button
              disableElevation
              fullWidth
              color="primary"
              disabled={btnDisable}
              m={2}
              sx={{paddingY: '12px'}}
              type="submit"
              variant="contained"
            >
              Agregar movimiento
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              color="error"
              sx={{paddingY: '12px'}}
              type="reset"
              variant="outlined"
              onClick={() =>
                setInitialValues2({
                  importe: '',
                  tipo: {id: 'egreso', name: 'egreso'},
                  forma_pago: {id: 'egreso', name: 'egreso'},
                  info: '',
                })
              }
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}

export default BalanceForm
