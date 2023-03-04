import * as Yup from 'yup'

const validationSchemaLogin = Yup.object({
  cod_contrato: Yup.string().required('El código de contrato es obligatorio'),
})

export default validationSchemaLogin
