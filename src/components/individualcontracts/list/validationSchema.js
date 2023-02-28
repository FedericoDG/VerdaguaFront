import * as Yup from 'yup'

const validationSchema = Yup.object({
  cod_contrato: Yup.string().required('El código de contrato es obligatorio.'),
  valor_contrato: Yup.string().required('El valor del contrato es obligatorio.'),
  // nuevo_valor: Yup.string().required('El valor del contrato es obligatorio.'),
  pagos: Yup.string().required('Los pagos son obligatorios.'),
  recargos_pagos_segundo_vencimiento: Yup.string().required(
    'Los recargos por pago en segundo vencimiento son obligatorios.'
  ),
  estado: Yup.string().required('El estado es obligatorio.'),
})

export const validationSchema2 = Yup.object({
  cod_contrato: Yup.string().required('El código de contrato es obligatorio.'),
  valor_contrato: Yup.string().required('El valor del contrato es obligatorio.'),
  nuevo_valor: Yup.string().required('El valor del contrato es obligatorio.'),
  pagos: Yup.string().required('Los pagos son obligatorios.'),
  recargos_pagos_segundo_vencimiento: Yup.string().required(
    'Los recargos por pago en segundo vencimiento son obligatorios.'
  ),
  estado: Yup.string().required('El estado es obligatorio.'),
})

export default validationSchema
