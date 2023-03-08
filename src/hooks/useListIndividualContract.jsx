import {useSearchParams} from 'react-router-dom'
import {useState} from 'react'

import {useGetIndividualContactById} from './useIndividualContracts'

const useListIndividualContract = () => {
  const [initialValues, setInitialValues] = useState({
    cod_contrato: '',
    valor_contrato: '',
    pagos: '',
    recargos_pagos_segundo_vencimiento: '',
    estado: '',
    id: '',
    nuevo_valor: '',
  })

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [showEditState, setShowEditState] = useState(false)
  const [recalculated, setRecalculated] = useState([])
  const [newContractValue, setNewContractValue] = useState(null) // OJO ACA2
  const [openRecalc, setOpenRecalc] = useState(false)

  const {data: individualContract} = useGetIndividualContactById(id)

  return {
    initialValues,
    setInitialValues,
    showEditState,
    setShowEditState,
    recalculated,
    setRecalculated,
    newContractValue,
    setNewContractValue,
    openRecalc,
    setOpenRecalc,
    individualContract,
  }
}

export default useListIndividualContract
