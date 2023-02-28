import * as Yup from 'yup'

const validationSchema = Yup.object({
  descripcion: Yup.string().required('La descripción es requerida.'),
  fecha_viaje: Yup.date().required('La fecha de viaje es requerida.'),
  asientos_totales: Yup.string()
    .test('Is positive?', 'El número de pasajeros debe ser mayor a 0', (value) => value > 0)
    .required('El cupo de pasajeros es requerido.'),
  valor_contrato: Yup.number()
    .test('Is positive?', 'El valor debe ser mayor a 0', (value) => value > 0)
    .required('el valor del contrato es obligatorio.'),
  grado: Yup.string().required('El grado es requerido.'),
  division: Yup.string().required('La division es requerida.'),
  turno: Yup.string().required('El turno es requerido.'),
  institucion: Yup.object().shape({
    label: Yup.string().required('La institución es requerida.'),
    id: Yup.string().required('La institución es requerida.'),
  }),
  estado: Yup.string().required('El estado es requerido.'),
})

export default validationSchema
