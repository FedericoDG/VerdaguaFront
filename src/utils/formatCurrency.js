const formatCurrency = (number) =>
  new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARS'}).format(number)

export default formatCurrency
