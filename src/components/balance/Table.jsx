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

import Spinner from '../Spinner'
import formatDate from '../../utils/formatDate'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
    <GridToolbarExport sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const calculaAlto = (largo) => 165 + 40 * Math.min(largo, 10)

const Table = ({data, isFetching}) => {
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
      width: 120,
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
            />
          ) : (
            <Chip
              color="error"
              label={row.forma_pago}
              size="small"
              sx={{minWidth: 100, color: '#000000'}}
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
    },
  ]

  return (
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
        <Spinner height={165} />
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
  )
}

export default Table
