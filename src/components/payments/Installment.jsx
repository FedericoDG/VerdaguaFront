import {Button, CardActions, CardContent, Typography, Grid, Paper} from '@mui/material'
import {DateTime} from 'luxon'
import {useContext} from 'react'
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import appContext from '../../context/AppContext'

const InstallmentCard = ({
  installment,
  setInitialValues2,
  flag,
  setChecked,
  checked,
  idx,
  installments,
  initialValues2,
}) => {
  const {handleScroll, bottom} = useContext(appContext)

  const today = DateTime.now()
  const firstExpiration = DateTime.fromISO(installment.fecha_primer_vencimiento)

  const recargo =
    Number(installment.valor_segundo_vencimiento) - Number(installment.valor_primer_vencimiento)

  let info = `pago de cuota ${installment.numero} de ${installments}. Saldo: ${formatCurrency(
    Number(installment.contrato_individual.valor_contrato) -
      Number(installment.contrato_individual.pagos) -
      Number(installment.valor_primer_vencimiento)
  )}. Contrato: ${installment.contrato_individual.cod_contrato}. Pasajero: ${
    installment.contrato_individual.pasajero.nombre
  } ${installment.contrato_individual.pasajero.apellido}, DNI: ${
    installment.contrato_individual.pasajero.documento
  }`

  if (idx === 0) {
    info = `pago de seña. Saldo: ${formatCurrency(
      Number(installment.contrato_individual.valor_contrato) -
        Number(installment.contrato_individual.pagos) -
        Number(installment.valor_primer_vencimiento)
    )}. Contrato: ${installment.contrato_individual.cod_contrato}. Pasajero: ${
      installment.contrato_individual.pasajero.nombre
    } ${installment.contrato_individual.pasajero.apellido}, DNI: ${
      installment.contrato_individual.pasajero.documento
    }`
  }

  return (
    <Paper
      component="div"
      sx={{
        position: 'relative',
        m: 1,
        maxWidth: 360,
        opacity: installment.estado === 'pagada' && '0.33',
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
      {checked && (
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
          disabled={flag}
          size="small"
          onClick={() => {
            setChecked(idx)
            handleScroll(bottom)
            if (today >= firstExpiration) {
              setInitialValues2((prev) => ({
                ...prev,
                cod_contrato: installment.contrato_individual.cod_contrato,
                cuota: {id: installment.id, estado: 'pagada'},
                movimiento: {
                  ...prev.movimiento,
                  importe:
                    Number(installment.valor_segundo_vencimiento) +
                    Number(initialValues2.movimiento.recargo) -
                    Number(initialValues2.movimiento.descuento),
                  info,
                },
                contratoIndividual: {
                  pago: installment.valor_primer_vencimiento,
                  recargo,
                },
                destinatario: `${installment.contrato_individual.pasajero.responsable.nombre} ${installment.contrato_individual.pasajero.responsable.apellido}`,
                DNI: `${installment.contrato_individual.pasajero.responsable.documento}`,
                domicilio: `${installment.contrato_individual.pasajero.responsable.direccion}, ${installment.contrato_individual.pasajero.responsable.ciudad} (${installment.contrato_individual.pasajero.responsable.ciudad})`,
              }))
            }
            if (today < firstExpiration) {
              setInitialValues2((prev) => ({
                ...prev,
                cod_contrato: installment.contrato_individual.cod_contrato,
                cuota: {id: installment.id, estado: 'pagada'},
                movimiento: {
                  ...prev.movimiento,
                  importe:
                    Number(installment.valor_primer_vencimiento) +
                    Number(initialValues2.movimiento.recargo) -
                    Number(initialValues2.movimiento.descuento),
                  info,
                },
                contratoIndividual: {
                  pago: installment.valor_primer_vencimiento,
                  recargo: 0,
                },
                destinatario: `${installment.contrato_individual.pasajero.responsable.nombre} ${installment.contrato_individual.pasajero.responsable.apellido}`,
                DNI: `${installment.contrato_individual.pasajero.responsable.documento}`,
                domicilio: `${installment.contrato_individual.pasajero.responsable.direccion}, ${installment.contrato_individual.pasajero.responsable.ciudad} (${installment.contrato_individual.pasajero.responsable.ciudad})`,
              }))
            }
          }}
        >
          Pagar
        </Button>
      </CardActions>
    </Paper>
  )
}

export default InstallmentCard
