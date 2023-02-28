import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import {UseGetGeneralContractById} from '../../hooks/useGeneralContracts'
import formatDate from '../../utils/formatDate'
import formatCurrency from '../../utils/formatCurrency'

const Modal = ({activeData, handleClose, open}) => {
  const {data: generalContracts} = UseGetGeneralContractById(activeData.id)

  const navigate = useNavigate()

  if (!generalContracts?.id) return null

  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>Detalles de Contrato General</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{marginY: 1}}>
            <Table sx={{minWidth: 650}}>
              <TableHead>
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="center" width="10%">
                    Código
                  </TableCell>
                  <TableCell align="center" width="10%">
                    Estado
                  </TableCell>
                  <TableCell align="center" width="30%">
                    Descripción
                  </TableCell>
                  <TableCell align="center" width="12%">
                    Fecha viaje
                  </TableCell>
                  <TableCell align="center" width="10%">
                    Valor
                  </TableCell>
                  <TableCell align="center" width="10%">
                    Asientos totales
                  </TableCell>
                  <TableCell align="center" width="10%">
                    Asientos ocupados
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
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="center" component="th" scope="row">
                    {generalContracts.cod_contrato}
                  </TableCell>
                  <TableCell align="center">{generalContracts.estado}</TableCell>
                  <TableCell align="center">{generalContracts.descripcion}</TableCell>
                  <TableCell align="center">{formatDate(generalContracts.fecha_viaje)}</TableCell>
                  <TableCell align="center">
                    {formatCurrency(generalContracts.valor_contrato)}
                  </TableCell>
                  <TableCell align="center">{generalContracts.asientos_totales}</TableCell>
                  <TableCell align="center">{generalContracts.asientos_ocupados}</TableCell>
                  <TableCell align="center">{generalContracts.grado}</TableCell>
                  <TableCell align="center">{generalContracts.division}</TableCell>
                  <TableCell align="center">{generalContracts.turno}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="button">Colegio/Institución</Typography>
          <TableContainer component={Paper} sx={{marginY: 1, backgroundColor: '#f7f7f7'}}>
            <Table sx={{minWidth: 650}}>
              <TableHead>
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="center" width="20%">
                    Nombre
                  </TableCell>
                  <TableCell align="center" width="30%">
                    Dirección
                  </TableCell>
                  <TableCell align="center" width="20%">
                    Localidad
                  </TableCell>
                  <TableCell align="center" width="15%">
                    Teléfono
                  </TableCell>
                  <TableCell align="center" width="15%">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell align="center" component="th" scope="row">
                    {generalContracts.institucion.nombre}
                  </TableCell>
                  <TableCell align="center">{generalContracts.institucion.direccion}</TableCell>
                  <TableCell align="center">{generalContracts.institucion.localidad}</TableCell>
                  <TableCell align="center">{generalContracts.institucion.telefono}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        navigate(`/dashboard/institutions?id=${generalContracts.institucion.id}`)
                      }
                    >
                      <Typography variant="caption">Ir a institución</Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {generalContracts.contratos_individuales?.length > 0 && (
            <Box>
              <Typography variant="button">Contratos Individuales</Typography>
              {generalContracts.contratos_individuales.map((el) => (
                <Accordion key={nanoid()}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {el.cod_contrato}
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper} sx={{marginY: 1, backgroundColor: '#f7f7f7'}}>
                      <Table sx={{minWidth: 650}}>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" width="15%">
                              cód. Contrato
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
                              Fecha
                            </TableCell>
                            <TableCell align="center" width="20%">
                              Acciones
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell align="center" component="th" scope="row">
                              {el.cod_contrato}
                            </TableCell>
                            <TableCell align="center">{el.estado}</TableCell>
                            <TableCell align="center">
                              {formatCurrency(el.valor_contrato)}
                            </TableCell>
                            <TableCell align="center">{formatCurrency(el.pagos)}</TableCell>
                            <TableCell align="center">{formatDate(el.created_at)}</TableCell>
                            <TableCell align="center">
                              <Button
                                onClick={() =>
                                  navigate(`/dashboard/individual-contracts-list?id=${el.id}`)
                                }
                              >
                                <Typography variant="caption">Ir a contrato individual</Typography>
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(`/dashboard/passengers?passenger=${el.id_pasajero}`)
                                }
                              >
                                <Typography variant="caption">Ir a pasajero</Typography>
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button autoFocus onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
