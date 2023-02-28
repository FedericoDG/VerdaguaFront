import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import {useGetPassengerById} from '../../hooks/usePassengers'
import formatDate from '../../utils/formatDate'
import formatCurrency from '../../utils/formatCurrency'

const Modal = ({activeData, handleClose, open}) => {
  const {data: passenger} = useGetPassengerById(activeData.id)

  const navigate = useNavigate()

  return (
    <div>
      {passenger && activeData.id && (
        <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
          <DialogTitle>Detalles de Pasajero</DialogTitle>
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
                      Fecha de nac.
                    </TableCell>
                    <TableCell align="center" width="30%">
                      Observaciones médicas
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
                    <TableCell align="center">{formatDate(activeData.fecha_nac)}</TableCell>
                    <TableCell align="center">{activeData.obs_medicas}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {passenger.responsable && (
              <>
                <Typography variant="button">Responsable</Typography>
                <TableContainer component={Paper} sx={{marginY: 1, backgroundColor: '#f7f7f7'}}>
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
                        <TableCell align="center" width="15%">
                          Email
                        </TableCell>
                        <TableCell align="center" width="15%">
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell align="center" component="th" scope="row">
                          {passenger.responsable.apellido}
                        </TableCell>
                        <TableCell align="center">{passenger.responsable.nombre}</TableCell>
                        <TableCell align="center">{passenger.responsable.documento}</TableCell>
                        <TableCell align="center">{passenger.responsable.telefono}</TableCell>
                        <TableCell align="center">{passenger.responsable.email}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() =>
                              navigate(
                                `/dashboard/responsible-seniors?id=${passenger.responsable.id}`
                              )
                            }
                          >
                            <Typography variant="caption">Ir a responsable</Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <TableContainer component={Paper} sx={{marginY: 1, backgroundColor: '#f7f7f7'}}>
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
                        <TableCell align="center" width="15%">
                          Código Postal
                        </TableCell>
                        <TableCell align="center" width="15%">{` `}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        {passenger.responsable.fecha_nac && (
                          <TableCell align="center" component="th" scope="row">
                            {formatDate(passenger.responsable.fecha_nac)}
                          </TableCell>
                        )}
                        <TableCell align="center">{passenger.responsable.direccion}</TableCell>
                        <TableCell align="center">{passenger.responsable.ciudad}</TableCell>
                        <TableCell align="center">{passenger.responsable.provincia}</TableCell>
                        <TableCell align="center">{passenger.responsable.codigo_postal}</TableCell>
                        <TableCell align="center">{` `}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {passenger.responsable.info && (
                  <TableContainer component={Paper} sx={{marginY: 1, backgroundColor: '#f7f7f7'}}>
                    <Table sx={{minWidth: 650}}>
                      <TableHead>
                        <TableRow>
                          <TableCell width="100%">Otra información</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                          <TableCell component="th" scope="row">
                            {passenger.responsable.info}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {passenger.contratos_individuales.length > 0 && (
                  <Typography variant="button">Contratos Individuales</Typography>
                )}
                {passenger.contratos_individuales.length > 0 &&
                  passenger.contratos_individuales.map((el) => (
                    <Box key={nanoid()}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{el.cod_contrato}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer component={Paper} sx={{marginBottom: 1}}>
                            <Table sx={{minWidth: 650}}>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center" width="15%">
                                    Código
                                  </TableCell>
                                  <TableCell align="center" width="24%">
                                    Estado
                                  </TableCell>
                                  <TableCell align="right" width="24%">
                                    Valor
                                  </TableCell>
                                  <TableCell align="right" width="24%">
                                    Pagos
                                  </TableCell>
                                  <TableCell align="center" width="13%">
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
                                  <TableCell align="right">
                                    {formatCurrency(el.valor_contrato)}
                                  </TableCell>
                                  <TableCell align="right">{formatCurrency(el.pagos)}</TableCell>
                                  <TableCell align="center">
                                    <Button
                                      onClick={() =>
                                        navigate(`/dashboard/individual-contracts-list?id=${el.id}`)
                                      }
                                    >
                                      <Typography variant="caption">
                                        Ir a Contrato Individual
                                      </Typography>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <Typography variant="boby2">Contrato General</Typography>
                          <TableContainer
                            key={nanoid()}
                            component={Paper}
                            elevation={2}
                            sx={{marginTop: 3, position: 'relative'}}
                          >
                            <Table sx={{minWidth: 650}}>
                              <TableHead>
                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                  <TableCell align="center" width="10%">
                                    Código
                                  </TableCell>
                                  <TableCell align="center" width="10%">
                                    Estado
                                  </TableCell>
                                  <TableCell align="center" width="20%">
                                    Descripción
                                  </TableCell>
                                  <TableCell align="center" width="9%">
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
                                    {el.contrato_general.cod_contrato}
                                  </TableCell>
                                  <TableCell align="center">{el.contrato_general.estado}</TableCell>
                                  <TableCell align="center">
                                    {el.contrato_general.descripcion}
                                  </TableCell>
                                  <TableCell align="center">
                                    {formatDate(el.contrato_general.fecha_viaje)}
                                  </TableCell>
                                  <TableCell align="right">
                                    {formatCurrency(el.contrato_general.valor_contrato)}
                                  </TableCell>
                                  <TableCell align="center">
                                    {el.contrato_general.asientos_totales}
                                  </TableCell>
                                  <TableCell align="center">{el.contrato_general.grado}</TableCell>
                                  <TableCell align="center">
                                    {el.contrato_general.division}
                                  </TableCell>
                                  <TableCell align="center">{el.contrato_general.turno}</TableCell>
                                  <TableCell align="center">
                                    <Button
                                      onClick={() =>
                                        navigate(
                                          `/dashboard/general-contracts?id=${el.contrato_general.id}`
                                        )
                                      }
                                    >
                                      <Typography variant="caption">
                                        Ir a contrato general
                                      </Typography>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))}
              </>
            )}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button autoFocus onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default Modal
