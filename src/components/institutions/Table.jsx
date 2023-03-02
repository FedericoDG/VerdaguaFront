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
import useInstitutionsComponents from '../../hooks/useInstitutionsComponents'
import Spinner from '../Spinner'

import Modal from './Modal'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
    <GridToolbarExport sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const calculaAlto = (largo) => 165 + 45 * Math.min(largo, 10)

const Table = ({institution, setInitialValues}) => {
  const {
    activeData,
    bottom,
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
    setField,
    setName,
  } = useInstitutionsComponents()

  const {top, handleScroll} = useContext(appContext)

  useEffect(() => {
    if (institution?.id) {
      setInitialValues({...institution})
      setName(institution.nombre)
    }
  }, [institution])

  const columns = [
    {field: 'nombre', headerName: 'Nombre', width: 50, flex: 2},
    {field: 'direccion', headerName: 'Dirección', width: 50, flex: 2},
    {
      field: 'telefono',
      headerName: 'Teléfono',
      align: 'center',
      headerAlign: 'center',
      width: 50,
      flex: 1,
    },
    {
      field: 'localidad',
      headerName: 'Localidad',
      align: 'center',
      headerAlign: 'center',
      width: 50,
      flex: 2,
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
          <Tooltip title="Editar institución">
            <span>
              <Button
                disableElevation
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  setInitialValues((prev) => ({...prev, ...obj.row}))
                  handleScroll(top)
                }}
              >
                <DriveFileRenameOutlineTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Eliminar institución">
            <span>
              <Button
                color="error"
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
              disabled
              name="field"
              size="small"
              sx={{m: 1, minWidth: 185}}
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <MenuItem value="nombre">nombre</MenuItem>
            </Select>
            <TextField
              name="query"
              placeholder="Buscar institución..."
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
            getRowHeight={() => 45}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={10}
            rows={dataArray}
            rowsPerPageOptions={[10]}
          />
          <p ref={bottom} style={{color: 'transparent'}}>
            bottom
          </p>
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
