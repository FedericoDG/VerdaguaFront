import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {deleteRequest, getRequest, postRequest, putRequest} from '../services/httpRequest'

const getGeneralContracts = () => getRequest('/contracts/general')
const gerGeneralContractByInstitutionId = (id) => getRequest(`/contracts/general/institution/${id}`)
const gerGeneralContractCodes = (id) => getRequest(`/contracts/general/codes?id=${id}`)

const getGeneralContractById = (id) => getRequest(`/contracts/general/${id}`)
const gerGeneralContractByCode = (code) =>
  getRequest(`/contracts/general/search?cod_contrato=${code}`)
const gerGeneralContractByInstitution = (name) =>
  getRequest(`/contracts/general/search?name=${name}`)
const createGeneralContract = (responsible) => postRequest('/contracts/general', responsible)
const editGeneralContract = (responsible) =>
  putRequest(`/contracts/general/${responsible.id}`, responsible)
const deleteGeneralContract = (id) => deleteRequest(`/contracts/general/${id}`)

// GET GENERAL CONTRACTS
const useGetGeneralContracts = (all, onSuccess, onError) =>
  useQuery(['generalContracts', all], () => getGeneralContracts(all), {
    enabled: !!all,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetGeneralContractByInstitutionId = (id, onSuccess, onError) =>
  useQuery(['generalContracts', id], () => gerGeneralContractByInstitutionId(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetGeneralContractCodes = (id, onSuccess, onError) =>
  useQuery(['generalContractsCodes', id], () => gerGeneralContractCodes(id), {
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const UseGetGeneralContractById = (id, onSuccess, onError) =>
  useQuery(['generalContracts', id], () => getGeneralContractById(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetGeneralContractByCode = (code, onSuccess, onError) =>
  useQuery(['generalContracts', code], () => gerGeneralContractByCode(code), {
    enabled: !!code,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetGeneralContractByInstitution = (name, onSuccess, onError) =>
  useQuery(['generalContracts', name], () => gerGeneralContractByInstitution(name), {
    enabled: !!name,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

// MUTATION POST
export const usePostGeneralContract = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(createGeneralContract, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('generalContracts')
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
export const usePutGeneralContract = (onError) => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(editGeneralContract, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('generalContracts')
      enqueueSnackbar(res.msg, {
        variant: 'success',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      })
    },
    onError,
  })
}

// MUTACION DELETE
export const useDeleteGenralContract = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deleteGeneralContract, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('generalContracts')
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

export default useGetGeneralContracts
