import * as Yup from 'yup'

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio.'),
  apellido: Yup.string().required('El apellido es obligatorio.'),
  email: Yup.string().email('No es un email válido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
  id_rol: Yup.string().required('El Rol es obligatorio.'),
})

export default validationSchema
