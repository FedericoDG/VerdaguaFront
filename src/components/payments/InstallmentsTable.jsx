import {Avatar, Box, Grid, Typography} from '@mui/material'
import {nanoid} from 'nanoid'
import {useState} from 'react'

import Spinner from '../Spinner'

import InstallmentCard from './Installment'

const InstallmentsTable = ({installments, isFetchingInstallments, setInitialValues2}) => {
  const findOne = installments?.findIndex((el) => el.estado === 'pendiente')
  const [checked, setChecked] = useState(null)

  return (
    <div>
      <Box alignItems="center" display="flex" my={2}>
        <Avatar sx={{bgcolor: '#3700B3'}}>02</Avatar>
        <Typography mx={2} variant="button">
          Seleccionar Cuota a pagar
        </Typography>
      </Box>
      {!installments && isFetchingInstallments && <Spinner height={250} />}
      <Grid container justifyContent="space-between">
        {installments &&
          installments.map((installment, idx) => (
            <InstallmentCard
              key={nanoid()}
              checked={idx === checked}
              flag={idx !== findOne}
              idx={idx}
              installment={installment}
              setChecked={setChecked}
              setInitialValues2={setInitialValues2}
            />
          ))}
      </Grid>
    </div>
  )
}

export default InstallmentsTable
