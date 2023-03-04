import {Box, Grid, Typography} from '@mui/material'
import {nanoid} from 'nanoid'
import {useState} from 'react'

import InstallmentCard from './Installment'

const InstallmentsTable = ({installments}) => {
  const findOne = installments?.findIndex((el) => el.estado === 'pendiente')
  const [checked, setChecked] = useState(null)

  return (
    <div>
      <Box alignItems="center" display="flex" my={2}>
        <Typography mx={2} variant="h6">
          Seleccionar Cuota a pagar
        </Typography>
      </Box>
      <Grid container justifyContent="space-between">
        {installments &&
          installments.map((installment, idx) => (
            <InstallmentCard
              key={nanoid()}
              checked={idx === checked}
              flag={idx !== findOne}
              idx={idx}
              installment={installment}
              installments={installments.length}
              setChecked={setChecked}
            />
          ))}
      </Grid>
    </div>
  )
}

export default InstallmentsTable
