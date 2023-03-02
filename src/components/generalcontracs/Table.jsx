/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import {Button, Chip, MenuItem, Paper, Select, TextField, Tooltip, Typography} from '@mui/material'
import {
  DataGrid,
  esES,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import {useContext, useEffect} from 'react'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import {Link, useNavigate} from 'react-router-dom'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone'
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import appContext from '../../context/AppContext'
import DeleteDialog from '../DeleteDialog'
import formatDate, {formatENDate} from '../../utils/formatDate'
import Spinner from '../Spinner'
import useGeneralContractsComponents from '../../hooks/useGeneralContractsComponets'

import Modal from './Modal'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
    <GridToolbarExport sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const calculaAlto = (largo) => 165 + 80 * Math.min(largo, 10)

const Table = ({generalContract, setInitialValues}) => {
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
    setCode,
    setField,
    setName,
  } = useGeneralContractsComponents()

  const {
    top,
    handleScroll,
    user: {id_rol},
  } = useContext(appContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (generalContract?.id) {
      setInitialValues({
        ...generalContract,
        fecha_viaje: formatENDate(generalContract.fecha_viaje),
        institucion: {
          id: generalContract.institucion.id,
          label: `${generalContract.institucion.nombre} - ${generalContract.institucion.direccion}, ${generalContract.institucion.localidad}`,
        },
      })
      setCode(generalContract.cod_contrato)
    }
  }, [generalContract])

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
      // valueFormatter: ({value}) => value.nombre,
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
      headerName: 'Fecha',
      align: 'center',
      headerAlign: 'center',
      width: 80,
      renderCell: ({row}) => (
        <Typography variant="caption">{formatDate(row.fecha_viaje)}</Typography>
      ),
    },
    {
      field: 'asientos_totales',
      headerName: 'Cupo',
      align: 'center',
      headerAlign: 'center',
      width: 80,
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
      width: 260,
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

          <Tooltip title="Crear contrato individual">
            <span>
              <Button
                disableElevation
                color="success"
                disabled={
                  obj.row.estado !== 'vigente' ||
                  obj.row.asientos_totales === obj.row.asientos_ocupados
                }
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  navigate(`/dashboard/individual-contracts?id=${obj.row.id}`)
                }}
              >
                <AddCircleTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Ver PDF del Contrato">
            <span>
              {obj.row.contract_url ? (
                <Link sx={{color: 'inherit'}} target="_blank" to={obj.row.contract_url} disabled>
                  <Button
                    disableElevation
                    color="inherit"
                    sx={{minWidth: 0}}
                    type="submit"
                    variant="text"
                  >
                    <AttachFileIcon sx={{fontSize: 32}} />
                  </Button>
                </Link>
              ) : (
                <Button
                  disableElevation
                  disabled
                  color="inherit"
                  sx={{minWidth: 0}}
                  type="submit"
                  variant="text"
                >
                  <AttachFileIcon sx={{fontSize: 32}} />
                </Button>
              )}
            </span>
          </Tooltip>

          <Tooltip title="Editar contrato general">
            <span>
              <Button
                disableElevation
                disabled={id_rol > 2}
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  setInitialValues({
                    ...obj.row,
                    fecha_viaje: formatENDate(obj.row.fecha_viaje),
                    institucion: {
                      id: obj.row.institucion.id,
                      label: `${obj.row.institucion.nombre} - ${obj.row.institucion.direccion}, ${obj.row.institucion.localidad}`,
                    },
                    contract_url: obj.row.contract_url || '',
                  })
                  handleScroll(top)
                }}
              >
                <DriveFileRenameOutlineTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Eliminar contrato general">
            <span>
              <Button
                color="error"
                disabled={id_rol > 2 || obj.row.estado === 'vigente'}
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
              <MenuItem value="name">nombre institución</MenuItem>
              <MenuItem value="code">código contrato</MenuItem>
            </Select>
            <TextField
              name="query"
              placeholder="Buscar contrato general..."
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
                setCode(null) // OJO ACA2
                setName(null) // OJO ACA2
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
            getRowHeight={() => 80}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={10}
            rows={dataArray}
            rowsPerPageOptions={[10]}
          />
        </div>
      )}

      <Modal activeData={activeData} handleClose={handleCloseModal} open={openModal} />
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
