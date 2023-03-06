import {useMutation, useQuery} from 'react-query'
import {useSnackbar} from 'notistack'

import {getRequest, postRequest} from '../services/httpRequest'

const portMercadopago = (items) => postRequest('/mercadopago/', items)
const getMPOrder = (id) => getRequest(`/mercadopago/${id}`)

// GET ORDER
export const useGetMPOrder = (id, onSuccess, onError) =>
  useQuery(['MPOrder', id], () => getMPOrder(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

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
