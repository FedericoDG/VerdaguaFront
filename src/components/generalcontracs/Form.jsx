import {Button, Grid, Stack} from '@mui/material'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import {useEffect} from 'react'

import {formatENDate} from '../../utils/formatDate'
import CustomAutocomplete from '../form/CustomAutocomplete'
import CustomDatePicker from '../form/CustomDatePicker'
import CustomSelect from '../form/CustomSelect'
import CustomTextField from '../form/CustomTextField'
import FormError from '../form/FormError'
import useGeneralContractsComponents from '../../hooks/useGeneralContractsComponets'

import validationSchema from './validationSchema'

const states = [
  {id: 'vigente', name: 'vigente'},
  {id: 'terminado', name: 'terminado'},
  {id: 'cancelado', name: 'cancelado'},
]

const GeneralContractsForm = ({
  generalContract,
  initialValues,
  institutionCodes,
  setInitialValues,
}) => {
  const {postGeneralContract, putGeneralContract, resetValues} = useGeneralContractsComponents()

  const handleFormSubmit = async (value, {resetForm}) => {
    const valuesToUpperCase = {
      ...value,
      descripcion: value.descripcion.toUpperCase(),
      grado: value.grado.toUpperCase(),
      division: value.division.toUpperCase(),
      turno: value.turno.toUpperCase(),
    }

    if (initialValues?.id) {
      putGeneralContract({...valuesToUpperCase, id_institucion: value.institucion.id})
    } else {
      postGeneralContract({...valuesToUpperCase, id_institucion: value.institucion.id})
    }
    setInitialValues(resetValues)
    resetForm()
  }

  useEffect(() => {
    if (generalContract?.id) {
      setInitialValues({
        ...generalContract,
        fecha_viaje: formatENDate(generalContract.fecha_viaje),
        institucion: `${generalContract.institucion.nombre} - ${generalContract.institucion.direccion}, ${generalContract.institucion.localidad}`,
      })
    }
  }, [generalContract])

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
              <CustomTextField autoComplete="off" label="Descripción" name="descripcion" />
              <ErrorMessage component={FormError} name="descripcion" />
              <CustomDatePicker
                inputProps={{
                  min: formatENDate(new Date()),
                }}
                label="Fecha del viaje"
                name="fecha_viaje"
              />
              <CustomSelect
                disabled={!initialValues?.id}
                label="Estado"
                name="estado"
                options={states}
              />
              <Grid container>
                <Grid item paddingRight={1} xs={6}>
                  <CustomTextField
                    autoComplete="off"
                    label="Valor del contrato"
                    name="valor_contrato"
                  />
                  <ErrorMessage component={FormError} name="valor_contrato" />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    autoComplete="off"
                    label="Cupo de pasajeros"
                    name="asientos_totales"
                  />
                  <ErrorMessage component={FormError} name="asientos_totales" />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack pb={{xs: 1, md: 0}} spacing={1}>
              <Grid container>
                <Grid item paddingRight={1} xs={4}>
                  <CustomTextField autoComplete="off" label="Grado" name="grado" />
                  <ErrorMessage component={FormError} name="grado" />
                </Grid>
                <Grid item paddingRight={1} xs={4}>
                  <CustomTextField autoComplete="off" label="División" name="division" />
                  <ErrorMessage component={FormError} name="division" />
                </Grid>
                <Grid item xs={4}>
                  <CustomTextField autoComplete="off" label="Turno" name="turno" />
                  <ErrorMessage component={FormError} name="turno" />
                </Grid>
              </Grid>
              <Field
                component={CustomAutocomplete}
                label="Institución educativa"
                name="institucion"
                options={institutionCodes}
                textFieldProps={{
                  fullWidth: true,
                  variant: 'outlined',
                }}
              />
              <CustomTextField autoComplete="off" label="Enlace al Contrato" name="contract_url" />
              <ErrorMessage component={FormError} name="contract_url" />
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

export default GeneralContractsForm
