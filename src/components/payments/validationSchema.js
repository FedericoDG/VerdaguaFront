/* eslint-disable camelcase */
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
    forma_pago: Yup.string().required('La forma de pago es requerida.'),
    info: Yup.string().required('El movimiento es requerido.'),
    recargo: Yup.string().matches(/^[0-9]+$/, 'Sólo se aceptan números.'),
    descuento: Yup.string().matches(
      /^[0-9]+$/,
      'Sólo se aceptan números. No incluya el signo - (menos).'
    ),
    diferencia_descripcion: Yup.string().when(['recargo', 'descuento'], {
      is: (recargo, descuento) => Number(recargo) > 0 || Number(descuento) > 0,
      then: () => Yup.string().required('La descripción sobre el recargo/descuento es requerida.'),
    }),
    info_tarjeta_transferencia: Yup.string().when('forma_pago', {
      is: (forma_pago) => ['debito', 'credito', 'transferencia'].includes(forma_pago),
      then: () =>
        Yup.string().required('Los detalles sobre la tarjeta/transferencia son requeridos'),
    }),
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
