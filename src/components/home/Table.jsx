/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import {Button, Chip, Tooltip, Typography} from '@mui/material'
import {
  DataGrid,
  esES,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import {useContext} from 'react'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone'

import appContext from '../../context/AppContext'
import formatDate from '../../utils/formatDate'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
    <GridToolbarExport sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const calculaAlto = (largo) => 165 + 80 * Math.min(largo, 10)

const Table = ({action, generalContracts, check}) => {
  const columns = [
    {
      field: 'cod_contrato',
      headerName: 'Código',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      renderCell: ({row}) => (
        <Typography
          sx={{cursor: 'copy'}}
          variant="caption"
          onClick={() => navigator.clipboard.writeText(row.cod_contrato)}
        >
          {row.cod_contrato}{' '}
        </Typography>
      ),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      renderCell: ({row}) => (
        <div>
          {row.estado === 'cancelado' ? (
            <Chip color="error" label={row.estado} size="small" sx={{minWidth: 80}} />
          ) : row.estado === 'terminado' ? (
            <Chip color="warning" label={row.estado} size="small" sx={{minWidth: 80}} />
          ) : (
            <Chip color="secondary" label={row.estado} size="small" sx={{minWidth: 80}} />
          )}
        </div>
      ),
    },
    {
      field: 'descripcion',
      headerName: 'Institución/Descripción',
      align: 'left',
      headerAlign: 'center',
      width: 360,
      flex: 1,
      renderCell: ({row}) => (
        <div>
          <Typography variant="button">{row.institucion.nombre} </Typography>
          <Typography variant="body2">
            Grado: {row.grado} - División: {row.division} - Turno: {row.turno}
          </Typography>
          <Typography variant="caption">{row.descripcion}</Typography>
        </div>
      ),
    },
    {
      field: 'fecha_viaje',
      headerName: 'Fecha de viaje',
      align: 'center',
      headerAlign: 'center',
      width: 160,
      renderCell: ({row}) => (
        <Typography variant="caption">{formatDate(row.fecha_viaje)}</Typography>
      ),
      valueGetter: ({row}) => formatDate(row.fecha_viaje),
    },
    {
      field: 'asientos_totales',
      headerName: 'Cupo',
      align: 'center',
      headerAlign: 'center',
      width: 60,
    },
    {
      field: 'asientos_ocupados',
      headerName: 'Ocupado',
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      field: 'action',
      headerName: 'Acciones',
      align: 'center',
      headerAlign: 'center',
      width: 130,
      sortable: false,
      renderCell: (obj) => (
        <Tooltip
          title={check ? 'Ver Contratos Individuales asociados' : 'Terminar Contrato General'}
        >
          <span>
            <Button
              disableElevation
              color={check ? 'secondary' : 'success'}
              sx={{minWidth: 0}}
              type="submit"
              variant="text"
              onClick={() => {
                if (check) action(obj.row.cod_contrato)
                if (!check) action(obj.row.id)
              }}
            >
              {check ? (
                <ContentPasteSearchTwoToneIcon sx={{fontSize: 32}} />
              ) : (
                <CheckCircleTwoToneIcon sx={{fontSize: 32}} />
              )}
            </Button>
          </span>
        </Tooltip>
      ),
    },
  ]

  if (check) {
    const daysToFinish = {
      field: 'dias_restantes',
      headerName: 'Días para el viaje',
      align: 'center',
      headerAlign: 'center',
      width: 130,
      renderCell: ({row}) => (
        <Typography sx={{color: row.dias_restantes < 8 ? '#bd0e0e' : '#f18d4b'}} variant="h5">
          {row.dias_restantes}
        </Typography>
      ),
    }

    columns.splice(3, 0, daysToFinish)

    const compare = (a, b) => {
      if (a.dias_restantes < b.dias_restantes) {
        return -1
      }
      if (a.dias_restantes > b.dias_restantes) {
        return 1
      }

      return 0
    }

    generalContracts.sort(compare)
  }

  return (
    <div
      style={{
        height: calculaAlto(generalContracts.length),
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
        getRowHeight={() => 80}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSize={10}
        rows={generalContracts}
        rowsPerPageOptions={[10]}
      />
    </div>
  )
}

export default Table
