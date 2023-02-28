import * as Yup from 'yup'

const validationSchema = Yup.object({
  apellido: Yup.string().required('El apellido es obligatorio.'),
  nombre: Yup.string().required('El nombre es obligatorio.'),
  documento: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(8, 'El DNI debe tener 8 dígitos')
    .max(8, 'El DNI debe tener 8 dígitos')
    .required('El documento es obligatorio.'),
  fecha_nac: Yup.date().required('La fecha de nacimiento es requerida.'),
})

export default validationSchema
