import {useMutation, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {postRequest, putRequest} from '../services/httpRequest'

const createPay = (pay) => postRequest('/installments/pay', pay)
const unblockInstallment = (id) => putRequest(`/installments/${id}`)

// MUTATION POST
const useCreatePay = (onSuccess) => {
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(createPay, {
    onSuccess,
    onError: (error) => {
      enqueueSnackbar(error.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
  })
}

// MUTATION PUT
export const useUnblockInstallment = () => {
  const queryClient = useQueryClient()
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(unblockInstallment, {
    onSuccess: (res) => {
      queryClient.invalidateQueries(['individualContracts', 'installments'])
      enqueueSnackbar(res.msg, {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
  })
}

export default useCreatePay
