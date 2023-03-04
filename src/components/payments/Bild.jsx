/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unstable-nested-components */
import {Avatar, Box, Button, Grid, Stack, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useQueryClient} from 'react-query'
import {useRef, useState} from 'react'
import {useSnackbar} from 'notistack'
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone'
import {useReactToPrint} from 'react-to-print'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import logo from '../../assets/logo.png'
import NumeroALetras from '../../utils/numberToString'
import useCreatePay from '../../hooks/useInstallments'

const Bill = ({hardReset, initialValues, initialValues2}) => {
  const [disabled, setDisabled] = useState(true)

  const componentRef = useRef()

  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const fede = () => {
    handlePrint()
    setTimeout(() => {
      setDisabled(false)
    }, 2000)
  }

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

  const splitInfo = initialValues2.movimiento.info.split('.')

  return (
    <>
      <Box alignItems="center" display="flex" my={2}>
        <Avatar sx={{bgcolor: '#3700B3'}}>04</Avatar>
        <Typography mx={2} variant="button">
          Imprimir Recibo / Confirmar pago
        </Typography>
      </Box>
      <div ref={componentRef} style={{margin: '16px auto', width: '90%', position: 'relative'}}>
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
                Stella M. Romano y Asoc. S.R.L.
              </Typography>
              <Stack direction="row" display="flex" justifyContent="center">
                <Typography align="center" sx={{display: 'block', marginRight: 1}} variant="button">
                  CUIT: 30-70990854-1
                </Typography>
                <Typography align="center" sx={{display: 'block', marginLeft: 1}} variant="button">
                  LEGAJO: 13.149
                </Typography>
              </Stack>
              <Typography align="center" sx={{display: 'block'}} variant="button">
                Alberdi 1008 - Posadas, Misiones
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Stack justifyContent="space-between">
              <Box
                sx={{borderWidth: 2, borderColor: '#0000', borderStyle: 'solid', paddingLeft: 5}}
              >
                <Typography variant="h5">RECIBO DE PAGO</Typography>
                <Typography variant="h6">N° 123456789</Typography>
                <Box>
                  <Typography align="right" sx={{marginTop: 8}} variant="body1">
                    FECHA: {formatDate(today)}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <div style={{marginTop: ' 16px', marginBottom: ' 16px'}}>
          <Typography sx={{fontSize: 16}} variant="h6">
            Señor/es: {initialValues2.destinatario}
          </Typography>
          <Typography sx={{fontSize: 16}} variant="h6">
            DNI: {initialValues2.DNI}
          </Typography>
          <Typography sx={{fontSize: 16}} variant="h6">
            Domicilio: {initialValues2.domicilio}
          </Typography>
        </div>
        <div style={{border: '1px solid #888888', padding: '16px'}}>
          <div style={{minHeight: '250px'}}>
            <Stack direction="row" display="flex">
              <Typography sx={{fontSize: 16}} variant="body1">
                Recibí la suma de:
              </Typography>
              <Typography sx={{fontSize: 16, paddingLeft: 1, fontWeight: '500'}} variant="body1">
                {' '}
                {formatCurrency(
                  Number(initialValues2.movimiento.importe) +
                    Number(initialValues2.movimiento.recargo) -
                    Number(initialValues2.movimiento.descuento)
                )}{' '}
                (
                {NumeroALetras(
                  Number(initialValues2.movimiento.importe) +
                    Number(initialValues2.movimiento.recargo) -
                    Number(initialValues2.movimiento.descuento),
                  {
                    plural: 'pesos',
                    singular: 'peso',
                    centPlural: 'centavos',
                    centSingular: 'centavo',
                  }
                )}
                )
              </Typography>
              <Typography sx={{fontSize: 16}} variant="body1">
                , en concepto de {splitInfo[0].toString()}.
              </Typography>
            </Stack>
            <Typography sx={{fontSize: 16}} variant="body1">
              {splitInfo[1].toString()}
              {splitInfo[2].toString()}.
            </Typography>
            <Typography sx={{fontSize: 16}} variant="body1">
              {splitInfo[3].toString()}
            </Typography>
            <Typography sx={{fontSize: 16}} variant="body1">
              {splitInfo[4].toString()}
            </Typography>
          </div>
          <Typography sx={{fontSize: 16, fontWeight: '500'}} variant="body1">
            Forma de pago: {initialValues2.movimiento.forma_pago}
          </Typography>
          {initialValues2.movimiento.info_tarjeta_transferencia && (
            <Typography sx={{fontSize: 16}} variant="body1">
              {initialValues2.movimiento.info_tarjeta_transferencia}
            </Typography>
          )}
        </div>
        <Grid container justifyContent="space-between" style={{borderBottom: '1px solid black'}}>
          <Grid item style={{borderRight: '1px solid black'}} xs={6}>
            <Box sx={{borderWidth: 2, borderColor: '#0000', borderStyle: 'solid'}}>
              <Stack direction="row" display="flex" justifyContent="space-between" mx={1}>
                <Typography sx={{marginTop: 1}} variant="body1">
                  SubTotal:
                </Typography>
                <Typography sx={{marginTop: 1}} variant="body1">
                  {formatCurrency(Number(initialValues2.movimiento.importe))}
                </Typography>
              </Stack>
              {Number(initialValues2.movimiento.recargo) > 0 && (
                <>
                  <Stack direction="row" display="flex" justifyContent="space-between" mx={1}>
                    <Typography sx={{marginTop: 1}} variant="body1">
                      Recargo:
                    </Typography>
                    <Typography sx={{marginTop: 1}} variant="body1">
                      {formatCurrency(Number(initialValues2.movimiento.recargo))}
                    </Typography>
                  </Stack>
                  <Typography
                    align="right"
                    sx={{marginTop: 1, marginRight: 1, display: 'block'}}
                    variant="caption"
                  >
                    {initialValues2.movimiento.diferencia_descripcion}
                  </Typography>
                </>
              )}
              {Number(initialValues2.movimiento.descuento) > 0 && (
                <>
                  <Stack direction="row" display="flex" justifyContent="space-between" mx={1}>
                    <Typography sx={{marginTop: 1}} variant="body1">
                      Descuento:
                    </Typography>
                    <Typography sx={{marginTop: 1}} variant="body1">
                      {formatCurrency(Number(initialValues2.movimiento.descuento * -1))}
                    </Typography>
                  </Stack>
                  <Typography
                    align="right"
                    sx={{marginTop: 1, marginRight: 1, display: 'block'}}
                    variant="caption"
                  >
                    {initialValues2.movimiento.diferencia_descripcion}
                  </Typography>
                </>
              )}
              <Stack direction="row" display="flex" justifyContent="space-between" mx={1}>
                <Typography sx={{marginTop: 1}} variant="h6">
                  TOTAL:
                </Typography>
                <Typography sx={{marginTop: 1}} variant="h6">
                  {formatCurrency(
                    Number(initialValues2.movimiento.importe) +
                      Number(initialValues2.movimiento.recargo) -
                      Number(initialValues2.movimiento.descuento)
                  )}
                </Typography>
              </Stack>
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
          <Button
            color="primary"
            startIcon={<LocalPrintshopTwoToneIcon />}
            sx={{paddingY: '12px', m: '16px auto', width: 300}}
            type="button"
            variant="outlined"
            onClick={fede}
          >
            Imprimir Recibo
          </Button>
        </Grid>
        <Grid>
          <Button
            color="primary"
            disabled={disabled}
            sx={{paddingY: '12px', m: '16px auto', width: 300}}
            type="button"
            variant="contained"
            onClick={() => {
              const body = {id: initialValues.contratoIndividual.id, ...initialValues2}

              createPay(body)
            }}
          >
            {disabled ? 'Imprima para generar cobro' : 'Generar Cobro'}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Bill
