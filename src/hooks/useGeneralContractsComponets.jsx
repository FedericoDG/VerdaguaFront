/* eslint-disable no-shadow */
import {useContext, useState} from 'react'
import {useSnackbar} from 'notistack'
import {Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import EastIcon from '@mui/icons-material/East'

import appContext from '../context/AppContext'

import useGetResponsibles, {
  useDeleteGenralContract,
  useGetGeneralContractByCode,
  useGetGeneralContractByInstitution,
  usePostGeneralContract,
  usePutGeneralContract,
} from './useGeneralContracts'

const useGeneralContractsComponents = () => {
  const {bottom, handleScroll} = useContext(appContext)

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [activeData, setActiveData] = useState({})
  const [field, setField] = useState('name')
  const [code, setCode] = useState(null)
  const [name, setName] = useState(null)
  const [all, setAll] = useState(null)

  const [validContracts, setValidContracts] = useState([])
  const [openDialogForValidContracts, setOpenDialogForValidContracts] = useState(false)

  const handleCloseDialogForValidContracts = () => {
    setValidContracts([])
    setOpenDialogForValidContracts(false)
  }

  const resetValues = {
    descripcion: '',
    valor_contrato: '',
    fecha_viaje: '',
    asientos_totales: '',
    grado: '',
    division: '',
    turno: '',
    institucion: '',
    contract_url: '',
    estado: 'vigente',
  }

  const {enqueueSnackbar} = useSnackbar()

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true)
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const onSuccess = (res) => {
    let code

    if (res.length > 0) {
      code = 'success'
    } else {
      code = 'warning'
    }

    enqueueSnackbar(`Responsables recuperados: ${res.length}`, {
      variant: code,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    })
    handleScroll(bottom)
  }

  const onError = (error) => {
    enqueueSnackbar(error.response.data.msg, {
      variant: 'error',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    })
    handleScroll(bottom)
  }

  const {data: dataByCode = [], isFetching: isFetchingCode} = useGetGeneralContractByCode(
    code,
    onSuccess,
    onError
  )
  const {data: dataByName = [], isFetching: isFetchingName} = useGetGeneralContractByInstitution(
    name,
    onSuccess,
    onError
  )
  const {data: allData = [], isFetching: isFetchingAll} = useGetResponsibles(
    all,
    onSuccess,
    onError
  )

  const navigate = useNavigate()

  const onErrorPut = (error) => {
    enqueueSnackbar(error.response.data.msg, {
      variant: 'error',
      autoHideDuration: 6000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: () => {
        if (error.response.data.valids) {
          return (
            <Button
              color="inherit"
              endIcon={<EastIcon sx={{color: '#ffffff'}} />}
              size="small"
              onClick={() =>
                navigate(
                  `/dashboard/individual-contracts-list?list=${JSON.stringify(
                    error.response.data.valids
                  )}`
                )
              }
            >
              IR A LOS CONTRATOS
            </Button>
          )
        }

        return <div> </div>
      },
    })
    setValidContracts(error.response.data.valids)
    setOpenDialogForValidContracts(true)
  }

  const {mutate: postGeneralContract} = usePostGeneralContract()
  const {mutate: putGeneralContract} = usePutGeneralContract(onErrorPut)
  const {mutate: deleteGeneralContract} = useDeleteGenralContract()

  const handleDelete = (id) => {
    deleteGeneralContract(id)
    setActiveData({})
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (field === 'code') {
      setAll(null) // OJO ACA2
      setName(null) // OJO ACA2
      setCode(e.target.elements.query.value)
    }
    if (field === 'name') {
      setAll(null) // OJO ACA2
      setCode(null) // OJO ACA2
      setName(e.target.elements.query.value)
    }

    e.target.elements.query.value = ''
  }

  return {
    activeData,
    allData,
    dataArray: [...allData, ...dataByCode, ...dataByName],
    dataByCode,
    field,
    handleCloseDeleteDialog,
    handleCloseModal,
    handleDelete,
    handleOpenDeleteDialog,
    handleOpenModal,
    handleSearchSubmit,
    isFetching: isFetchingAll || isFetchingCode || isFetchingName,
    openDeleteDialog,
    openModal,
    postGeneralContract,
    putGeneralContract,
    resetValues,
    setActiveData,
    setAll,
    setCode,
    setField,
    setName,
    //
    validContracts,
    openDialogForValidContracts,
    handleCloseDialogForValidContracts,
  }
}

export default useGeneralContractsComponents
