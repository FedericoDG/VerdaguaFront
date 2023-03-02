import * as Yup from 'yup'

const validationSchema = Yup.object({
  contratoIndividual: Yup.object().shape({
    label: Yup.string().required('El DNI es requerido'),
    id: Yup.string().required('El DNI es requerido'),
  }),
})

export const validationSchema2 = Yup.object({
  cuota: Yup.object().shape({
    id: Yup.string().required('La cuota es requerida.'),
    estado: Yup.string().required('La cuota es requerida.'),
  }),
  movimiento: Yup.object().shape({
    importe: Yup.string().required('El movimiento es requerido.'),
    tipo: Yup.string().required('El movimiento es requerido.'),
    forma_pago: Yup.string().required('El movimiento es requerido.'),
    info: Yup.string().required('El movimiento es requerido.'),
  }),
  contratoIndividual: Yup.object().shape({
    pago: Yup.string().required('El contrato es requerido.'),
    recargo: Yup.string().required('El contrato es requerido.'),
  }),
  destinatario: Yup.string().required('El destinatario es requerido.'),
  DNI: Yup.string().required('El documento es requerido.'),
  domicilio: Yup.string(),
})

export default validationSchema
