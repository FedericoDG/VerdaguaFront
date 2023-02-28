import * as Yup from 'yup'

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio.'),
  apellido: Yup.string().required('El apellido es obligatorio.'),
  documento: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(8, 'El DNI debe tener 8 dígitos')
    .max(8, 'El DNI debe tener 8 dígitos')
    .required('El documento es obligatorio.'),
  fecha_nac: Yup.date().required('La fecha de nacimiento es requerida.'),
  email: Yup.string().email('No es un email válido').required('Campo requerido'),
  telefono: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(10, 'El teléfono debe tener 10 dígitos')
    .max(10, 'El teléfono debe tener 10 dígitos')
    .required('El teléfono es obligatorio.'),
  direccion: Yup.string().required('La dirección es obligatoria.'),
  ciudad: Yup.string().required('La ciudad es obligatoria.'),
  provincia: Yup.string().required('La provincia es obligatoria.'),
  codigo_postal: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(4, 'El código postal debe tener 4 dígitos')
    .max(4, 'El código postal debe tener 4 dígitos')
    .required('El código postal es obligatorio.'),
})

export default validationSchema
