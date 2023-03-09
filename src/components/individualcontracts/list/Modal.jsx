/* eslint-disable no-shadow */
import {
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import {nanoid} from 'nanoid'
import {useNavigate} from 'react-router-dom'

import formatDate from '../../../utils/formatDate'
import formatCurrency from '../../../utils/formatCurrency'
import {useGetInstallments} from '../../../hooks/useIndividualContracts'
import Spinner from '../../Spinner'

const Modal = ({activeData, handleClose, open}) => {
  const navigate = useNavigate()

  const {data: installments, isFetching} = useGetInstallments(activeData?.id)

  if (!activeData?.id || !installments) return null

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>Detalles de Contrato Individual</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{marginY: 1}}>
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                <TableCell align="center" width="15%">
                  Cód. Contrato
                </TableCell>
                <TableCell align="center" width="20%">
                  Estado
                </TableCell>
                <TableCell align="center" width="15%">
                  Valor Contrato
                </TableCell>
                <TableCell align="center" width="15%">
                  Pagos realizados
                </TableCell>
                <TableCell align="center" width="15%">
                  Fecha de creación
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center" component="th" scope="row">
                  {activeData.cod_contrato}
                </TableCell>
                <TableCell align="center">{activeData.estado}</TableCell>
                <TableCell align="center">{formatCurrency(activeData.valor_contrato)}</TableCell>
                <TableCell align="center">{formatCurrency(activeData.pagos)}</TableCell>
                <TableCell align="center">{formatDate(activeData.created_at)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="button">Contrato General</Typography>
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{marginY: 1, position: 'relative', backgroundColor: '#f7f7f7'}}
        >
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center" width="9%">
                  Código
                </TableCell>
                <TableCell align="center" width="8%">
                  Estado
                </TableCell>
                <TableCell align="center" width="20%">
                  Descripción
                </TableCell>
                <TableCell align="center" width="12%">
                  Fecha viaje
                </TableCell>
                <TableCell align="right" width="10%">
                  Valor
                </TableCell>
                <TableCell align="center" width="10%">
                  Cupo
                </TableCell>
                <TableCell align="center" width="6%">
                  Grado
                </TableCell>
                <TableCell align="center" width="6%">
                  División
                </TableCell>
                <TableCell align="center" width="6%">
                  Turno
                </TableCell>
                <TableCell align="center" width="13%">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center" component="th" scope="row">
                  {activeData.contrato_general.cod_contrato}
                </TableCell>
                <TableCell align="center">{activeData.contrato_general.estado}</TableCell>
                <TableCell align="center">{activeData.contrato_general.descripcion}</TableCell>
                <TableCell align="center">
                  {formatDate(activeData.contrato_general.fecha_viaje)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(activeData.contrato_general.valor_contrato)}
                </TableCell>
                <TableCell align="center">{activeData.contrato_general.asientos_totales}</TableCell>
                <TableCell align="center">{activeData.contrato_general.grado}</TableCell>
                <TableCell align="center">{activeData.contrato_general.division}</TableCell>
                <TableCell align="center">{activeData.contrato_general.turno}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/general-contracts?id=${activeData.contrato_general.id}`)
                    }
                  >
                    <Typography variant="caption">Ir a contrato general</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="button">Pasajero</Typography>
        <TableContainer component={Paper} sx={{marginY: 1}}>
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center" width="15%">
                  Apellido
                </TableCell>
                <TableCell align="center" width="15%">
                  Nombre
                </TableCell>
                <TableCell align="center" width="20%">
                  DNI
                </TableCell>
                <TableCell align="center" width="20%">
                  Fecha de nac.
                </TableCell>
                <TableCell align="center" width="20%">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center" component="th" scope="row">
                  {activeData.pasajero.apellido}
                </TableCell>
                <TableCell align="center">{activeData.pasajero.nombre}</TableCell>
                <TableCell align="center">{activeData?.pasajero.documento}</TableCell>
                <TableCell align="center">{formatDate(activeData.pasajero.fecha_nac)}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/passengers?passenger=${activeData.pasajero.id}`)
                    }
                  >
                    <Typography variant="caption">Ir a Pasajero</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="button">Responsable</Typography>
        <TableContainer
          component={Paper}
          sx={{marginY: 1, position: 'relative', backgroundColor: '#f7f7f7'}}
        >
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                <TableCell align="center" width="15%">
                  Apellido
                </TableCell>
                <TableCell align="center" width="15%">
                  Nombre
                </TableCell>
                <TableCell align="center" width="20%">
                  DNI
                </TableCell>
                <TableCell align="center" width="20%">
                  Teléfono
                </TableCell>
                <TableCell align="center" width="30%">
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="center" component="th" scope="row">
                  {activeData.pasajero.responsable.apellido}
                </TableCell>
                <TableCell align="center">{activeData.pasajero.responsable.nombre}</TableCell>
                <TableCell align="center">{activeData.pasajero.responsable.documento}</TableCell>
                <TableCell align="center">{activeData.pasajero.responsable.telefono}</TableCell>
                <TableCell align="center">{activeData.pasajero.responsable.email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer
          component={Paper}
          sx={{marginY: 1, position: 'relative', backgroundColor: '#f7f7f7'}}
        >
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                <TableCell align="center" width="15%">
                  Fecha de nac.
                </TableCell>
                <TableCell align="center" width="15%">
                  Dirección
                </TableCell>
                <TableCell align="center" width="20%">
                  Ciudad
                </TableCell>
                <TableCell align="center" width="20%">
                  Provincia
                </TableCell>
                <TableCell align="center" width="30%">
                  Código Postal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                {activeData.pasajero.responsable.fecha_nac && (
                  <TableCell align="center" component="th" scope="row">
                    {formatDate(activeData.pasajero.responsable.fecha_nac)}
                  </TableCell>
                )}
                <TableCell align="center">{activeData.pasajero.responsable.direccion}</TableCell>
                <TableCell align="center">{activeData.pasajero.responsable.ciudad}</TableCell>
                <TableCell align="center">{activeData.pasajero.responsable.provincia}</TableCell>
                <TableCell align="center">
                  {activeData.pasajero.responsable.codigo_postal}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {isFetching ? (
          <Spinner />
        ) : (
          installments.length > 0 && (
            <>
              <Typography variant="button">Cuotas</Typography>
              <TableContainer sx={{backgroundColor: '#f7f7f7'}}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Cuota</TableCell>
                      <TableCell align="center">Estado</TableCell>
                      <TableCell align="center">Valor 1er. Venc.</TableCell>
                      <TableCell align="center">Fecha 1er. Venc.</TableCell>
                      <TableCell align="center">Valor 2do. Venc.</TableCell>
                      <TableCell align="center">Fecha 2do. Venc.</TableCell>
                      <TableCell align="center">Fecha PAGO</TableCell>
                    </TableRow>
                  </TableHead>
                  {installments.map((row, idx) => (
                    <TableBody key={nanoid()}>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': {border: 0},
                          backgroundColor: `${row.estado === 'pagada' ? '#bebebe' : '#dadada'}`,
                        }}
                      >
                        <TableCell align="center" component="th" scope="row" sx={{}}>
                          {idx === 0 ? 'seña' : row.numero}
                        </TableCell>
                        <TableCell align="center">{row.estado}</TableCell>
                        <TableCell align="center">
                          {formatCurrency(row.valor_primer_vencimiento)}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.fecha_primer_vencimiento)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrency(row.valor_segundo_vencimiento)}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.fecha_segundo_vencimiento)}
                        </TableCell>
                        {row.estado === 'pagada' ? (
                          <TableCell align="center">{formatDate(row.updated_at)}</TableCell>
                        ) : (
                          <TableCell align="center">---</TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </TableContainer>
            </>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
