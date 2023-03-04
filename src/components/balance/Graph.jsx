import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import {Grid} from '@mui/material'

import generateColor from '../../utils/generateColor'

ChartJS.register(ArcElement, Tooltip, Legend)

const Chart = ({allData, displayLabel = false}) => {
  const fede = [
    allData.cash,
    allData.debit,
    allData.credit,
    allData.transference,
    allData.mercadopago,
  ]

  const data = {
    labels: ['efectivo', 'débito', 'cédito', 'transferencia', 'mercadopago'],
    datasets: [
      {
        label: 'monto',
        data: fede,
        backgroundColor: fede.map((el, index) => generateColor(index)),
        borderColor: fede.map((el, index) => generateColor(index)),
        borderWidth: 1,
      },
    ],
  }

  return (
    <Grid item mx={8} xs={5}>
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: displayLabel,
              position: 'left',
            },
            usePointStyle: true,
            boxWidth: 6,
          },
        }}
      />
    </Grid>
  )
}

export default Chart
