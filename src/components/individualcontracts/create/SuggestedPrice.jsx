import {DateTime} from 'luxon'
import {Grid, Typography} from '@mui/material'

import formatCurrency from '../../../utils/formatCurrency'

const SuggestedPrice = ({settings, generalContract}) => {
  const today = DateTime.now()
  const contractDate = DateTime.fromISO(generalContract.created_at)

  if (contractDate.plus({days: settings.alerta_dias_contrato_general}) < today) {
    return (
      <>
        <Grid container alignItems="center" gap={1} justifyContent="right" spacing={0}>
          <Grid>
            <Typography align="right" color="error" variant="button">
              {`Han pasado más de ${settings.alerta_dias_contrato_general} días desde la creación del Contrato general`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" gap={1} justifyContent="right" spacing={0}>
          <Grid>
            <Typography align="right" color="inherit" variant="h6">
              Precio sugerido:
            </Typography>
          </Grid>
          <Grid>
            <Typography align="right" color="primary" variant="h5">
              {formatCurrency(
                Number(generalContract.valor_contrato) +
                  (Number(generalContract.valor_contrato) *
                    settings.porcentaje_alerta_dias_contrato_general) /
                    100
              )}
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <Grid container alignItems="center" gap={1} justifyContent="right" spacing={0}>
      <Grid>
        <Typography align="right" color="inherit" variant="h6">
          Precio sugerido:
        </Typography>
      </Grid>
      <Grid>
        <Typography align="right" color="primary" variant="h5">
          {formatCurrency(generalContract.valor_contrato)}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SuggestedPrice
