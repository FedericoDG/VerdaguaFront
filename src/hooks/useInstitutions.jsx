import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {deleteRequest, getRequest, postRequest, putRequest} from '../services/httpRequest'

const getInstitutions = () => getRequest('/institutions/')
const getInstitutionById = (id) => getRequest(`/institutions/${id}`)
const getInstitutionCodes = () => getRequest('/institutions/codes')
const getInstitutionByName = (name) => getRequest(`/institutions/search?name=${name}`)
const createInstitution = (institution) => postRequest('/institutions/', institution)
const editInstitution = (institution) => putRequest(`/institutions/${institution.id}`, institution)
const deleteInstitution = (id) => deleteRequest(`/institutions/${id}`)

// GET INSTITUTIONS
const useGetInstitutions = (all, onSuccess, onError) =>
  useQuery(['institutions', all], () => getInstitutions(all), {
    enabled: !!all,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetInstitutionById = (id, onSuccess, onError) =>
  useQuery(['institutions', id], () => getInstitutionById(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetInstitutionCodes = (id, onSuccess, onError) =>
  useQuery(['institutions'], () => getInstitutionCodes(), {
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetInstitutionByName = (name, onSuccess, onError) =>
  useQuery(['institutions', name], () => getInstitutionByName(name), {
    enabled: !!name,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

// MUTATION POST
export const usePostInstitution = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(createInstitution, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('institutions')
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

// MUTATION PUT
export const usePutInstitution = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(editInstitution, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('institutions')
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

// MUTACION DELETE
export const useDeleteInstitution = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deleteInstitution, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('institutions')
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

export default useGetInstitutions
