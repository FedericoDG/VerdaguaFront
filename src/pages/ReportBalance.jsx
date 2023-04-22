/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Typography from '@mui/material/Typography'
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {nanoid} from 'nanoid'
import {useSearchParams} from 'react-router-dom'
import {useContext, useRef} from 'react'
import {useReactToPrint} from 'react-to-print'
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone'

import appContext from '../context/AppContext'
import Dashboard from '../components/Dashboard'
import formatCurrency from '../utils/formatCurrency'
import formatDate from '../utils/formatDate'
import Spinner from '../components/Spinner'
import useGetBalance from '../hooks/useBalance'

const BalanceReport = () => {
  const {user} = useContext(appContext)

  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const idUser = searchParams.get('iduser')

  const all = {
    desde: from,
    hasta: to,
    info: '',
    idUser,
  }

  const {data = [], isFetching} = useGetBalance(all)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  if (isFetching) return <Spinner height="100vh" />

  if (!data) return <h1>NO ENCONTRADO/ACCESO RESTRIGIDO</h1>

  const {movements, cash, debit, credit, transference, mercadopago, totalIncomes, totalOutcomes} =
    data

  return (
    <Dashboard>
      <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
        <Button
          color="primary"
          startIcon={<LocalPrintshopTwoToneIcon />}
          sx={{paddingY: '12px', ml: 'auto', width: 300, my: 1}}
          type="button"
          variant="outlined"
          onClick={handlePrint}
        >
          Imprimir Reporte
        </Button>
        <div
          ref={componentRef}
          style={{
            padding: '8px',
            width: '29.7cm',
            margin: '0 auto',
            overflowX: 'auto',
          }}
        >
          {user.id_rol === 1 ? (
            <Typography align="left" sx={{display: 'block'}} variant="button">
              <strong>TODOS LOS USUARIOS</strong>
            </Typography>
          ) : (
            <Typography align="left" sx={{display: 'block'}} variant="button">
              Usuario:{' '}
              <strong>
                {user.apellido} {user.nombre}
              </strong>
            </Typography>
          )}

          <Typography align="left" variant="button">
            desde: {formatDate(from)} - hasta {formatDate(to)}
          </Typography>

          <Typography sx={{mt: 2}} variant="h6">
            Balance
          </Typography>

          <TableContainer style={{marginTop: '16px'}}>
            <Table size="small">
              <TableHead style={{backgroundColor: '#dddddd'}}>
                <TableRow>
                  <TableCell align="center">Ingresos</TableCell>
                  <TableCell align="center">Egresos</TableCell>
                  <TableCell align="center">TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={nanoid()}>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(totalIncomes)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(totalOutcomes)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption">
                      <strong>{formatCurrency(totalIncomes + totalOutcomes)}</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography sx={{mt: 2}} variant="h6">
            Ingresos
          </Typography>

          <TableContainer style={{marginTop: '16px'}}>
            <Table size="small">
              <TableHead style={{backgroundColor: '#dddddd'}}>
                <TableRow>
                  <TableCell align="center">Efectivo</TableCell>
                  <TableCell align="center">Débito</TableCell>
                  <TableCell align="center">Crédito</TableCell>
                  <TableCell align="center">Transferencia</TableCell>
                  <TableCell align="center">Mercadopago</TableCell>
                  <TableCell align="center">TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={nanoid()}>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(cash)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(debit)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(credit)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(transference)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(mercadopago)}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption">{formatCurrency(totalIncomes)}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography sx={{mt: 2}} variant="h6">
            Detalles
          </Typography>

          <TableContainer style={{marginTop: '16px'}}>
            <Table size="small">
              <TableHead style={{backgroundColor: '#dddddd'}}>
                <TableRow>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Importe</TableCell>
                  <TableCell align="center">Tipo</TableCell>
                  <TableCell align="center">Forma de pago</TableCell>
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center">Usuario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movements.map((el) => (
                  <TableRow key={nanoid()}>
                    <TableCell align="center">
                      <Typography variant="caption">{formatDate(el.created_at)}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="caption">{formatCurrency(el.importe)}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="caption">{el.tipo}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="caption">{el.forma_pago}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="caption">{el.info}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="caption">
                        {el.usuario.nombre} {el.usuario.apellido}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </Dashboard>
  )
}

export default BalanceReport
