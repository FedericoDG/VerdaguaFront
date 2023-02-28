import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {deleteRequest, getRequest, postRequest, putRequest} from '../services/httpRequest'

const getIndividualContracts = () => getRequest('/contracts/individual')
const getIndividualContractById = (id) => getRequest(`/contracts/individual/${id}`)
const getIndividualContractsCodes = (id) => getRequest(`/contracts/individual/codes?id=${id}`)
const getIndividualContractByCode = (code) =>
  getRequest(`/contracts/individual/search?code=${code}`)
const getIndividualContractByDocument = (document) =>
  getRequest(`/contracts/individual/search?document=${document}`)
const getIndividualContractList = (list) => getRequest(`/contracts/individual/search?list=${list}`)
const getInstallments = (id) => getRequest(`/contracts/individual/installments/${id}`)
const createIndividualContract = (contract) => postRequest('/contracts/individual/', contract)
const recalculate = (contract) =>
  postRequest(`/contracts/individual/recalculate/${contract.id}`, contract)
const editIndividualContract = (contract) =>
  putRequest(`/contracts/individual/${contract.id}`, contract)
const newImplements = (shares) =>
  putRequest(`/contracts/individual/new-implements/${shares.id}`, shares)

const deleteIndividualContract = (id) => deleteRequest(`/contracts/individual/${id}`)

// GET INDIVIDUAL CONTRACTS
const useGetIndividualContracts = (all, onSuccess, onError) =>
  useQuery(['individualContracts', all], () => getIndividualContracts(all), {
    enabled: !!all,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetIndividualContactById = (id, onSuccess, onError) =>
  useQuery(['individualContracts', id], () => getIndividualContractById(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetIndividualContractsCodes = (id, onSuccess, onError) =>
  useQuery(['passengers', id], () => getIndividualContractsCodes(id), {
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetInstallments = (id, onSuccess, onError) =>
  useQuery(['individualContracts', 'installments', id], () => getInstallments(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetIndividualContractByCode = (code, onSuccess, onError) =>
  useQuery(['individualContracts', code], () => getIndividualContractByCode(code), {
    enabled: !!code,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetIndividualContractByDocument = (document, onSuccess, onError) =>
  useQuery(['individualContracts', document], () => getIndividualContractByDocument(document), {
    enabled: !!document,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetIndividualContractList = (list, onSuccess, onError) =>
  useQuery(['individualContracts', list], () => getIndividualContractList(list), {
    enabled: !!list,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

// MUTATION POST
export const usePostIndividualContract = (onSuccess) => {
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(createIndividualContract, {
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

export const useRecalculate = (onSuccess) => {
  const {enqueueSnackbar} = useSnackbar()

  return useMutation(recalculate, {
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
export const usePutIndividualContract = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(editIndividualContract, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('individualContracts')
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

export const useNewImplements = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(newImplements, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('individualContracts')
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
export const useDeleteIndividualContract = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deleteIndividualContract, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('individualContracts')
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

export default useGetIndividualContracts
