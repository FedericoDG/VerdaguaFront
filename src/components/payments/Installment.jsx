/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
import {Button, CardActions, CardContent, Typography, Grid, Paper} from '@mui/material'
import {DateTime} from 'luxon'
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

const InstallmentCard = ({installment, setInitialValues2, installments, setCart, cart}) => {
  const today = DateTime.now()
  const firstExpiration = DateTime.fromISO(installment.fecha_primer_vencimiento)
  const pasajero = `${installment.contrato_individual.pasajero.apellido}, ${installment.contrato_individual.pasajero.nombre}. DNI: ${installment.contrato_individual.pasajero.documento}`

  const fede = (installment) => {
    const inst = installments.filter((el) => el.estado === 'pendiente')

    if (installment.estado === 'pendiente' && cart.length === 0 && installment.id === inst[0].id) {
      return false
    }

    if (
      cart.find((el) => el.id === installment.id) &&
      (cart[0]?.numero || 0) + cart.length === installment.numero
    ) {
      return false
    }

    if (cart.length > 0 && cart.at(-1).numero === installment.numero - 1) {
      return false
    }

    return true
  }

  return (
    <Paper
      component="div"
      sx={{
        position: 'relative',
        m: 1,
        maxWidth: 360,
        opacity: (installment.estado === 'pagada' || installment.estado === 'en-proceso') && '0.5',
      }}
    >
      {installment.estado === 'pagada' && (
        <Typography
          color="secondary"
          sx={{top: 50, left: 50, position: 'absolute', transform: 'rotate(-23deg)', opacity: 0.6}}
          variant="h2"
        >
          PAGADA
        </Typography>
      )}
      {installment.estado === 'en-proceso' && (
        <Typography
          color="#bebc27"
          sx={{top: 40, left: 10, position: 'absolute', transform: 'rotate(-20deg)', opacity: 0.75}}
          variant="h3"
        >
          PROCESANDO
        </Typography>
      )}
      {cart.find((el) => el.id === installment.id) && (
        <LocalAtmTwoToneIcon
          color="success"
          sx={{top: 5, right: 5, position: 'absolute', fontSize: 32, opacity: 0.75}}
        />
      )}
      <CardContent>
        <Typography align="center" color="text.secondary">
          {installment.numero === 0 ? 'seña' : `cuota ${installment.numero}`}
        </Typography>
        <Grid container spacing={1}>
          <Grid
            item
            sx={{
              opacity: today >= firstExpiration && installment.estado !== 'pagada' ? '0.33' : '1',
            }}
            xs={6}
          >
            <Typography component="div" variant="button">
              1er. vencimiento
            </Typography>
            <Typography component="div" variant="body1">
              Fecha: {formatDate(installment.fecha_primer_vencimiento)}
            </Typography>
            <Typography component="div" variant="body1">
              Monto: {formatCurrency(installment.valor_primer_vencimiento)}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              opacity: today < firstExpiration && installment.estado !== 'pagada' ? '0.33' : '1',
            }}
            xs={6}
          >
            <Typography component="div" variant="button">
              2do. vencimiento
            </Typography>
            <Typography component="div" variant="body1">
              Fecha: {formatDate(installment.fecha_segundo_vencimiento)}
            </Typography>
            <Typography component="div" variant="body1">
              Monto: {formatCurrency(installment.valor_segundo_vencimiento)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          disabled={fede(installment)}
          size="small"
          onClick={() => {
            if (today >= firstExpiration) {
              /* if (cart.find((el) => el.id === installment.id)) {
                setCart((prev) => prev.filter((el) => el.id !== installment.id))
              } else { */
              setCart((prev) => [
                ...prev,
                {
                  id: installment.id,
                  numero: installment.numero,
                  estado: 'pagada',
                  valor: Number(installment.valor_primer_vencimiento),
                  recargo:
                    Number(installment.valor_segundo_vencimiento) -
                    Number(installment.valor_primer_vencimiento),
                },
              ])
              /* } */

              setInitialValues2((prev) => ({
                ...prev,
                cuotas: cart,
                destinatario: `${installment.contrato_individual.pasajero.responsable.nombre} ${installment.contrato_individual.pasajero.responsable.apellido}`,
                DNI: `${installment.contrato_individual.pasajero.responsable.documento}`,
                domicilio: `${installment.contrato_individual.pasajero.responsable.direccion}, ${installment.contrato_individual.pasajero.responsable.ciudad} (${installment.contrato_individual.pasajero.responsable.provincia})`,
                cod_contrato: installment.contrato_individual.cod_contrato,
                pasajero,
              }))
            }
            if (today < firstExpiration) {
              /* if (cart.find((el) => el.id === installment.id)) {
                setCart((prev) => prev.filter((el) => el.id !== installment.id))
              } else { */
              setCart((prev) => [
                ...prev,
                {
                  id: installment.id,
                  numero: installment.numero,
                  estado: 'pagada',
                  valor: Number(installment.valor_primer_vencimiento),
                  recargo: 0,
                },
              ])
              /* } */

              setInitialValues2((prev) => ({
                ...prev,
                cuotas: cart,
                destinatario: `${installment.contrato_individual.pasajero.responsable.nombre} ${installment.contrato_individual.pasajero.responsable.apellido}`,
                DNI: `${installment.contrato_individual.pasajero.responsable.documento}`,
                domicilio: `${installment.contrato_individual.pasajero.responsable.direccion}, ${installment.contrato_individual.pasajero.responsable.ciudad} (${installment.contrato_individual.pasajero.responsable.ciudad})`,
                cod_contrato: installment.contrato_individual.cod_contrato,
                pasajero,
              }))
            }
          }}
        >
          {cart.find((el) => el.id === installment.id)
            ? 'Cuota Agregada'
            : installment.estado === 'pagada'
            ? '.'
            : 'Agregar'}
        </Button>
      </CardActions>
    </Paper>
  )
}

export default InstallmentCard
