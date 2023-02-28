/* eslint-disable no-shadow */
import {DateTime} from 'luxon'
import {useContext, useEffect, useRef, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

import appContext from '../context/AppContext'

import {UseGetGeneralContractById, useGetGeneralContractCodes} from './useGeneralContracts'
import {useGetPassengersCodes} from './usePassengers'

const useCreateIndividualContract = () => {
  const {settings} = useContext(appContext)

  const [contratoGeneral, setContratoGeneral] = useState({})
  const [pasajero, setPasajero] = useState({})
  const [valor, setValor] = useState(null) // OJO ACÁ
  const [cuotas, setCuotas] = useState(null) // OJO ACÁ
  const [code, setCode] = useState('') // OJO ACÁ
  const [initialValues, setInitialValues] = useState({
    contratoGeneral: '',
    pasajero: '',
  })
  const [initialValues2, setInitialValues2] = useState({
    valor: '',
    cuotas: '',
  })

  const generalContractRef = useRef()
  const valueRef = useRef()
  const sendButton = useRef()

  const {data: generalContract, isFetching, remove} = UseGetGeneralContractById(contratoGeneral.id)

  const {data: passengerCodes} = useGetPassengersCodes()
  const {data: generalContractCodes} = useGetGeneralContractCodes(code)

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (!generalContract?.id) return

    const today = DateTime.now()
    const contractDate = DateTime.fromISO(generalContract.created_at)

    if (contractDate.plus({days: settings.alerta_dias_contrato_general}) < today) {
      setInitialValues2((prev) => ({
        ...prev,
        valor:
          Number(generalContract.valor_contrato) +
          (Number(generalContract.valor_contrato) *
            settings.porcentaje_alerta_dias_contrato_general) /
            100,
      }))

      return
    }

    setInitialValues2((prev) => ({...prev, valor: Math.trunc(generalContract.valor_contrato)}))
  }, [generalContract?.id])

  useEffect(() => {
    if (id && generalContractCodes) {
      setInitialValues((prev) => ({...prev, contratoGeneral: generalContractCodes[0]}))
      setCode(id)
    }
  }, [id, generalContractCodes])

  const handleCancel = () => {
    setPasajero({})
    setContratoGeneral({})
    setCuotas(null) // OJO ACA2
    setValor(null) // OJO ACA2
    remove()
    generalContractRef.current?.resetForm()
    valueRef.current?.resetForm()
  }

  /*   const handleScroll = (ref) =>
    setTimeout(() => {
      ref.current?.scrollIntoView({behavior: 'smooth'})
    }, 500) */

  return {
    contratoGeneral,
    cuotas,
    generalContract,
    generalContractCodes,
    generalContractRef,
    handleCancel,
    // handleScroll,
    initialValues,
    initialValues2,
    isFetching,
    pasajero,
    passengerCodes,
    sendButton,
    setCode,
    setCuotas,
    setInitialValues,
    settings,
    valor,
    valueRef,
    setContratoGeneral,
    setPasajero,
    setValor,
  }
}

export default useCreateIndividualContract
