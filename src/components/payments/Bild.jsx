/* eslint-disable no-plusplus */
/* eslint-disable react/no-unstable-nested-components */
import {Avatar, Box, Button, Grid, Stack, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useQueryClient} from 'react-query'
import {useRef} from 'react'
import {useSnackbar} from 'notistack'
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone'
import ReactToPrint from 'react-to-print'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import logo from '../../assets/logo.png'
import NumeroALetras from '../../utils/numberToString'
import useCreatePay from '../../hooks/useInstallments'

const Bill = ({hardReset, initialValues, initialValues2}) => {
  const componentRef = useRef()

  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const onSuccess = (res) => {
    queryClient.invalidateQueries('installments')
    enqueueSnackbar(res.msg, {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    })
    hardReset()
    setTimeout(() => {
      navigate(`/dashboard/individual-contracts-list?id=${initialValues.contratoIndividual.id}`)
    }, 3000)
  }

  const {mutate: createPay} = useCreatePay(onSuccess)

  const today = new Date()

  return (
    <>
      <Box alignItems="center" display="flex" my={2}>
        <Avatar sx={{bgcolor: '#3700B3'}}>04</Avatar>
        <Typography mx={2} variant="button">
          Imprimir Recibo / Confirmar pago
        </Typography>
      </Box>
      <div ref={componentRef} style={{margin: '16px auto', width: '80%', position: 'relative'}}>
        <div
          style={{
            border: '2px solid black',
            width: '50px',
            position: 'absolute',
            left: 'calc(50% - 25px)',
            backgroundColor: '#ffffff',
          }}
        >
          <Typography align="center" variant="h4">
            X
          </Typography>
        </div>
        <Grid container justifyContent="space-between" style={{borderBottom: '1px solid black'}}>
          <Grid item style={{borderRight: '1px solid black'}} xs={6}>
            <Box sx={{borderWidth: 2, borderColor: '#0000', borderStyle: 'solid'}}>
              <img alt="logo" src={logo} style={{display: 'block', margin: 'auto'}} />
              <Typography align="center" sx={{display: 'block'}} variant="button">
                Agencia de Turismo S.R.L.
              </Typography>
              <Typography align="center" sx={{display: 'block'}} variant="button">
                San Martín 158 - Córdoba, Córdoba
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Stack justifyContent="space-between">
              <Box
                sx={{borderWidth: 2, borderColor: '#0000', borderStyle: 'solid', paddingLeft: 5}}
              >
                <Typography variant="h5">RECIBO</Typography>
                <Typography variant="h6">N° 123456789</Typography>
                <Box>
                  <Typography align="right" variant="body1" sx={{marginTop: 8}}>
                    FECHA: {formatDate(today)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <div style={{marginTop: ' 16px', marginBottom: ' 16px'}}>
          <Typography variant="h6" sx={{fontSize: 18}}>
            Señor/es: {initialValues2.destinatario}
          </Typography>
          <Typography variant="h6" sx={{fontSize: 18}}>
            Domicilio: {initialValues2.domicilio}
          </Typography>
        </div>
        <div style={{border: '1px solid #888888', padding: '16px'}}>
          <div style={{minHeight: '250px'}}>
            <Typography variant="body1" sx={{fontSize: 18}}>
              Recibí la suma de: {formatCurrency(initialValues2.movimiento.importe)} (
              {NumeroALetras(initialValues2.movimiento.importe, {
                plural: 'PESOS',
                singular: 'PESO',
                centPlural: 'CENTAVOS',
                centSingular: 'CENTAVO',
              })}
              ), en concepto de {initialValues2.movimiento.info}.
            </Typography>
          </div>
          <Typography variant="body1" sx={{fontSize: 18}}>
            Forma de pago: {initialValues2.movimiento.forma_pago}
          </Typography>
        </div>
        <Grid container justifyContent="space-between" style={{borderBottom: '1px solid black'}}>
          <Grid item style={{borderRight: '1px solid black'}} xs={6}>
            <Box sx={{borderWidth: 2, borderColor: '#0000', borderStyle: 'solid'}}>
              <Typography sx={{marginTop: 9}} variant="h5">
                Total: {formatCurrency(initialValues2.movimiento.importe)}
              </Typography>
            </Box>
          </Grid>
          <Grid item style={{paddingLeft: '16px'}} xs={6}>
            <Box sx={{borderWidth: 2, borderColor: '#0000', borderStyle: 'solid'}}>
              <Typography sx={{marginTop: 5}} variant="body1">
                Firma: . . . . . . . . . . . . . . . . . . . . . . . . . . . .
              </Typography>
              <Typography sx={{marginTop: 2}} variant="body1">
                Aclaración: . . . . . . . . . . . . . . . . . . . . . . . .
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Grid container gap={2} justifyContent="center">
        <Grid>
          <ReactToPrint
            content={() => componentRef.current}
            trigger={() => (
              <Button
                color="primary"
                startIcon={<LocalPrintshopTwoToneIcon />}
                sx={{paddingY: '12px', m: '16px auto', width: 300}}
                type="button"
                variant="outlined"
              >
                Imprimir Recibo
              </Button>
            )}
          />
        </Grid>
        <Grid>
          <Button
            color="primary"
            sx={{paddingY: '12px', m: '16px auto', width: 300}}
            type="button"
            variant="contained"
            onClick={() => {
              const body = {id: initialValues.contratoIndividual.id, ...initialValues2}

              createPay(body)
            }}
          >
            Generar Cobro
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Bill
