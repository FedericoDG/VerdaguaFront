import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import {
  useGetIndividualContractByDocument,
  useGetInstallments,
} from '../hooks/useIndividualContracts'
import {logoutAction} from '../context/actions/auth'
import appContext from '../context/AppContext'
import InstallmentsTable from '../components/dashboardpassenger/InstallmentsTable'
import formatCurrency from '../utils/formatCurrency'

const DashboardPassenger = () => {
  const {user, dispatch} = useContext(appContext)

  const {data: contratoIndividual = []} = useGetIndividualContractByDocument(user.documento)

  const {data: installments = []} = useGetInstallments(contratoIndividual[0]?.id)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dispatch(logoutAction())
  }

  if (
    !contratoIndividual ||
    contratoIndividual.length === 0 ||
    !installments ||
    installments.length === 0
  )
    return <p>Cargando...</p>

  return (
    <Grid item xs={12}>
      {/*  */}
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" edge="start" size="large" sx={{mr: 2}} />
            <Typography component="div" sx={{flexGrow: 1}} variant="h6">
              ¡Hola, {user.nombre}!
            </Typography>
            <Button color="inherit" onClick={logout}>
              Salir
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/*  */}
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
              <Stack
                direction="row"
                display="flex"
                justifyContent="space-between"
                sx={{marginBottom: 3}}
              >
                <Typography variant="button">
                  {user.nombre} {user.apellido}
                </Typography>
                <Typography variant="button">DNI: {user.documento}</Typography>
              </Stack>
              <Stack direction="row" display="flex" justifyContent="space-between">
                <Typography variant="button">Código Contrato:</Typography>
                <Typography variant="button">{contratoIndividual[0].cod_contrato}</Typography>
              </Stack>
              <Typography variant="body2" sx={{marginBottom: 3}}>
                Descripción: {contratoIndividual[0].contrato_general.descripcion}
              </Typography>
              <Stack direction="row" display="flex" justifyContent="space-between">
                <Typography variant="button">Valor del contrato:</Typography>
                <Typography variant="button">
                  {formatCurrency(contratoIndividual[0].valor_contrato)}
                </Typography>
              </Stack>
              <Stack direction="row" display="flex" justifyContent="space-between">
                <Typography variant="button">Pagos:</Typography>
                <Typography variant="button">
                  {formatCurrency(contratoIndividual[0].pagos)}
                </Typography>
              </Stack>
              <Divider />
              <Stack direction="row" display="flex" justifyContent="space-between">
                <Typography variant="button">Saldo:</Typography>
                <Typography variant="button">
                  {formatCurrency(
                    Number(contratoIndividual[0].valor_contrato) -
                      Number(contratoIndividual[0].pagos)
                  )}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item md={8} xs={12}>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
              <InstallmentsTable installments={installments} />
            </Paper>
          </Grid>
        </Grid>
        {/*  <Copyright /> */}
      </Container>
    </Grid>
  )
}

export default DashboardPassenger
