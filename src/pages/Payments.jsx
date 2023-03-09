/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import {Grid, Paper, Typography} from '@mui/material'
import {useContext, useEffect, useRef, useState} from 'react'
import {Navigate, useSearchParams} from 'react-router-dom'

import {useGetIndividualContractsCodes, useGetInstallments} from '../hooks/useIndividualContracts'
import appContext from '../context/AppContext'
import Bill from '../components/payments/Bild'
import Dashboard from '../components/Dashboard'
import GeneratePayment from '../components/payments/GeneratePayment'
import InstallmentsTable from '../components/payments/InstallmentsTable'
import SeachPassengerForm from '../components/payments/SeachPassengerForm'
import Spinner from '../components/Spinner'

const Payments = () => {
  const {
    user: {id_rol},
  } = useContext(appContext)

  if (id_rol > 2) return <Navigate replace to="/dashboard/passengers" />

  const [initialValues, setInitialValues] = useState({
    contratoIndividual: {id: '', label: ''},
  })

  const [initialValues2, setInitialValues2] = useState({
    cuota: {
      id: '',
      estado: '',
    },
    movimiento: {
      importe: 0,
      tipo: 'ingreso',
      forma_pago: 'efectivo',
      info: 'pago de cuota',
      descuento: '0',
      recargo: '0',
      diferencia_descripcion: '',
      info_tarjeta_transferencia: '',
    },
    contratoIndividual: {
      pago: 0,
      recargo: 0,
    },
    destinatario: '',
    DNI: '',
    domicilio: '',
  })

  const [contractId, setContractId] = useState('') // OJO ACA2
  const [showInstallments, setShowInstallments] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [showBill, setShowBill] = useState(false)

  const {data: passengerCodes} = useGetIndividualContractsCodes(contractId)
  const {data: installments, isFetchingInstallments} = useGetInstallments(
    initialValues?.contratoIndividual?.id
  )

  const form1Ref = useRef()
  const form2Ref = useRef()

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (initialValues2.cuota.id) {
      setShowResume(true)
    }
  }, [initialValues2])

  useEffect(() => {
    if (id) {
      setContractId(id)
    } else {
      setContractId('') // OJO ACA2
    }
  }, [id])

  useEffect(() => {
    if (id && passengerCodes) {
      setInitialValues((prev) => ({...prev, contratoIndividual: passengerCodes[0]}))
      setContractId(id)
      setShowInstallments(true)
    }
  }, [id, passengerCodes])

  const hardReset = () => {
    setInitialValues2({
      cuota: {
        id: '',
        estado: '',
      },
      movimiento: {
        importe: 0,
        tipo: 'ingreso',
        forma_pago: 'efectivo',
        info: 'Pago de cuota',
        descuento: '0',
        recargo: '0',
        diferencia_descripcion: '',
        info_tarjeta_transferencia: '',
      },
      contratoIndividual: {
        pago: 0,
        recargo: 0,
      },
      destinatario: '',
      DNI: '',
      domicilio: '',
    })
    setInitialValues({
      contratoIndividual: {id: '', label: ''},
    })
    setSearchParams({id: ''})
    form1Ref.current?.resetForm()
    form2Ref.current?.resetForm()
    setShowInstallments(false)
    setShowResume(false)
    setShowBill(false)
  }

  return (
    <Dashboard>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            mb: 2,
          }}
        >
          {!passengerCodes ? (
            <Spinner height={275} />
          ) : passengerCodes?.length === 0 ? (
            <>
              <Typography align="center" color="GrayText" variant="h6">
                No se encontraron Contratos Individuales VIGENTES
              </Typography>
              <Typography align="center" variant="button">
                No es posible crear un pago
              </Typography>
            </>
          ) : (
            <SeachPassengerForm
              form1Ref={form1Ref}
              hardReset={hardReset}
              id={id}
              initialValues={initialValues}
              passengerCodes={passengerCodes}
              setInitialValues={setInitialValues}
              setSearchParams={setSearchParams}
              setShowInstallments={setShowInstallments}
            />
          )}
          {showInstallments && (
            <InstallmentsTable
              initialValues2={initialValues2}
              installments={installments}
              isFetchingInstallments={isFetchingInstallments}
              setInitialValues2={setInitialValues2}
            />
          )}
          {showResume && (
            <GeneratePayment
              form2Ref={form2Ref}
              hardReset={hardReset}
              initialValues2={initialValues2}
              setInitialValues={setInitialValues}
              setInitialValues2={setInitialValues2}
              setShowBill={setShowBill}
            />
          )}
          {showBill && (
            <Bill
              hardReset={hardReset}
              initialValues={initialValues}
              initialValues2={initialValues2}
            />
          )}
        </Paper>
      </Grid>
    </Dashboard>
  )
}

export default Payments
