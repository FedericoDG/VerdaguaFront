/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Typography from '@mui/material/Typography'
import {
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {nanoid} from 'nanoid'
import {useParams, useSearchParams} from 'react-router-dom'
import {useContext, useRef} from 'react'
import {useReactToPrint} from 'react-to-print'
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone'

import {UseGetGeneralContractById} from '../hooks/useGeneralContracts'
import appContext from '../context/AppContext'
import Dashboard from '../components/Dashboard'
import formatCurrency from '../utils/formatCurrency'
import formatDate from '../utils/formatDate'
import Spinner from '../components/Spinner'

const Report = () => {
  const {
    user: {id_rol},
  } = useContext(appContext)
  const {id} = useParams()

  const [searchParams] = useSearchParams()
  const onlypassenger = searchParams.get('onlypassenger')

  const {data, isFetching} = UseGetGeneralContractById(id)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  if (isFetching) return <Spinner height="100vh" />

  if (!data) return <h1>NO ENCONTRADO/ACCESO RESTRIGIDO</h1>

  const {generalContract} = data

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
          <Grid container justifyContent="space-between" p={1}>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Código:</span> {generalContract.cod_contrato}
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Destino:</span> {generalContract.descripcion}
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Fecha viaje:</span>{' '}
              {formatDate(generalContract.fecha_viaje)}
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Cant. pasajeros:</span>{' '}
              {generalContract.asientos_ocupados}
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between" p={1}>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Colegio:</span> {generalContract.institucion.nombre}
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Curso:</span> {generalContract.grado}
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>División:</span> {generalContract.division}
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Turno:</span> {generalContract.turno}
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Lugar salida:</span>
              ........................................................
            </Typography>
            <Typography variant="body2">
              <span style={{fontWeight: '500'}}>Hora salida:</span>.................
            </Typography>
          </Grid>
          <TableContainer style={{marginTop: '16px'}}>
            <Table size="small">
              <TableHead style={{backgroundColor: '#dddddd'}}>
                <TableRow>
                  {onlypassenger !== 'true' && <TableCell align="left">Código</TableCell>}
                  {id_rol < 2 && <TableCell align="left">Estado</TableCell>}
                  <TableCell align="left">Nombre</TableCell>
                  {onlypassenger === 'true' && <TableCell align="center">Fecha Nac.</TableCell>}
                  <TableCell align="center">DNI</TableCell>
                  {onlypassenger !== 'true' && (
                    <>
                      <TableCell align="left">Responsable</TableCell>
                      <TableCell align="center">DNI</TableCell>
                    </>
                  )}
                  {onlypassenger === 'true' && <TableCell align="left">Dirección</TableCell>}
                  <TableCell align="center">Teléfono</TableCell>
                  {onlypassenger !== 'true' && (
                    <>
                      <TableCell align="right">Valor</TableCell>
                      <TableCell align="right">Pagado</TableCell>
                      <TableCell align="right">Adeudado</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {generalContract.contratos_individuales.map((el) => {
                  if ((el.estado === 'cancelado' || el.estado === 'terminado') && id_rol > 1)
                    return null

                  return (
                    <TableRow key={nanoid()}>
                      {onlypassenger !== 'true' && (
                        <TableCell align="left">
                          <Typography variant="caption">{el.cod_contrato}</Typography>
                        </TableCell>
                      )}
                      {id_rol < 2 && (
                        <TableCell align="left">
                          <Typography variant="caption">{el.estado}</Typography>
                        </TableCell>
                      )}
                      <TableCell align="left">
                        <Typography variant="caption">
                          {el.pasajero.apellido}, {el.pasajero.nombre}
                        </Typography>
                      </TableCell>
                      {onlypassenger === 'true' && (
                        <TableCell align="center">
                          <Typography variant="caption">
                            {formatDate(el.pasajero.fecha_nac)}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <Typography variant="caption">{el.pasajero.documento}</Typography>
                      </TableCell>
                      {onlypassenger !== 'true' && (
                        <>
                          <TableCell align="left">
                            <Typography variant="caption">
                              {el.pasajero.responsable.apellido}, {el.pasajero.responsable.nombre}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="caption">
                              {el.pasajero.responsable.documento}
                            </Typography>
                          </TableCell>
                        </>
                      )}
                      {onlypassenger === 'true' && (
                        <TableCell align="left">
                          <Typography variant="caption">
                            {el.pasajero.responsable.direccion}, {el.pasajero.responsable.ciudad}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <Typography variant="caption">
                          {el.pasajero.responsable.telefono}
                        </Typography>
                      </TableCell>
                      {onlypassenger !== 'true' && (
                        <>
                          <TableCell align="right">
                            <Typography variant="caption">
                              {formatCurrency(el.valor_contrato)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="caption">{formatCurrency(el.pagos)}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="caption">
                              {formatCurrency(Number(el.valor_contrato) - Number(el.pagos))}
                            </Typography>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {onlypassenger !== 'true' && (
            <Stack direction="row" display="flex" justifyContent="space-between" sx={{my: 2}}>
              <Typography variant="button">
                <span>Total a recaudar: </span>
                {formatCurrency(data.totales.total)}
              </Typography>
              <Typography variant="button">
                <span>Recaudado: </span>
                {formatCurrency(data.totales.recaudado)}
              </Typography>
              <Typography variant="button">
                <span>Adeudado: </span>
                {formatCurrency(data.totales.deuda)}
              </Typography>
            </Stack>
          )}
        </div>
      </Paper>
    </Dashboard>
  )
}

export default Report
