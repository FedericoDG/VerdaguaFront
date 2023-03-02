import {useContext, useState} from 'react'
import {useSnackbar} from 'notistack'

import appContext from '../context/AppContext'

import useGetInstitutions, {
  useDeleteInstitution,
  useGetInstitutionByName,
  usePostInstitution,
  usePutInstitution,
} from './useInstitutions'

const useInstitutionsComponents = () => {
  const {bottom, handleScroll} = useContext(appContext)

  const [openModal, setOpenModal] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [activeData, setActiveData] = useState({})
  const [field, setField] = useState('nombre')
  const [name, setName] = useState(null)
  const [all, setAll] = useState(null)

  const resetValues = {
    nombre: '',
    direccion: '',
    telefono: '',
    localidad: '',
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

    enqueueSnackbar(`Instituciones recuperadas: ${res.length}`, {
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

  const {data: dataByname = [], isFetching: isFetchingByName} = useGetInstitutionByName(
    name,
    onSuccess,
    onError
  )
  const {data: allData = [], isFetching: isFetchingAll} = useGetInstitutions(
    all,
    onSuccess,
    onError
  )
  const {mutate: postInstitution} = usePostInstitution()
  const {mutate: putInstitution} = usePutInstitution()
  const {mutate: deleteInstitution} = useDeleteInstitution()

  const handleDelete = (id) => {
    deleteInstitution(id)
    setActiveData({})
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (field === 'nombre') {
      setAll(null) // OJO ACA2
      setName(e.target.elements.query.value)
    }
    e.target.elements.query.value = ''
  }

  return {
    activeData,
    allData,
    bottom,
    dataArray: [...allData, ...dataByname],
    dataByname,
    field,
    handleCloseDeleteDialog,
    handleCloseModal,
    handleDelete,
    handleOpenDeleteDialog,
    handleOpenModal,
    handleSearchSubmit,
    isFetching: isFetchingAll || isFetchingByName,
    name,
    openDeleteDialog,
    openModal,
    postInstitution,
    putInstitution,
    resetValues,
    setActiveData,
    setAll,
    setField,
    setName,
  }
}

export default useInstitutionsComponents
