/* eslint-disable no-nested-ternary */
import {Button, Chip, Tooltip} from '@mui/material'
import {
  DataGrid,
  GridToolbarContainer,
  esES,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const UsersTable = ({data, setInitialValues, deleteUser}) => {
  const columns = [
    {
      field: 'rolename',
      headerName: 'Rol',
      width: 100,
      renderCell: ({row}) => (
        <div>
          {row.rolename === 'super' ? (
            <Chip color="error" label="super" size="small" sx={{minWidth: 65}} />
          ) : row.rolename === 'admin' ? (
            <Chip color="primary" label="admin" size="small" sx={{minWidth: 65}} />
          ) : (
            <Chip
              color="secondary"
              label="user"
              size="small"
              sx={{color: '#ffffff', minWidth: 65}}
            />
          )}
        </div>
      ),
    },
    {field: 'apellido', headerName: 'Apellido', width: 50, flex: 1},
    {field: 'nombre', headerName: 'Nombre', width: 50, flex: 1},
    {field: 'email', headerName: 'Email', align: 'center', headerAlign: 'center', width: 200},
    {
      field: 'action',
      headerName: 'Acciones',
      align: 'center',
      headerAlign: 'center',
      width: 150,
      sortable: false,
      renderCell: (obj) => (
        <>
          <Tooltip title="Editar usuario">
            <span>
              <Button
                disableElevation
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  setInitialValues({...obj.row, password: ''})
                }}
              >
                <DriveFileRenameOutlineTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Eliminar usuario">
            <span>
              <Button
                color="error"
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => deleteUser(obj.row.id)}
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
    <div style={{height: 565, width: '100%'}}>
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
        rows={data}
        rowsPerPageOptions={[10]}
      />
    </div>
  )
}

export default UsersTable
