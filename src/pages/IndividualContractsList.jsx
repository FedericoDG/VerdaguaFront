import {Grid, Paper, Typography} from '@mui/material'
import {useContext, useState} from 'react'
import {useSnackbar} from 'notistack'

import Dashboard from '../components/Dashboard'
import Form from '../components/individualcontracts/list/Form'
import Recalc from '../components/individualcontracts/list/Recalc'
import Spinner from '../components/Spinner'
import Table from '../components/individualcontracts/list/Table'
import useListIndividualContract from '../hooks/useListIndividualContract'
import {useGetInstallments} from '../hooks/useIndividualContracts'
import appContext from '../context/AppContext'

const IndividualContractsList = () => {
  const {bottom, handleScroll} = useContext(appContext)

  const [openModal, setOpenModal] = useState(false)
  const [showRecalc, setShowRecalc] = useState(null) // OJO ACA2

  const {enqueueSnackbar} = useSnackbar()

  const onSuccess = (res) => {
    let code

    if (res.length > 0) {
      code = 'success'
    } else {
      code = 'warning'
    }
    enqueueSnackbar('Cuotas recuperadas', {
      variant: code,
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    })
    handleScroll(bottom)
  }

  const {data: installments} = useGetInstallments(showRecalc, onSuccess)

  const {
    initialValues,
    setInitialValues,
    showEditState,
    openRecalc,
    id,
    individualContract,
    setShowEditState,
    setOpenRecalc,
  } = useListIndividualContract()

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false)

  return (
    <Dashboard>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography mb={2} sx={{marginBottom: 1}} variant="h6">
            Contratos Individuales
          </Typography>
          <Table
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            openModal={openModal}
            setInitialValues={setInitialValues}
            setOpenRecalc={setOpenRecalc}
            setShowEditState={setShowEditState}
            setShowRecalc={setShowRecalc}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {id && !individualContract ? (
          <Spinner height={187} />
        ) : (
          showEditState && (
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography mb={2} variant="h6">
                Cambiar el estado del contrato
              </Typography>
              <Form
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                setShowEditState={setShowEditState}
              />
            </Paper>
          )
        )}
      </Grid>
      <Grid item xs={12}>
        {id && !installments && !individualContract ? (
          <Spinner height={187} />
        ) : (
          showRecalc &&
          installments &&
          openRecalc && (
            <Paper
              sx={{
                p: 2,
                marginTop: -3, // WTF
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography mb={2} variant="h6">
                Recalcular Cuotas
              </Typography>
              <Recalc
                individualContract={individualContract}
                initialValues={initialValues}
                installments={installments}
                setInitialValues={setInitialValues}
                setShowRecalc={setShowRecalc}
              />
            </Paper>
          )
        )}
      </Grid>
    </Dashboard>
  )
}

export default IndividualContractsList
