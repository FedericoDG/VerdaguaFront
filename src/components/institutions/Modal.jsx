/* eslint-disable no-shadow */
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

import {useGetGeneralContractByInstitutionId} from '../../hooks/useGeneralContracts'
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

const Modal = ({activeData, handleClose, open}) => {
  const {data: generalContracts} = useGetGeneralContractByInstitutionId(activeData.id)

  const navigate = useNavigate()

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>Detalles de Institución</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} elevation={3} sx={{marginY: 1}}>
          <Table sx={{minWidth: 650}}>
            <TableHead>
              <TableRow>
                <TableCell width="25%">Nombre</TableCell>
                <TableCell width="25%">Dirección</TableCell>
                <TableCell width="30%">Localidad</TableCell>
                <TableCell width="20%">Teléfono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {activeData.nombre}
                </TableCell>
                <TableCell>{activeData.direccion}</TableCell>
                <TableCell>{activeData.localidad}</TableCell>
                <TableCell>{activeData.telefono}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {generalContracts?.length > 0 && (
          <Box mt={5}>
            <Typography variant="button">
              Contratos Generales asociados a esta Institución
            </Typography>
            {generalContracts.map((el) => (
              <div key={nanoid()}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {`${el.cod_contrato} - ${el.descripcion} `}
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer
                      component={Paper}
                      elevation={2}
                      sx={{marginTop: 3, position: 'relative', backgroundColor: '#f7f7f7'}}
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
                              {el.cod_contrato}
                            </TableCell>
                            <TableCell align="center">{el.estado}</TableCell>
                            <TableCell align="center">{el.descripcion}</TableCell>
                            <TableCell align="center">{formatDate(el.fecha_viaje)}</TableCell>
                            <TableCell align="right">{formatCurrency(el.valor_contrato)}</TableCell>
                            <TableCell align="center">{el.asientos_totales}</TableCell>
                            <TableCell align="center">{el.grado}</TableCell>
                            <TableCell align="center">{el.division}</TableCell>
                            <TableCell align="center">{el.turno}</TableCell>
                            <TableCell align="center">
                              <Button
                                onClick={() => navigate(`/dashboard/general-contracts?id=${el.id}`)}
                              >
                                <Typography variant="caption">Ir a contrato general</Typography>
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    {el.contratos_individuales.length > 0 &&
                      el.contratos_individuales.map((el) => (
                        <Accordion key={nanoid()}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            {el.cod_contrato}
                          </AccordionSummary>
                          <AccordionDetails>
                            <TableContainer
                              component={Paper}
                              sx={{marginY: 1, backgroundColor: '#f7f7f7'}}
                            >
                              <Table sx={{minWidth: 650}}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center" width="15%">
                                      Código
                                    </TableCell>
                                    <TableCell align="center" width="20%">
                                      Estado
                                    </TableCell>
                                    <TableCell align="right" width="15%">
                                      Valor
                                    </TableCell>
                                    <TableCell align="right" width="15%">
                                      Pagos
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
                                    <TableCell align="right">
                                      {formatCurrency(el.valor_contrato)}
                                    </TableCell>
                                    <TableCell align="right">{formatCurrency(el.pagos)}</TableCell>
                                    <TableCell align="center">
                                      {formatDate(el.created_at)}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        onClick={() =>
                                          navigate(
                                            `/dashboard/individual-contracts-list?id=${el.id}`
                                          )
                                        }
                                      >
                                        <Typography variant="caption">
                                          Ir a contrato individual
                                        </Typography>
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          navigate(
                                            `/dashboard/passengers?passenger=${el.id_pasajero}`
                                          )
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
                  </AccordionDetails>
                </Accordion>
              </div>
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
  )
}

export default Modal
