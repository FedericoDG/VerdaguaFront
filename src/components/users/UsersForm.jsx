import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Form, Formik} from 'formik'

import CustomSelect from '../form/CustomSelect'
import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'

import validationSchema from './validationSchema'

const UsersForm = ({initialValues, setInitialValues, roles, postUser, putUser, isLoading}) => {
  const resetValues = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    id_rol: '',
  }

  const onSubmit = async (value, {resetForm}) => {
    if (initialValues?.id) {
      putUser(value)
    } else {
      await postUser(value)
    }
    setInitialValues(resetValues)
    resetForm()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form style={{width: '100%'}}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField label="Apellido" name="apellido" />
              <ErrorMessage component={FormError} name="apellido" />
              <CustomTextField label="Nombre" name="nombre" />
              <ErrorMessage component={FormError} name="nombre" />
              <CustomTextField label="Email" name="email" />
              <ErrorMessage component={FormError} name="email" />
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <CustomTextField label="Contraseña" name="password" />
              <ErrorMessage component={FormError} name="password" />
              <CustomSelect label="Rol del usuario" name="id_rol" options={roles.map((el) => el)} />
              <ErrorMessage component={FormError} name="id_rol" />
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

export default UsersForm
