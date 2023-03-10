import * as Yup from 'yup'

const validationSchemaGeneralContract = Yup.object({
  contratoGeneral: Yup.object().shape({
    label: Yup.string().required('El contrato es requerido.'),
    id: Yup.string().required('El contrato es requerido.'),
  }),
  pasajero: Yup.object().shape({
    label: Yup.string().required('El contrato es requerido.'),
    id: Yup.string().required('El contrato es requerido.'),
  }),
})

export const validationSchemaValue = Yup.object({
  valor: Yup.string()
    .test('Is positive?', 'El valor debe ser mayor a 0', (value) => value > 0)
    .required('El valor es requerido.'),
  cuotas: Yup.string().required('La cantidad de cuotas es requerida.'),
})

export default validationSchemaGeneralContract
