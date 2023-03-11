import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Form, Formik} from 'formik'
import {useEffect} from 'react'

import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'
import useInstitutionsComponents from '../../hooks/useInstitutionsComponents'

import validationSchema from './validationSchema'

const InstitutionForm = ({initialValues, institution, setInitialValues, setSearchParams}) => {
  const {postInstitution, putInstitution, resetValues, isLoading} = useInstitutionsComponents()

  const handleFormSubmit = async (value, {resetForm}) => {
    const valuesToUpperCase = {
      ...value,
      nombre: value.nombre.toUpperCase(),
      direccion: value.direccion.toUpperCase(),
      localidad: value.localidad.toUpperCase(),
    }

    if (initialValues?.id) {
      putInstitution(valuesToUpperCase)
    } else {
      postInstitution(valuesToUpperCase)
    }
    setInitialValues(resetValues)
    setSearchParams({id: ''})
    resetForm()
  }

  useEffect(() => {
    if (institution?.id) {
      setInitialValues({...institution})
    }
  }, [institution])

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
              <CustomTextField autoComplete="off" label="Nombre" name="nombre" />
              <ErrorMessage component={FormError} name="nombre" />
              <CustomTextField autoComplete="off" label="Dirección" name="direccion" />
              <ErrorMessage component={FormError} name="direccion" />
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField autoComplete="off" label="Teléfono" name="telefono" />
              <ErrorMessage component={FormError} name="telefono" />
              <CustomTextField autoComplete="off" label="Localidad" name="localidad" />
              <ErrorMessage component={FormError} name="localidad" />
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

export default InstitutionForm
