import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {deleteRequest, getRequest, postRequest, putRequest} from '../services/httpRequest'

/* const getInstitutions = () => getRequest('/institutions/')
const getInstitutionById = (id) => getRequest(`/institutions/${id}`) */
const createPay = (pay) => postRequest('/installments/pay', pay)

// GET INSTITUTIONS
/* const useGetInstitutions = (all, onSuccess, onError) =>
  useQuery(['institutions', all], () => getInstitutions(all), {
    enabled: !!all,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  }) */

/* export const useGetInstitutionById = (id, onSuccess, onError) =>
  useQuery(['institutions', id], () => getInstitutionById(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  }) */

// MUTATION POST
const useCreatePay = (onSuccess) => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

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
