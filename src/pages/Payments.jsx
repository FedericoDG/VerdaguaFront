/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import {Button, Grid, Paper, Stack, Typography} from '@mui/material'
import {Navigate, useSearchParams} from 'react-router-dom'
import {useContext, useEffect, useMemo, useRef, useState} from 'react'

import {useGetIndividualContractsCodes, useGetInstallments} from '../hooks/useIndividualContracts'
import appContext from '../context/AppContext'
import Bill from '../components/payments/Bild'
import Dashboard from '../components/Dashboard'
import formatCurrency from '../utils/formatCurrency'
import GeneratePayment from '../components/payments/GeneratePayment'
import InstallmentsTable from '../components/payments/InstallmentsTable'
import SeachPassengerForm from '../components/payments/SeachPassengerForm'
import Spinner from '../components/Spinner'

const Payments = () => {
  const {
    user: {id_rol},
    handleScroll,
    bottom,
  } = useContext(appContext)

  if (id_rol > 2) return <Navigate replace to="/dashboard/passengers" />

  const [cart, setCart] = useState([])

  const [initialValues, setInitialValues] = useState({
    contratoIndividual: {id: '', label: ''},
  })

  const [initialValues2, setInitialValues2] = useState({
    cuotas: [],
    movimiento: {
      importe: 0,
      tipo: 'ingreso',
      forma_pago: 'efectivo',
      info: '',
      descuento: 0,
      recargo: 0,
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

  useEffect(() => {
    if (installments) {
      setInitialValues2((prev) => ({
        ...prev,
        valor_contrato: Number(installments[0].contrato_individual.valor_contrato),
        pagos_hechos: Number(installments[0].contrato_individual.pagos),
      }))
    }
  }, [installments])

  const form1Ref = useRef()
  const form2Ref = useRef()

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

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
      cuotas: [],
      movimiento: {
        importe: 0,
        tipo: 'ingreso',
        forma_pago: 'efectivo',
        info: '',
        descuento: 0,
        recargo: 0,
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
    setCart([])
  }

  const total = useMemo(() => cart.reduce((acc, el) => acc + el.valor + el.recargo, 0), [cart])
  const recargo = useMemo(() => cart.reduce((acc, el) => acc + el.recargo, 0), [cart])
  const sortedCart = [...cart].sort((a, b) => (a.numero > b.numero ? 1 : 0))

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
            <Grid container spacing={4}>
              <Grid item md={8} xs={12}>
                <InstallmentsTable
                  cart={cart}
                  initialValues2={initialValues2}
                  installments={installments}
                  isFetchingInstallments={isFetchingInstallments}
                  setCart={setCart}
                  setInitialValues2={setInitialValues2}
                  total={total}
                />
              </Grid>
              <Grid item md={4} mt={10} xs={12}>
                <Paper
                  sx={{
                    backgroundColor: '#f3f3f3',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Typography align="center" variant="h6">
                      CUOTAS SELECCIONADAS
                    </Typography>
                    {cart.length > 0 &&
                      sortedCart.map((el) => (
                        <Stack
                          key={el.id}
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          sx={{mx: 2}}
                        >
                          {el.numero === 0 ? (
                            <Typography variant="button">Seña</Typography>
                          ) : (
                            <Typography variant="button">
                              Cuota n° <strong>{el.numero}</strong>
                            </Typography>
                          )}
                          <Typography variant="body1">
                            {formatCurrency(el.valor + el.recargo)}
                          </Typography>
                        </Stack>
                      ))}
                  </div>
                  <div>
                    {cart.length > 0 ? (
                      <Button
                        fullWidth
                        color="error"
                        size="small"
                        sx={{my: 1}}
                        variant="text"
                        onClick={() => setCart([])}
                      >
                        Limpiar lista de cuotas
                      </Button>
                    ) : (
                      <Typography align="center" color="GrayText" sx={{my: 1}} variant="body2">
                        AGREGAR LAS CUOTAS A COBRAR
                      </Typography>
                    )}
                    <Button
                      fullWidth
                      color="primary"
                      disabled={cart.length === 0}
                      variant="contained"
                      onClick={() => {
                        if (cart.find((el) => el.numero === 0)) {
                          if (cart.length === 1) {
                            // TIENE SOLAMENTE LA SEÑA
                            setInitialValues2((prev) => ({
                              ...prev,
                              cuotas: cart,
                              contratoIndividual: {
                                ...prev.contratoIndividual,
                                recargo,
                                pago: total - recargo,
                              },
                              movimiento: {
                                ...prev.movimiento,
                                importe: total,
                                info: `Pago de seña. Saldo ${
                                  initialValues2.valor_contrato -
                                  initialValues2.pagos_hechos -
                                  total
                                }. Contrato: ${initialValues2.cod_contrato}.`,
                              },
                            }))
                          } else if (cart.length === 2) {
                            // TIENE LA SEÑA Y UNA CUOTA
                            setInitialValues2((prev) => ({
                              ...prev,
                              cuotas: cart,
                              contratoIndividual: {
                                ...prev.contratoIndividual,
                                recargo,
                                pago: total - recargo,
                              },
                              movimiento: {
                                ...prev.movimiento,
                                importe: total,
                                info: `Pago de seña y cuota n° ${cart[1].numero}. Saldo ${
                                  initialValues2.valor_contrato -
                                  initialValues2.pagos_hechos -
                                  total
                                }. Contrato: ${initialValues2.cod_contrato}.`,
                              },
                            }))
                          } else {
                            // TIENE LA SEÑA Y VARIAS CUOTAS
                            const cuotas = cart
                              .filter((el) => el.numero !== 0)
                              .map((el) => el.numero)
                            const ultimaCuota = cuotas.pop()

                            setInitialValues2((prev) => ({
                              ...prev,
                              cuotas: cart,
                              contratoIndividual: {
                                ...prev.contratoIndividual,
                                recargo,
                                pago: total - recargo,
                              },
                              movimiento: {
                                ...prev.movimiento,
                                importe: total,
                                info: `Pago de seña y cuotas n° ${cuotas.join(
                                  ', '
                                )} y ${ultimaCuota}. Saldo ${
                                  initialValues2.valor_contrato -
                                  initialValues2.pagos_hechos -
                                  total
                                }. Contrato: ${initialValues2.cod_contrato}.`,
                              },
                            }))
                          }
                        } else if (cart.length === 1) {
                          // TIENE SOLAMENTE UNA CUOTA
                          setInitialValues2((prev) => ({
                            ...prev,
                            cuotas: cart,
                            contratoIndividual: {
                              ...prev.contratoIndividual,
                              recargo,
                              pago: total - recargo,
                            },
                            movimiento: {
                              ...prev.movimiento,
                              importe: total,
                              info: `Pago de cuota n° ${cart[0].numero}. Saldo ${
                                initialValues2.valor_contrato - initialValues2.pagos_hechos - total
                              }. Contrato: ${initialValues2.cod_contrato}.`,
                            },
                          }))
                        } else {
                          // TIENE VARIAS CUOTAS
                          const cuotas = cart.map((el) => el.numero)
                          const ultimaCuota = cuotas.pop()

                          setInitialValues2((prev) => ({
                            ...prev,
                            cuotas: cart,
                            contratoIndividual: {
                              ...prev.contratoIndividual,
                              recargo,
                              pago: total - recargo,
                            },
                            movimiento: {
                              ...prev.movimiento,
                              importe: total,
                              info: `Pago de cuotas n° ${cuotas.join(
                                ', '
                              )} y ${ultimaCuota}. Saldo ${
                                initialValues2.valor_contrato - initialValues2.pagos_hechos - total
                              }. Contrato: ${initialValues2.cod_contrato}.`,
                            },
                          }))
                        }
                        setShowResume(true)
                        handleScroll(bottom)
                      }}
                    >
                      Cobrar {formatCurrency(total)}
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
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
