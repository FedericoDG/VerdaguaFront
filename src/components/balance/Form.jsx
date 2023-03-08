import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Form, Formik} from 'formik'

import {formatENDate} from '../../utils/formatDate'
import CustomDatePicker from '../form/CustomDatePicker'
import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'

import validationSchema from './validationSchema'

const ChargeForm = ({all, initialValues, refetch, setInitialValues, setAll}) => {
  const handleFormSubmit = async ({desde, hasta, info}) => {
    setAll({desde, hasta, info})
    setInitialValues({desde, hasta, info})
    if (all) refetch()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      <Form style={{width: '100%'}}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomDatePicker
                inputProps={{
                  max: formatENDate(new Date()),
                }}
                label="Desde"
                name="desde"
              />
              <ErrorMessage component={FormError} name="desde" />
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomDatePicker
                inputProps={{
                  max: formatENDate(new Date()),
                }}
                label="Hasta"
                name="hasta"
              />
              <ErrorMessage component={FormError} name="hasta" />
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField autoComplete="off" label="Descripción de la operación" name="info" />
              <ErrorMessage component={FormError} name="info" />
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
              variant="contained"
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
              onClick={() => setInitialValues({desde: '', hasta: '', info: ''})}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}

export default ChargeForm
