import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {getRequest, postRequest} from '../services/httpRequest'

const getBalance = (dates) =>
  getRequest(`/balance?from=${dates.desde}&to=${dates.hasta}&info=${dates.info}`)
const createBalance = (balance) => postRequest('/balance/', balance)

// GET BALANCE
const useGetBalance = (dates, onSuccess, onError) =>
  useQuery(['balance', dates], () => getBalance(dates), {
    enabled: !!dates,
    retry: 1,
    cacheTime: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

// MUTATION POST
export const usePostBalance = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(createBalance, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('balance')
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

export default useGetBalance
