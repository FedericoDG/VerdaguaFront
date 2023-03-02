import * as Yup from 'yup'

const validationSchema = Yup.object({
  desde: Yup.date().required('La fecha de inicio es requerida.'),
  hasta: Yup.date().required('La fecha de finalización es requerida.'),
})

export const validationSchema2 = Yup.object({
  importe: Yup.string()
    .matches(
      /^[0-9]+$/,
      'Sólo se aceptan números. No incluya el signo - (menos) para operaciones de tipo "egreso".'
    )
    .required('El importe es requerido.'),
  tipo: Yup.string().required('El tipo de operación es requerido.'),
  forma_pago: Yup.string().required('La forma de pago es requerida.'),
  info: Yup.string(),
})

export default validationSchema
