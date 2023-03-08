import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {nanoid} from 'nanoid'
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import {useGetPassengersByResponsible} from '../../hooks/usePassengers'
import formatDate from '../../utils/formatDate'

const Modal = ({activeData, handleClose, open}) => {
  const {data: passengers} = useGetPassengersByResponsible(activeData.id)

  const navigate = useNavigate()

  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Detalles de Responsable</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{marginY: 1}}>
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
                    {activeData.apellido}
                  </TableCell>
                  <TableCell align="center">{activeData.nombre}</TableCell>
                  <TableCell align="center">{activeData.documento}</TableCell>
                  <TableCell align="center">{activeData.telefono}</TableCell>
                  <TableCell align="center">{activeData.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} sx={{marginY: 1}}>
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
                  {activeData.fecha_nac && (
                    <TableCell align="center" component="th" scope="row">
                      {formatDate(activeData.fecha_nac)}
                    </TableCell>
                  )}
                  <TableCell align="center">{activeData.direccion}</TableCell>
                  <TableCell align="center">{activeData.ciudad}</TableCell>
                  <TableCell align="center">{activeData.provincia}</TableCell>
                  <TableCell align="center">{activeData.codigo_postal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {activeData.info && (
            <TableContainer component={Paper} sx={{marginY: 1}}>
              <Table sx={{minWidth: 650}}>
                <TableHead>
                  <TableRow>
                    <TableCell width="100%">Otra información</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell component="th" scope="row">
                      {activeData.info}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {passengers?.length > 0 && (
            <Box mt={5}>
              <Typography variant="button">Es responsable de:</Typography>
              {passengers.map((el) => (
                <TableContainer
                  key={nanoid()}
                  component={Paper}
                  sx={{marginY: 1, backgroundColor: '#f7f7f7'}}
                >
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
                        <TableCell align="center" width="30%">
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="center" component="th" scope="row">
                          {el.apellido}
                        </TableCell>
                        <TableCell align="center">{el.nombre}</TableCell>
                        <TableCell align="center">{el.documento}</TableCell>
                        <TableCell align="center">{formatDate(el.fecha_nac)}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => navigate(`/dashboard/passengers?passenger=${el.id}`)}
                          >
                            <Typography variant="caption">Ir a pasajero</Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
