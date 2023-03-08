import * as Yup from 'yup'

const validationSchemaLogin = Yup.object({
  cod_contrato: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(8, 'El DNI debe tener 8 dígitos')
    .max(8, 'El DNI debe tener 8 dígitos')
    .required('El documento es obligatorio.'),
})

export default validationSchemaLogin
