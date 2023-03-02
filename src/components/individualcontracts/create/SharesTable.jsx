/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-plusplus */
import {
  Avatar,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {DateTime} from 'luxon'
import {nanoid} from 'nanoid'
import {useNavigate} from 'react-router-dom'
import {useQueryClient} from 'react-query'
import {useRef} from 'react'
import {useSnackbar} from 'notistack'
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone'
import ReactToPrint from 'react-to-print'

import formatCurrency from '../../../utils/formatCurrency'
import formatDate from '../../../utils/formatDate'
import {usePostIndividualContract} from '../../../hooks/useIndividualContracts'

const SharesTable = ({
  contratoGeneral,
  pasajero,
  valor,
  cuotas,
  settings,
  sendButton,
  handleCancel,
}) => {
  const componentRef = useRef()

  const codigo = `${contratoGeneral.label.substring(0, 7)}/${pasajero.label.substring(0, 8)}`
  const {id} = contratoGeneral

  const daysToNextShare = Number(settings.dias_diferencia_cuotas)
  const charge = Number(settings.porcentaje_recargo_segundo_vencimiento)
  const advancePaymentPercentage = Number(settings.porcentaje_senia)
  const advancePayment = (valor * advancePaymentPercentage) / 100
  const balance = valor - advancePayment
  const share = balance / cuotas

  const date = DateTime.now()

  const sharesArray = [
    {
      numero: 0,
      fecha_primer_vencimiento: date.toJSDate(),
      fecha_segundo_vencimiento: date.toJSDate(),
      valor_primer_vencimiento: advancePayment,
      valor_segundo_vencimiento: advancePayment,
      estado: 'pendiente',
      id_contrato_individual: id,
    },
  ]

  for (let index = 0; index < cuotas; index++) {
    const partial = {
      numero: index + 1,
      fecha_primer_vencimiento: date.plus({days: daysToNextShare * (index + 1)}).toJSDate(),
      fecha_segundo_vencimiento: date.plus({days: daysToNextShare * (index + 2)}).toJSDate(),
      valor_primer_vencimiento: share,
      valor_segundo_vencimiento: share + (share * charge) / 100,
      estado: 'pendiente',
      id_contrato_individual: id,
    }

    sharesArray.push(partial)
  }

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
    handleCancel()
    setTimeout(() => {
      navigate(`/dashboard/payments?id=${res.data.id}`)
    }, 3000)
  }

  const {mutate: postIndividualContract} = usePostIndividualContract(onSuccess)

  const handleSubmit = () => {
    const body = {
      id_contrato_general: contratoGeneral.id,
      id_pasajero: pasajero.id,
      valor,
      codigo_contrato_individual: codigo,
      cuotas: sharesArray,
    }

    postIndividualContract({...body})
  }

  return (
    <>
      <Box alignItems="center" display="flex" mb={2}>
        <Avatar sx={{bgcolor: '#3700B3'}}>03</Avatar>
        <Typography mx={2} variant="button">
          Crear Contrato Individual
        </Typography>
      </Box>
      <div ref={componentRef}>
        <Grid container alignItems="center" gap={1} justifyContent="right" spacing={0}>
          <Grid>
            <Typography align="right" color="inherit" variant="h6">
              Código del contrato:
            </Typography>
          </Grid>
          <Grid>
            <Typography align="right" color="primary" variant="h5">
              {codigo}
            </Typography>
          </Grid>
        </Grid>
        <TableContainer sx={{backgroundColor: '#f7f7f7'}}>
          <Table size="small" sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Cuota</TableCell>
                <TableCell align="center">Fecha primer vencimiento</TableCell>
                <TableCell align="center">Valor primer vencimiento</TableCell>
                <TableCell align="center">Fecha segundo vencimiento</TableCell>
                <TableCell align="center">Valor segundo vencimiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sharesArray.map((row, idx) => (
                <TableRow key={nanoid()} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="center" component="th" scope="row">
                    {idx === 0 ? 'seña' : row.numero}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.fecha_primer_vencimiento)}</TableCell>
                  <TableCell align="center">
                    {formatCurrency(row.valor_primer_vencimiento)}
                  </TableCell>
                  <TableCell align="center">{formatDate(row.fecha_segundo_vencimiento)}</TableCell>
                  <TableCell align="center">
                    {formatCurrency(row.valor_segundo_vencimiento)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Grid container gap={2} justifyContent="center">
        <Grid>
          <ReactToPrint
            content={() => componentRef.current}
            trigger={() => (
              <Button
                ref={sendButton}
                color="primary"
                startIcon={<LocalPrintshopTwoToneIcon />}
                sx={{paddingY: '12px', m: '16px auto', width: 300}}
                type="reset"
                variant="outlined"
                onClick={handleSubmit}
              >
                Imprimir plan de pago
              </Button>
            )}
          />
        </Grid>
        <Grid>
          <Button
            ref={sendButton}
            color="primary"
            sx={{paddingY: '12px', m: '16px auto', width: 300}}
            type="reset"
            variant="contained"
            onClick={handleSubmit}
          >
            Crear contrato individual
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SharesTable
