import {useMutation} from 'react-query'
import {useSnackbar} from 'notistack'

import {postRequest} from '../services/httpRequest'

const portMercadopago = (items) => postRequest('/mercadopago/', items)

// MUTATION POST
const usePostMercadopago = (onSuccess) => {
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(portMercadopago, {
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

export default usePostMercadopago
