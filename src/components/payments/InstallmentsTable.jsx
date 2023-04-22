import {Avatar, Box, Grid, Typography} from '@mui/material'
import {nanoid} from 'nanoid'

import Spinner from '../Spinner'

import InstallmentCard from './Installment'

const InstallmentsTable = ({
  installments,
  isFetchingInstallments,
  setCart,
  setInitialValues2,
  initialValues2,
  cart,
}) => (
  <div>
    <Box alignItems="center" display="flex" mb={1} mt={2}>
      <Avatar sx={{bgcolor: '#3700B3'}}>02</Avatar>
      <Typography mx={2} variant="button">
        Seleccionar cuota a pagar
      </Typography>
    </Box>
    {(!installments || isFetchingInstallments) && <Spinner height={160} />}
    <Grid container justifyContent="space-between">
      {installments &&
        installments.map((installment, idx) => (
          <InstallmentCard
            key={nanoid()}
            cart={cart}
            idx={idx}
            initialValues2={initialValues2}
            installment={installment}
            installments={installments}
            setCart={setCart}
            setInitialValues2={setInitialValues2}
          />
        ))}
    </Grid>
  </div>
)

export default InstallmentsTable
