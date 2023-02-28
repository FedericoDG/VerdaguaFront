import * as Yup from 'yup'

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio.'),
  direccion: Yup.string().required('dirección es obligatorio.'),
  telefono: Yup.string()
    .matches(/^[0-9]+$/, 'Sólo se aceptan números')
    .min(10, 'El teléfono debe tener 10 dígitos')
    .max(10, 'El teléfono debe tener 10 dígitos')
    .required('El teléfono es obligatorio.'),
  localidad: Yup.string().required('La localidad es obligatoria.'),
})

export default validationSchema
