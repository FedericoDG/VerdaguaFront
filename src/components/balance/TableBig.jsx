/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import {Chip, Paper, Typography} from '@mui/material'
import {
  DataGrid,
  esES,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import {useContext, useState} from 'react'

import appContext from '../../context/AppContext'
import formatDate from '../../utils/formatDate'
import Spinner from '../Spinner'

import MercadopagoDescription from './MercadopagoDescription'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
    <GridToolbarExport sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const calculaAlto = (largo) => 165 + 40 * Math.min(largo, 10)

const TableBig = ({data, isFetching}) => {
  const {
    user: {id_rol},
  } = useContext(appContext)

  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState(null)

  const columns = [
    {
      field: 'created_at',
      headerName: 'Fecha',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      renderCell: ({row}) => (
        <Typography variant="caption">{formatDate(row.created_at)}</Typography>
      ),
      valueGetter: ({row}) => formatDate(row.created_at),
    },
    {
      field: 'importe',
      headerName: 'Importe',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      renderCell: ({row}) => <Typography variant="caption">{row.importe}</Typography>,
    },
    {
      field: 'forma_pago',
      headerName: 'Tipo',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      renderCell: ({row}) => (
        <div>
          {row.forma_pago === 'efectivo' ? (
            <Chip
              color="success"
              label={row.forma_pago}
              size="small"
              sx={{minWidth: 100, color: '#000000'}}
              variant="outlined"
            />
          ) : row.forma_pago === 'debito' ? (
            <Chip
              color="primary"
              label={row.forma_pago}
              size="small"
              sx={{minWidth: 100, color: '#000000'}}
              variant="outlined"
            />
          ) : row.forma_pago === 'credito' ? (
            <Chip
              color="secondary"
              label={row.forma_pago}
              size="small"
              sx={{minWidth: 100, color: '#000000'}}
              variant="outlined"
            />
          ) : row.forma_pago === 'transferencia' ? (
            <Chip
              color="info"
              label={row.forma_pago}
              size="small"
              sx={{minWidth: 100, color: '#000000'}}
              variant="outlined"
            />
          ) : row.forma_pago === 'mercadopago' ? (
            <Chip
              color="warning"
              label={row.forma_pago}
              size="small"
              sx={{minWidth: 100, color: '#000000'}}
              variant="outlined"
              onClick={() => {
                const mpCode = row.info.split(' ').at(-1)

                setOrder(mpCode)
                setOpen(true)
              }}
            />
          ) : (
            <Chip
              color="error"
              label={row.forma_pago}
              size="small"
              sx={{minWidth: 100, color: '#ffffff'}}
            />
          )}
        </div>
      ),
    },
    {
      field: 'info',
      headerName: 'Descripción',
      width: 50,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      renderCell: ({row}) => <Typography variant="caption">{row.info}</Typography>,
    },
  ]

  if (id_rol === 1) {
    columns.push({
      field: 'usuario.apellido',
      headerName: 'Usuario',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({row}) => (
        <Typography variant="caption">
          {row.usuario.apellido}, {row.usuario.nombre}
        </Typography>
      ),
      valueGetter: ({row}) => `${row.usuario.apellido}, ${row.usuario.nombre}`,
    })
  }

  return (
    <>
      <Paper
        component="div"
        elevation={0}
        sx={{
          marginY: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isFetching || !data ? (
          <Spinner height={1100} />
        ) : (
          <div
            style={{
              height: calculaAlto(data.length),
              width: '100%',
            }}
          >
            <DataGrid
              disableColumnMenu
              disableSelectionOnClick
              columns={columns}
              components={{
                Toolbar: CustomToolbar,
              }}
              density="standard"
              getRowHeight={() => 40}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              pageSize={10}
              rows={data}
              rowsPerPageOptions={[10]}
            />
          </div>
        )}
      </Paper>

      <MercadopagoDescription open={open} order={order} setOpen={setOpen} setOrder={setOrder} />
    </>
  )
}

export default TableBig
