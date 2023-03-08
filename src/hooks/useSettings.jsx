import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {getRequest, putRequest} from '../services/httpRequest'

const getSettings = () => getRequest('/settings')
const getTicket = () => getRequest('/settings/ticket')
const editSettings = (settings) => putRequest(`/settings/`, settings)

// GET SETTINGES
const useGetSettings = (onSuccess, onError) =>
  useQuery(['settings'], () => getSettings(), {
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetTicket = (onSuccess, onError) =>
  useQuery(['settings'], () => getTicket(), {
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

// MUTATION PUT
export const usePutSettings = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(editSettings, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('settings')
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

export default useGetSettings
