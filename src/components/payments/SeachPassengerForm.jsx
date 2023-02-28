import {Avatar, Box, Button, Grid, Stack, Typography} from '@mui/material'
import {Field, Form, Formik} from 'formik'
import {useContext} from 'react'

import appContext from '../../context/AppContext'
import CustomAutocomplete from '../form/CustomAutocomplete'

import validationSchema from './validationSchema'

const SeachPassengerForm = ({
  initialValues,
  passengerCodes,
  setInitialValues,
  setShowInstallments,
  form1Ref,
  hardReset,
  id,
}) => {
  const {handleScroll, bottom} = useContext(appContext)

  const handleSubmitPassengerForm = ({contratoIndividual}) => {
    setInitialValues((prev) => ({...prev, contratoIndividual}))
    setShowInstallments(true)
    handleScroll(bottom)
  }

  return (
    <>
      <Typography variant="h6">Pagos</Typography>
      <Button
        disableElevation
        color="error"
        sx={{paddingY: '12px', mb: 2, width: 300, ml: 'auto'}}
        type="reset"
        variant="contained"
        onClick={hardReset}
      >
        Limpiar
      </Button>
      <Box alignItems="center" display="flex" mb={2}>
        <Avatar sx={{bgcolor: '#3700B3'}}>01</Avatar>
        <Typography mx={2} variant="button">
          Consultar Pasajero
        </Typography>
      </Box>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        innerRef={form1Ref}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={handleSubmitPassengerForm}
      >
        <Form style={{width: '100%'}}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Stack pb={{xs: 1, md: 0}} spacing={1}>
                <Field
                  component={CustomAutocomplete}
                  disabled={!!initialValues && !!id}
                  label="DNI Pasajero"
                  name="contratoIndividual"
                  options={passengerCodes}
                  textFieldProps={{
                    fullWidth: true,
                    variant: 'outlined',
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid container mt={1} spacing={1}>
            <Grid item xs={6}>
              <Button
                disableElevation
                fullWidth
                color="primary"
                disabled={!!id}
                m={2}
                sx={{paddingY: '12px'}}
                type="submit"
                variant="outlined"
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

export default SeachPassengerForm
