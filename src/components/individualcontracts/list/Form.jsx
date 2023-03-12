/* eslint-disable camelcase */
import {Button, Chip, Grid, Stack, Typography} from '@mui/material'
import {ErrorMessage, Form, Formik} from 'formik'
import {useContext, useEffect} from 'react'

import appContext from '../../../context/AppContext'
import CustomSelect from '../../form/CustomSelect'
import CustomTextField from '../../form/CustomTextField'
import FormError from '../../form/FormError'
import useIndividualContractsComponents from '../../../hooks/useIndividualContractsComponents'

import validationSchema from './validationSchema'
import Sheet from './Sheet'

const IndividualContractsForm = ({
  initialValues,
  individualContract,
  setInitialValues,
  setShowEditState,
}) => {
  const {
    top,
    handleScroll,
    user: {id_rol},
  } = useContext(appContext)

  let estados = [{id: 'vigente'}, {id: 'pagado'}, {id: 'terminado'}, {id: 'cancelado'}]

  if (id_rol > 1) {
    estados = [{id: 'vigente'}, {id: 'pagado'}, {id: 'cancelado'}]
  }

  const {putIndividualContract, resetValues, isLoading} = useIndividualContractsComponents()

  const handleFormSubmit = async (value, {resetForm}) => {
    putIndividualContract(value)
    setInitialValues(resetValues)
    setShowEditState(false)
    resetForm()
  }

  useEffect(() => {
    if (individualContract?.id) {
      setInitialValues({
        ...individualContract,
        nuevo_valor: individualContract.valor_contrato,
      })
    }
  }, [individualContract])

  return (
    <>
      <Sheet initialValues={initialValues} />
      <Grid container alignItems="flex-start" marginBottom={2} marginTop={2} spacing={0}>
        <Grid item xs={3}>
          <Stack>
            <Chip color="secondary" label="vigente" size="small" sx={{width: 80}} />
            <Typography variant="subtitle2">Tiene un plan de cuotas asociado.</Typography>
            <Typography variant="subtitle2">Permanecen cuotas sin pagar.</Typography>
            <Typography variant="subtitle2">El viaje aún no se realizó.</Typography>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack>
            <Chip color="success" label="pagado" size="small" sx={{width: 80}} />
            <Typography variant="subtitle2">Tiene un plan de cuotas asociado.</Typography>
            <Typography variant="subtitle2">Todas las cuotas han sido pagadas.</Typography>
            <Typography variant="subtitle2">El viaje aún no se realizó.</Typography>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack>
            <Chip color="warning" label="terminado" size="small" sx={{width: 80}} />
            <Typography variant="subtitle2">Tiene un plan de cuotas asociado.</Typography>
            <Typography variant="subtitle2">Todas las cuotas han sido pagadas.</Typography>
            <Typography variant="subtitle2">El viaje ya se realizó.</Typography>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack>
            <Chip color="error" label="cancelado" size="small" sx={{width: 80}} />
            <Typography variant="subtitle2">No tiene un plan de cuotas asociado.</Typography>
          </Stack>
        </Grid>
      </Grid>
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
            <Grid item md={12} xs={12}>
              <Stack direction="row" pb={{xs: 1, md: 0}} spacing={1}>
                <CustomTextField disabled autoComplete="off" label="Código" name="cod_contrato" />
                <ErrorMessage component={FormError} name="cod_contrato" />
                <CustomTextField disabled autoComplete="off" label="Valor" name="valor_contrato" />
                <ErrorMessage component={FormError} name="valor_contrato" />
                <CustomTextField
                  disabled
                  autoComplete="off"
                  label="Pagos Realizados"
                  name="pagos"
                />
                <ErrorMessage component={FormError} name="pagos" />
                <CustomTextField
                  disabled
                  autoComplete="off"
                  label="Recargos por pagos 2do vencimiento"
                  name="recargos_pagos_segundo_vencimiento"
                />
                <ErrorMessage component={FormError} name="recargos_pagos_segundo_vencimiento" />
                <CustomSelect label="Estado" name="estado" options={estados.map((el) => el)} />
                <ErrorMessage component={FormError} name="estado" />
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
                Cambiar Estado
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                color="error"
                sx={{paddingY: '12px'}}
                type="reset"
                variant="outlined"
                onClick={() => {
                  setInitialValues(resetValues)
                  setShowEditState(false)
                  handleScroll(top)
                }}
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

export default IndividualContractsForm
