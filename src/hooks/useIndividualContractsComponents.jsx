/* eslint-disable no-shadow */
import {useContext, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useSnackbar} from 'notistack'

import appContext from '../context/AppContext'

import useGetIndividualContracts, {
  useDeleteIndividualContract,
  useGetIndividualContractByCode,
  useGetIndividualContractByDocument,
  useGetIndividualContractList,
  useNewImplements,
  usePutIndividualContract,
} from './useIndividualContracts'

const useIndividualContractsComponents = () => {
  const {bottom, handleScroll} = useContext(appContext)

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [activeData, setActiveData] = useState({})
  const [field, setField] = useState('documento')
  const [code, setCode] = useState(null)
  const [constractsList, setContractsList] = useState(null)
  const [document, setDocument] = useState(null)
  const [all, setAll] = useState(null)

  const resetValues = {
    cod_contrato: '',
    valor_contrato: '',
    pagos: '',
    recargos_pagos_segundo_vencimiento: '',
    estado: '',
    nuevo_valor: '',
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const list = searchParams.get('list') // OJO ACA3

  const {enqueueSnackbar} = useSnackbar()

  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true)
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false)

  const onSuccess = (res) => {
    let code

    if (res.length > 0) {
      code = 'success'
    } else {
      code = 'warning'
    }
    enqueueSnackbar(`Contratos Individuales recuperados: ${res.length}`, {
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

  const {data: dataByCode = [], isFetching: isFetchingByCode} = useGetIndividualContractByCode(
    code,
    onSuccess,
    onError
  )

  const {data: dataByList = [], isFetching: isFetchingList} = useGetIndividualContractList(
    constractsList,
    onSuccess,
    onError
  )

  const {data: dataByDocument = [], isFetching: isFetchingDocument} =
    useGetIndividualContractByDocument(document, onSuccess, onError)

  const {data: allData = [], isFetching: isFetchingAll} = useGetIndividualContracts(
    all,
    onSuccess,
    onError
  )
  const {mutate: newImplements} = useNewImplements()
  const {mutate: putIndividualContract} = usePutIndividualContract()
  const {mutate: deleteIndividualContract} = useDeleteIndividualContract()

  const handleDelete = (id) => {
    deleteIndividualContract(id)
    setActiveData({})
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (field === 'codigo') {
      setAll(null) // OJO ACA2
      setDocument(null) // OJO ACA2
      setCode(e.target.elements.query.value)
    }
    if (field === 'documento') {
      setAll(null) // OJO ACA2
      setCode(null) // OJO ACA2
      setDocument(e.target.elements.query.value)
    }
    e.target.elements.query.value = ''
  }

  return {
    activeData,
    allData,
    dataArray: [...allData, ...dataByCode, ...dataByDocument, ...dataByList],
    dataByCode,
    field,
    handleCloseDeleteDialog,
    handleDelete,
    handleOpenDeleteDialog,
    handleSearchSubmit,
    isFetching: isFetchingAll || isFetchingByCode || isFetchingDocument || isFetchingList,
    code,
    openDeleteDialog,
    putIndividualContract,
    resetValues,
    setActiveData,
    setAll,
    setField,
    setCode,
    newImplements,
    list,
    setContractsList,
  }
}

export default useIndividualContractsComponents
