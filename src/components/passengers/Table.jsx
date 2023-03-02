/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import {Button, MenuItem, Paper, Select, TextField, Tooltip} from '@mui/material'
import {
  DataGrid,
  esES,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import {useContext, useEffect} from 'react'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone'
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import appContext from '../../context/AppContext'
import DeleteDialog from '../DeleteDialog'
import formatDate, {formatENDate} from '../../utils/formatDate'
import Spinner from '../Spinner'
import usePassengersComponents from '../../hooks/usePassengersComponents'

import PassengersModal from './Modal'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
    <GridToolbarExport sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const calculaAlto = (largo) => 165 + 45 * Math.min(largo, 10)

const Table = ({passenger, setInitialValues}) => {
  const {
    activeData,
    dataArray,
    field,
    handleCloseDeleteDialog,
    handleCloseModal,
    handleDelete,
    handleOpenDeleteDialog,
    handleOpenModal,
    handleSearchSubmit,
    isFetching,
    openDeleteDialog,
    openModal,
    setActiveData,
    setAll,
    setDocument,
    setField,
    setLastname,
  } = usePassengersComponents()

  const {
    top,
    handleScroll,
    user: {id_rol},
  } = useContext(appContext)

  useEffect(() => {
    if (passenger?.id) {
      setInitialValues({
        ...passenger,
        fecha_nac: formatENDate(passenger.fecha_nac),
        documento_responsable: `${passenger.responsable.documento} - ${passenger.responsable.apellido} ${passenger.responsable.nombre}`,
        bs_medicas: passenger.obs_medicas || '',
      })
      setDocument(passenger.documento)
    }
  }, [passenger])

  const columns = [
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 200,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
    },
    {
      field: 'documento',
      headerName: 'Documento',
      align: 'center',
      headerAlign: 'center',
      width: 100,
    },
    {
      field: 'fecha_nac',
      headerName: 'Nacimiento',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      renderCell: ({row}) => <div>{formatDate(row.fecha_nac)}</div>,
    },
    {
      field: 'obs_medicas',
      headerName: 'Observaciones médicas',
      align: 'center',
      headerAlign: 'center',
      width: 50,
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Acciones',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      sortable: false,
      renderCell: (obj) => (
        <>
          <Tooltip title="Ver detalles">
            <span>
              <Button
                disableElevation
                color="secondary"
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  setActiveData(obj.row)
                  handleOpenModal()
                }}
              >
                <ContentPasteSearchTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Editar pasajero">
            <span>
              <Button
                disableElevation
                disabled={id_rol > 2}
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  if (obj.row.responsable) {
                    setInitialValues({
                      ...obj.row,
                      fecha_nac: formatENDate(obj.row.fecha_nac),
                      documento_responsable:
                        `${obj.row.responsable?.documento} - ${obj.row.responsable?.apellido} ${obj.row.responsable?.nombre}` ||
                        '',
                      obs_medicas: obj.row.obs_medicas || '',
                    })
                  } else {
                    setInitialValues({
                      ...obj.row,
                      fecha_nac: formatENDate(obj.row.fecha_nac),
                      documento_responsable: '',
                      obs_medicas: obj.row.obs_medicas || '',
                    })
                  }
                  handleScroll(top)
                }}
              >
                <DriveFileRenameOutlineTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Eliminar pasajero">
            <span>
              <Button
                color="error"
                disabled={id_rol > 2}
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  setActiveData(obj.row)
                  handleOpenDeleteDialog()
                }}
              >
                <CancelTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>
        </>
      ),
    },
  ]

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
          // width: 550,
        }}
      >
        <div>
          <form onSubmit={handleSearchSubmit}>
            <Select
              name="field"
              size="small"
              sx={{m: 1, minWidth: 185}}
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <MenuItem value="documento">documento</MenuItem>
              <MenuItem value="apellido">apellido</MenuItem>
            </Select>
            <TextField
              name="query"
              placeholder="Buscar pasajero..."
              size="small"
              sx={{m: 1, width: 335}}
            />
            <Button disableElevation type="submit" variant="contained">
              Buscar
            </Button>
          </form>
        </div>
        <div>
          <Tooltip title="Esto puede generar mucha carga en el servidor">
            <Button
              disableElevation
              color="warning"
              startIcon={<WarningAmberIcon />}
              sx={{marginX: 1}}
              variant="contained"
              onClick={() => {
                setDocument(null) // OJO ACA2
                setLastname(null) // OJO ACA2
                setAll('all')
              }}
            >
              Traer todos los datos
            </Button>
          </Tooltip>
        </div>
      </Paper>
      {isFetching ? (
        <Spinner height={165} />
      ) : (
        <div
          style={{
            height: calculaAlto(dataArray.length),
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
            getRowHeight={() => 45}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={10}
            rows={dataArray}
            rowsPerPageOptions={[10]}
          />
        </div>
      )}

      <PassengersModal activeData={activeData} handleClose={handleCloseModal} open={openModal} />
      <DeleteDialog
        handleAction={handleDelete}
        handleClose={handleCloseDeleteDialog}
        id={activeData?.id}
        open={openDeleteDialog}
      />
    </>
  )
}

export default Table
