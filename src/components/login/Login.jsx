import {Button, Stack, Box, Typography, Container} from '@mui/material'
import {Formik, Form, ErrorMessage} from 'formik'
import {useContext, useState} from 'react'
import {useSnackbar} from 'notistack'

import {loginAction} from '../../context/actions/auth'
import {postRequest} from '../../services/httpRequest'
import appContext from '../../context/AppContext'
import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'
import localStorage from '../../utils/localStorage'

import validationSchemaLogin from './validationSchema'

const SignIn = () => {
  const [fetching, setFetching] = useState(false)
  const {dispatch} = useContext(appContext)

  const {enqueueSnackbar} = useSnackbar()

  const login = async (body) => {
    try {
      setFetching(true)

      const {user, token} = await postRequest('/auth/login', body)

      setFetching(false)

      localStorage.write('user', {...user, logged: true})
      localStorage.write('token', token)

      dispatch(loginAction(user))
      enqueueSnackbar('Login exitoso', {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    } catch (error) {
      setFetching(false)
      enqueueSnackbar(error.response.data.msg, {
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })

      throw new Error(error)
    }
  }

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchemaLogin}
      onSubmit={login}
    >
      <Container
        maxWidth="sm"
        sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography color="primary" component="h1" variant="h2">
            Acceso
          </Typography>
          <Box sx={{mt: 1}}>
            <Form style={{width: '100%'}}>
              <Stack p={1} spacing={1}>
                <CustomTextField label="Email" name="email" style={{width: 360}} />
                <ErrorMessage component={FormError} name="email" />
                <CustomTextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  style={{width: 360}}
                  type="password"
                />
                <ErrorMessage component={FormError} name="password" />
                <Button
                  disabled={fetching}
                  sx={{paddingY: '12px'}}
                  type="submit"
                  variant="contained"
                >
                  {fetching ? 'Ingresando...' : 'Ingresar'}
                </Button>
              </Stack>
            </Form>
          </Box>
        </Box>
      </Container>
    </Formik>
  )
}

export default SignIn
