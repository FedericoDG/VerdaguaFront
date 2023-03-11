import {useContext, useState} from 'react'
import {useSnackbar} from 'notistack'

import appContext from '../context/AppContext'

import useGetResponsibles, {
  useDeletePassenger,
  useGetPassengerByDocument,
  useGetPassengerByLastname,
  usePostPassenger,
  usePutPassenger,
} from './usePassengers'

const usePassengersComponents = () => {
  const {bottom, handleScroll} = useContext(appContext)

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [activeData, setActiveData] = useState({})
  const [field, setField] = useState('apellido')
  const [document, setDocument] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [all, setAll] = useState(null)

  const resetValues = {
    nombre: '',
    apellido: '',
    documento: '',
    fecha_nac: '',
    obs_medicas: '',
    documento_responsable: '',
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

    enqueueSnackbar(`Pasajeros recuperados: ${res.length}`, {
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
    handleScroll()
  }

  const {data: dataByDocument = [], isFetching: isFetchingDocument} = useGetPassengerByDocument(
    document,
    onSuccess,
    onError
  )
  const {data: dataByLastname = [], isFetching: isFetchingLastname} = useGetPassengerByLastname(
    lastname,
    onSuccess,
    onError
  )
  const {data: allData = [], isFetching: isFetchingAll} = useGetResponsibles(
    all,
    onSuccess,
    onError
  )
  const {mutate: postPassenger, isLoading: isLoadingPost} = usePostPassenger()
  const {mutate: putPassenger, isLoading: isLoadingPut} = usePutPassenger()
  const {mutate: deletePassenger} = useDeletePassenger()

  const handleDelete = (id) => {
    deletePassenger(id)
    setActiveData({})
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (field === 'documento') {
      setLastname(null)
      setAll(null)
      setDocument(e.target.elements.query.value)
    }
    if (field === 'apellido') {
      setDocument(null)
      setAll(null)
      setLastname(e.target.elements.query.value)
    }
    e.target.elements.query.value = ''
  }

  return {
    activeData,
    dataArray: [...allData, ...dataByDocument, ...dataByLastname],
    isLoading: isLoadingPost || isLoadingPut,
    bottom,
    dataByDocument,
    dataByLastname,
    field,
    handleCloseDeleteDialog,
    handleCloseModal,
    handleDelete,
    handleOpenDeleteDialog,
    handleOpenModal,
    handleSearchSubmit,
    isFetching: isFetchingAll || isFetchingDocument || isFetchingLastname,
    openDeleteDialog,
    openModal,
    postPassenger,
    putPassenger,
    resetValues,
    setActiveData,
    setAll,
    setDocument,
    setField,
    setLastname,
  }
}

export default usePassengersComponents
