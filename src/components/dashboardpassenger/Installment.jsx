import {Button, CardActions, CardContent, Typography, Grid, Paper} from '@mui/material'
import {DateTime} from 'luxon'
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone'
import {useEffect, useState} from 'react'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import usePostMercadopago from '../../hooks/UseMercadopago'

const InstallmentCard = ({checked, description, flag, installment, installments}) => {
  const [initPoint, setInitPoint] = useState(null)

  const onSuccess = (res) => {
    setInitPoint(res.data.body.init_point)
  }

  const {mutate: postMercadopago} = usePostMercadopago(onSuccess)

  const today = DateTime.now()
  const firstExpiration = DateTime.fromISO(installment.fecha_primer_vencimiento)

  useEffect(() => {
    if (flag) return
    const items = []
    let item = {
      id: installment.id,
      quantity: 1,
      unit_price: Number(installment.valor_segundo_vencimiento),
      title: description,
      currency_id: 'ARS',
    }

    if (today >= firstExpiration) {
      items.push(item)
    } else {
      item = {...item, unit_price: Number(installment.valor_primer_vencimiento)}
      items.push(item)
    }
    postMercadopago({
      items,
      id_contrato_individual: installment.id_contrato_individual,
      installments,
    })
  }, [])

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
          color="#7BC47F"
          sx={{top: 50, left: 50, position: 'absolute', transform: 'rotate(-23deg)', opacity: 0.75}}
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
        <a
          href={initPoint}
          rel="noopener noreferrer"
          style={{color: 'unset', textDecoration: 'none', width: '100%'}}
        >
          <Button
            fullWidth
            color="success"
            disabled={flag || !initPoint}
            size="small"
            variant="contained"
            onClick={() => console.log(installment)}
          >
            Pagar
          </Button>
        </a>
      </CardActions>
    </Paper>
  )
}

export default InstallmentCard
