import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Form, Formik} from 'formik'
import {useEffect} from 'react'

import {formatENDate} from '../../utils/formatDate'
import CustomDatePicker from '../form/CustomDatePicker'
import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'
import useResponsiblesComponents from '../../hooks/useResponsiblesComponents'

import validationSchema from './validationSchema'

const ResponsiblesForm = ({responsible, initialValues, setInitialValues, setSearchParams}) => {
  const {postResponsible, putResponsible, resetValues, isLoading} = useResponsiblesComponents()

  const handleFormSubmit = async (value, {resetForm}) => {
    const valuesToUpperCase = {
      ...value,
      nombre: value.nombre.toUpperCase(),
      apellido: value.apellido.toUpperCase(),
      ciudad: value.ciudad.toUpperCase(),
      email: value.email.toLowerCase(),
      provincia: value.provincia.toUpperCase(),
      direccion: value.direccion.toUpperCase(),
      info: value.info.toUpperCase(),
    }

    if (initialValues?.id) {
      putResponsible(valuesToUpperCase)
    } else {
      postResponsible(valuesToUpperCase)
    }
    setInitialValues(resetValues)
    setSearchParams({id: ''})
    resetForm()
  }

  useEffect(() => {
    if (responsible?.id) {
      setInitialValues({
        ...responsible,
        fecha_nac: formatENDate(responsible.fecha_nac),
        info: responsible.info || '',
      })
    }
  }, [responsible])

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
              <CustomTextField autoComplete="off" label="Apellido" name="apellido" />
              <ErrorMessage component={FormError} name="apellido" />
              <CustomTextField autoComplete="off" label="Nombre" name="nombre" />
              <ErrorMessage component={FormError} name="nombre" />
              <CustomTextField autoComplete="off" label="DNI" name="documento" />
              <ErrorMessage component={FormError} name="documento" />
              <CustomDatePicker
                inputProps={{
                  max: formatENDate(new Date()),
                }}
                label="Fecha de Nacimiento"
                name="fecha_nac"
              />
            </Stack>
            <ErrorMessage component={FormError} name="fecha_nac" />
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField autoComplete="off" label="Teléfono" name="telefono" />
              <ErrorMessage component={FormError} name="telefono" />
              <CustomTextField autoComplete="off" label="Email" name="email" />
              <ErrorMessage component={FormError} name="email" />
              <CustomTextField autoComplete="off" label="Dirección" name="direccion" />
              <ErrorMessage component={FormError} name="direccion" />
              <CustomTextField autoComplete="off" label="Ciudad" name="ciudad" />
              <ErrorMessage component={FormError} name="ciudad" />
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField autoComplete="off" label="Provincia" name="provincia" />
              <ErrorMessage component={FormError} name="provincia" />
              <CustomTextField autoComplete="off" label="Código Postal" name="codigo_postal" />
              <ErrorMessage component={FormError} name="codigo_postal" />
              <CustomTextField
                multiline
                label="Otra Información"
                minRows={3}
                name="info"
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
              disabled={isLoading}
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

export default ResponsiblesForm
