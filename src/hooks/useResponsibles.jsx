import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useSnackbar} from 'notistack'

import {deleteRequest, getRequest, postRequest, putRequest} from '../services/httpRequest'

const getResponsibles = () => getRequest('/responsibles/')
const getResponsibleById = (id) => getRequest(`/responsibles/${id}`)
const getResponsibleDocuments = () => getRequest('/responsibles/documents')
const getResponsibleByDocument = (document) =>
  getRequest(`/responsibles/search?documento=${document}`)
const getResponsibleByLastname = (lastname) =>
  getRequest(`/responsibles/search?apellido=${lastname}`)
const createResponsible = (responsible) => postRequest('/responsibles/', responsible)
const editResponsible = (responsible) => putRequest(`/responsibles/${responsible.id}`, responsible)
const deleteResponsible = (id) => deleteRequest(`/responsibles/${id}`)

// GET PASSENGERS
const useGetResponsibles = (all, onSuccess, onError) =>
  useQuery(['responsibles', all], () => getResponsibles(all), {
    enabled: !!all,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const UseGetResponsibleById = (id, onSuccess, onError) =>
  useQuery(['responsibles', id], () => getResponsibleById(id), {
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetResponsibleDocuments = (onSuccess, onError) =>
  useQuery(['responsibles'], () => getResponsibleDocuments(), {
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetResponsibleByDocument = (document, onSuccess, onError) =>
  useQuery(['responsibles', document], () => getResponsibleByDocument(document), {
    enabled: !!document,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

export const useGetResponsibleByLastname = (lastname, onSuccess, onError) =>
  useQuery(['responsibles', lastname], () => getResponsibleByLastname(lastname), {
    enabled: !!lastname,
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    select: (data) => data.data,
  })

// MUTATION POST
export const usePostResponsible = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(createResponsible, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('responsibles')
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
export const usePutResponsible = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(editResponsible, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('responsibles')
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
export const useDeleteResponsible = () => {
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(deleteResponsible, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('responsibles')
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

export default useGetResponsibles
