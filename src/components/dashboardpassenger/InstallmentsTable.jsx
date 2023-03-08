import {Alert, AlertTitle, Box, Grid, Typography} from '@mui/material'
import {nanoid} from 'nanoid'
import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

import InstallmentCard from './Installment'

const InstallmentsTable = ({installments, description}) => {
  const findOne = installments?.findIndex((el) => el.estado === 'pendiente')
  const [checked] = useState(null)

  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)
  const [failure, setFailure] = useState(false)

  const [searchParams] = useSearchParams()
  const feedback = searchParams.get('feedback')

  useEffect(() => {
    if (feedback === 'success') setSuccess(true)
    if (feedback === 'pending') setPending(true)
    if (feedback === 'failure') setFailure(true)
  }, [])

  return (
    <div>
      {success && (
        <Alert severity="success">
          <AlertTitle>Pago Aceptado</AlertTitle>
          <strong>MercadoPago aceptó tu pago.</strong>
        </Alert>
      )}
      {pending && (
        <Alert severity="warning">
          <AlertTitle>Procesando pago...</AlertTitle>
          <strong>
            MercadoPago aún está procesando tu pago. Te sugerimos esperar a que termine de hacerlo.
          </strong>
        </Alert>
      )}
      {failure && (
        <Alert severity="error">
          <AlertTitle>Pago Rechazado</AlertTitle>
          <strong>
            MercadoPago rechazó tu pago. Intenta más tarde o prueba con otro método de pago.
          </strong>
        </Alert>
      )}
      {installments.length === 0 ? (
        <Box alignItems="center" display="flex" my={2}>
          <Typography mx={2} variant="h6">
            PASAJERO LIBERADO, NO HAY CUOTAS
          </Typography>
        </Box>
      ) : (
        <>
          <Box alignItems="center" display="flex" my={2}>
            <Typography mx={2} variant="h6">
              Seleccionar la cuota a pagar
            </Typography>
          </Box>
          <Grid container justifyContent="space-between">
            {installments &&
              installments.map((installment, idx) => (
                <InstallmentCard
                  key={nanoid()}
                  checked={idx === checked}
                  description={description}
                  flag={idx !== findOne}
                  installment={installment}
                  installments={installments.length - 1}
                />
              ))}
          </Grid>
        </>
      )}
    </div>
  )
}

export default InstallmentsTable
