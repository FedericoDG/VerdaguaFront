import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {deleteRequest, getRequest, postRequest, putRequest} from '../services/httpRequest'

const getPassengers = () => getRequest('/passengers/')
const getPassengerById = (id) => getRequest(`/passengers/${id}`)
const getPassengerCodes = () => getRequest('/passengers/codes')
const getPassengerByResponsible = (document) => getRequest(`/passengers/responsible/${document}`)
const getPassengerByDocument = (document) => getRequest(`/passengers/search?documento=${document}`)
const getPassengerByLastname = (lastname) => getRequest(`/passengers/search?apellido=${lastname}`)
const createPassenger = (passenger) => postRequest('/passengers/', passenger)
const editPassenger = (passenger) => putRequest(`/passengers/${passenger.id}`, passenger)
const deletePassenger = (id) => deleteRequest(`/passengers/${id}`)

// GET PASSENGERS
const useGetPassengers = (all, onSuccess, onError) =>
  useQuery(['passengers', all], () => getPassengers(all), {
    enabled: !!all,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetPassengerById = (id, onSuccess, onError) =>
  useQuery(['passengers', id], () => getPassengerById(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetPassengersCodes = (onSuccess, onError) =>
  useQuery(['passengers'], () => getPassengerCodes(), {
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetPassengersByResponsible = (document, onSuccess, onError) =>
  useQuery(['passengers', document], () => getPassengerByResponsible(document), {
    enabled: !!document,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetPassengerByDocument = (document, onSuccess, onError) =>
  useQuery(['passengers', document], () => getPassengerByDocument(document), {
    enabled: !!document,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetPassengerByLastname = (lastname, onSuccess, onError) =>
  useQuery(['passengers', lastname], () => getPassengerByLastname(lastname), {
    enabled: !!lastname,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

// MUTATION POST
export const usePostPassenger = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(createPassenger, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('passengers')
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
export const usePutPassenger = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(editPassenger, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('passengers')
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
export const useDeletePassenger = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deletePassenger, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('passengers')
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

export default useGetPassengers
