/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import {
  Button,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  DataGrid,
  esES,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import {useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import CalculateTwoToneIcon from '@mui/icons-material/CalculateTwoTone'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import ChangeCircleTwoToneIcon from '@mui/icons-material/ChangeCircleTwoTone'
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone'
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import appContext from '../../../context/AppContext'
import DeleteDialog from '../../DeleteDialog'
import formatCurrency from '../../../utils/formatCurrency'
import Spinner from '../../Spinner'
import useIndividualContractsComponents from '../../../hooks/useIndividualContractsComponents'
import useListIndividualContract from '../../../hooks/useListIndividualContract'

import Modal from './Modal'

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton sx={{fontSize: 16}} />
    <GridToolbarColumnsButton sx={{fontSize: 16}} />
    <GridToolbarExport sx={{fontSize: 16}} />
  </GridToolbarContainer>
)

const calculaAlto = (largo) => 165 + 70 * Math.min(largo, 10)

const Table = ({
  setInitialValues,
  setShowEditState,
  setShowRecalc,
  setOpenRecalc,
  openModal,
  handleCloseModal,
  handleOpenModal,
}) => {
  const {
    activeData,
    dataArray,
    field,
    handleCloseDeleteDialog,
    handleDelete,
    handleOpenDeleteDialog,
    handleSearchSubmit,
    isFetching,
    openDeleteDialog,
    setActiveData,
    setAll,
    setField,
    setCode,
    list,
    setContractsList,
    setDocument,
    setApellido,
  } = useIndividualContractsComponents()

  useEffect(() => {
    if (list) setContractsList(list)
  }, [list])

  const {individualContract, setRecalculated} = useListIndividualContract()

  const {
    bottom,
    handleScroll,
    user: {id_rol},
  } = useContext(appContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (individualContract?.id) {
      setInitialValues({
        ...individualContract,
        nuevo_valor: individualContract.valor_contrato,
      })
      setCode(individualContract.cod_contrato)
    }
  }, [individualContract])

  const columns = [
    {
      field: 'cod_contrato',
      headerName: 'Código',
      align: 'center',
      headerAlign: 'center',
      width: 130,
      renderCell: ({row}) => (
        <Typography
          sx={{cursor: 'copy'}}
          variant="caption"
          onClick={() => navigator.clipboard.writeText(row.cod_contrato)}
        >
          {row.cod_contrato}
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
          ) : row.estado === 'pagado' ? (
            <Chip color="success" label={row.estado} size="small" sx={{minWidth: 80}} />
          ) : (
            <Chip color="secondary" label={row.estado} size="small" sx={{minWidth: 80}} />
          )}
        </div>
      ),
    },
    {
      field: 'contrato_general',
      headerName: 'Pasajero',
      align: 'left',
      headerAlign: 'center',
      width: 200,
      renderCell: ({row}) => (
        <div>
          <Grid>
            <Typography variant="button">{row.pasajero.apellido}, </Typography>
            <Typography variant="button">{row.pasajero.nombre}</Typography>
          </Grid>
          <Typography variant="body2">DNI: {row.pasajero.documento}</Typography>
        </div>
      ),
    },
    {
      field: 'descripcion',
      headerName: 'Institución/Descripción',
      align: 'left',
      headerAlign: 'center',
      width: 150,
      flex: 1,
      // valueFormatter: ({value}) => value.nombre,
      renderCell: ({row}) => (
        <div>
          <Typography variant="button">{row.contrato_general.institucion.nombre}</Typography>
          <Typography variant="body2">
            Grado: {row.contrato_general.grado} - División: {row.contrato_general.division} - Turno:{' '}
            {row.contrato_general.turno}
          </Typography>
          <Typography variant="caption">{row.contrato_general.descripcion}</Typography>
        </div>
      ),
    },
    {
      field: 'valor_contrato',
      headerName: 'Valor/Pagos',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      renderCell: ({row}) => (
        <div>
          <Typography align="right" variant="body2">
            {formatCurrency(row.valor_contrato)}
          </Typography>
          <Typography align="right" variant="body2">
            {formatCurrency(row.pagos)}
          </Typography>
        </div>
      ),
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
            <Button
              disableElevation
              color="secondary"
              sx={{minWidth: 0}}
              type="submit"
              variant="text"
              onClick={() => {
                setActiveData(obj.row)
                setShowRecalc(obj.row.id)
                setOpenRecalc(false)
                setShowEditState(false)
                handleOpenModal(true)
              }}
            >
              <ContentPasteSearchTwoToneIcon sx={{fontSize: 32}} />
            </Button>
          </Tooltip>

          <Tooltip title="Hacer un pago">
            <span>
              <Button
                disableElevation
                color="success"
                disabled={obj.row.estado !== 'vigente' || id_rol > 2}
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  navigate(`/dashboard/payments?id=${obj.row.id}`)
                }}
              >
                <PaidTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Cambiar estado">
            <span>
              <Button
                disableElevation
                disabled={obj.row.estado === 'cancelado' || id_rol > 2}
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  setInitialValues((prev) => ({...prev, ...obj.row}))
                  setShowEditState(true)
                  setShowRecalc(null) // OJO ACA2
                  setOpenRecalc(false)
                  handleScroll(bottom)
                }}
              >
                <ChangeCircleTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Recalcular Cuotas">
            <span>
              <Button
                color="inherit"
                disabled={obj.row.estado !== 'vigente' || obj.row.pagos == 0 || id_rol > 2}
                sx={{minWidth: 0}}
                type="submit"
                variant="text"
                onClick={() => {
                  setInitialValues((prev) => ({...prev, ...obj.row}))
                  setShowRecalc(obj.row.id)
                  setShowEditState(false)
                  setRecalculated([])
                  setOpenRecalc(true)
                  handleScroll(bottom)
                }}
              >
                <CalculateTwoToneIcon sx={{fontSize: 32}} />
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Eliminar contrato individual">
            <span>
              <Button
                color="error"
                disabled={id_rol > 2 || obj.row.estado === 'vigente' || obj.row.estado === 'pagado'}
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
              <MenuItem value="apellido">apellido</MenuItem>
              <MenuItem value="documento">documento</MenuItem>
              <MenuItem value="codigo">código contrato</MenuItem>
            </Select>
            <TextField
              name="query"
              placeholder="Buscar contrato individual..."
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
                setDocument(null) // OJO ACA2
                setApellido(null) // OJO ACA2
                setAll('all')
                setContractsList(null)
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
            getRowHeight={() => 70}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            pageSize={10}
            rows={dataArray}
            rowsPerPageOptions={[10]}
          />
        </div>
      )}

      <Modal activeData={activeData} handleClose={handleCloseModal} open={openModal} />
      <DeleteDialog
        body="Se eliminarán todas las CUOTAS asociadas a este contrato, en caso de tenerlas. Tenga en cuenta que esta operación es irreversible."
        handleAction={handleDelete}
        handleClose={handleCloseDeleteDialog}
        id={activeData?.id}
        open={openDeleteDialog}
      />
    </>
  )
}

export default Table
