import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'

import formatCurrency from '../../../utils/formatCurrency'
import formatDate from '../../../utils/formatDate'

const Sheet = ({initialValues}) => (
  <>
    <TableContainer sx={{backgroundColor: '#f7f7f7'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Código</TableCell>
            <TableCell align="center">Descripción</TableCell>
            <TableCell align="center">Fecha de Viaje</TableCell>
            <TableCell align="center">Asientos</TableCell>
            <TableCell align="center">Ocupados</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialValues.id && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {border: 0},
              }}
            >
              <TableCell align="center" component="th" scope="row" sx={{}}>
                {initialValues.cod_contrato}
              </TableCell>
              <TableCell align="center">{initialValues.contrato_general.descripcion}</TableCell>
              <TableCell align="center">
                {formatDate(initialValues.contrato_general.fecha_viaje)}
              </TableCell>
              <TableCell align="center">
                {initialValues.contrato_general.asientos_totales}
              </TableCell>
              <TableCell align="center">
                {initialValues.contrato_general.asientos_ocupados}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer sx={{backgroundColor: '#e9e9e9'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Pagos</TableCell>
            <TableCell align="center">Recargos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialValues.id && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {border: 0},
              }}
            >
              <TableCell align="center" component="th" scope="row" sx={{}}>
                {initialValues.estado}
              </TableCell>
              <TableCell align="center">{formatCurrency(initialValues.valor_contrato)}</TableCell>
              <TableCell align="center">{formatCurrency(initialValues.pagos)}</TableCell>
              <TableCell align="center">
                {formatCurrency(initialValues.recargos_pagos_segundo_vencimiento)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer sx={{backgroundColor: '#f7f7f7'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Institución</TableCell>
            <TableCell align="center">Grado</TableCell>
            <TableCell align="center">División</TableCell>
            <TableCell align="center">Turno</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialValues.id && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {border: 0},
              }}
            >
              <TableCell align="center" component="th" scope="row" sx={{}}>
                {initialValues?.contrato_general?.institucion?.nombre}
              </TableCell>
              <TableCell align="center">{initialValues.contrato_general.grado}</TableCell>
              <TableCell align="center">{initialValues.contrato_general.division}</TableCell>
              <TableCell align="center">{initialValues.contrato_general.turno}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer sx={{backgroundColor: '#e9e9e9'}}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">DNI</TableCell>
            <TableCell align="center">Fecha de Nac.</TableCell>
            <TableCell align="center">Obs. médicas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialValues.id && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {border: 0},
              }}
            >
              <TableCell align="center" component="th" scope="row" sx={{}}>
                {initialValues.pasajero.apellido}
              </TableCell>
              <TableCell align="center">{initialValues.pasajero.nombre}</TableCell>
              <TableCell align="center">{initialValues.pasajero.documento}</TableCell>
              <TableCell align="center">{formatDate(initialValues.pasajero.fecha_nac)}</TableCell>
              <TableCell align="center">{initialValues.pasajero.obs_medicas}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)

export default Sheet
