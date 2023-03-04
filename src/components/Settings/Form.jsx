import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Form, Formik} from 'formik'

import {usePutSettings} from '../../hooks/useSettings'
import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'

import validationSchema from './validationSchema'

const SettingsForm = ({settings}) => {
  const {mutate: putSettings} = usePutSettings()

  const handleFormSubmit = async (value, {resetForm}) => {
    putSettings(value)
    // resetForm()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={settings}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      <Form style={{width: '100%'}}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField
                autoComplete="off"
                label="Alerta por Contrato General creado hace más de x días"
                name="alerta_dias_contrato_general"
              />
              <ErrorMessage component={FormError} name="alerta_dias_contrato_general" />
              <CustomTextField
                autoComplete="off"
                label="Porcentaje de recargo por Contrato General creado hace más de x días"
                name="porcentaje_alerta_dias_contrato_general"
              />
              <ErrorMessage component={FormError} name="porcentaje_alerta_dias_contrato_general" />

              <CustomTextField
                autoComplete="off"
                label="Porcentaje de seña"
                name="porcentaje_senia"
              />
              <ErrorMessage component={FormError} name="porcentaje_senia" />
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField
                autoComplete="off"
                label="Días de diferencia entre primera y segunda cuota"
                name="dias_diferencia_cuotas"
              />
              <ErrorMessage component={FormError} name="dias_diferencia_cuotas" />
              <CustomTextField
                autoComplete="off"
                label="Porcentaje de recargo por segundo vencimiento"
                name="porcentaje_recargo_segundo_vencimiento"
              />
              <ErrorMessage component={FormError} name="porcentaje_recargo_segundo_vencimiento" />
              <CustomTextField
                autoComplete="off"
                label="Access Token de preducción de Mercadopago"
                name="access_token_produccion"
              />
              <ErrorMessage component={FormError} name="access_token_produccion" />
            </Stack>
          </Grid>
        </Grid>
        <Grid container mt={1} spacing={1}>
          <Grid item xs={12}>
            <Button
              disableElevation
              fullWidth
              color="primary"
              m={2}
              sx={{paddingY: '12px'}}
              type="submit"
              variant="contained"
            >
              Editar
            </Button>
          </Grid>
          {/*  <Grid item xs={6}>
            <Button fullWidth color="error" sx={{paddingY: '12px'}} type="reset" variant="outlined">
              Cancelar
            </Button>
          </Grid> */}
        </Grid>
      </Form>
    </Formik>
  )
}

export default SettingsForm
