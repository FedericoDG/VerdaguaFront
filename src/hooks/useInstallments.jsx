import {useMutation} from 'react-query'
import {useSnackbar} from 'notistack'

import {postRequest} from '../services/httpRequest'

const createPay = (pay) => postRequest('/installments/pay', pay)

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

export default useCreatePay
