import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {useEffect} from 'react'

import {formatENDate} from '../../utils/formatDate'
import CustomAutocomplete from '../form/CustomAutocomplete'
import CustomDatePicker from '../form/CustomDatePicker'
import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'
import usePassengersComponents from '../../hooks/usePassengersComponents'

import validationSchema from './validationSchema'

const PassengersForm = ({initialValues, setInitialValues, passenger, responsibleDocuments}) => {
  const {postPassenger, putPassenger, resetValues} = usePassengersComponents()

  const handleFormSubmit = async (value, {resetForm}) => {
    if (initialValues?.id) {
      putPassenger({...value, documento_responsable: value.documento_responsable?.id})
    } else {
      postPassenger({...value, documento_responsable: value.documento_responsable?.id})
    }
    setInitialValues(resetValues)
    resetForm()
  }

  useEffect(() => {
    if (passenger?.id) {
      setInitialValues({
        ...passenger,
        fecha_nac: formatENDate(passenger.fecha_nac),
        documento_responsable: `${passenger.responsable.documento} - ${passenger.responsable.apellido} ${passenger.responsable.nombre}`,
        bs_medicas: passenger.obs_medicas || '',
      })
    }
  }, [passenger])

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
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField autoComplete="off" label="Apellido" name="apellido" />
              <ErrorMessage component={FormError} name="apellido" />
              <CustomTextField autoComplete="off" label="Nombre" name="nombre" />
              <ErrorMessage component={FormError} name="nombre" />
              <CustomTextField
                autoComplete="off"
                disabled={!!initialValues.id}
                label="DNI"
                name="documento"
              />
              <ErrorMessage component={FormError} name="documento" />
              <CustomDatePicker
                inputProps={{
                  max: formatENDate(new Date()),
                }}
                label="Fecha de Nacimiento"
                name="fecha_nac"
              />
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <Field
                component={CustomAutocomplete}
                label="DNI del responsable"
                name="documento_responsable"
                options={responsibleDocuments}
                textFieldProps={{
                  fullWidth: true,
                  variant: 'outlined',
                }}
              />
              <CustomTextField
                multiline
                label="Observaciones médicas"
                minRows={6}
                name="obs_medicas"
                placeholder="Ingrese aquí otra información que considere relevante..."
              />
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
              {initialValues?.id ? 'Editar' : 'Crear'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              color="error"
              sx={{paddingY: '12px'}}
              type="reset"
              variant="outlined"
              onClick={() => setInitialValues(resetValues)}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}

export default PassengersForm
