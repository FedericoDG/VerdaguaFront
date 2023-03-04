import * as Yup from 'yup'

const validationSchema = Yup.object({
  alerta_dias_contrato_general: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(1, 'Mínimo 1 dígito')
    .max(3, 'Máximo 3 dígitos')
    .required('Alerta por Contrato General creado hace más de x días es requerida.'),
  porcentaje_alerta_dias_contrato_general: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(1, 'Mínimo 1 dígito')
    .max(3, 'Máximo 3 dígitos')
    .required('Porcentaje de recargo por Contrato General creado hace más de x días es requerido.'),
  porcentaje_senia: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(1, 'Mínimo 1 dígito')
    .max(3, 'Máximo 3 dígitos')
    .required('Porcentaje de seña es requerido.'),
  dias_diferencia_cuotas: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(1, 'Mínimo 1 dígito')
    .max(2, 'Máximo 2 dígitos')
    .required('Días de diferencia entre primera y segunda cuota es requerido.'),
  porcentaje_recargo_segundo_vencimiento: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(1, 'Mínimo 1 dígito')
    .max(2, 'Máximo 2 dígitos')
    .required('Porcentaje de recargo por segundo vencimiento" es requerido.'),
  access_token_produccion: Yup.string().required(
    'Access Token de preducción de Mercadopago es requerido.'
  ),
})

export default validationSchema
