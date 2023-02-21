/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */

import { Chart } from 'primereact/chart'

const CostoPorTmHomeGrafica = ({ dataGraficaCostoTmMuelle, anoVisual }) => {
  const getLightTheme = () => {
    const basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#fffcf3'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#fffcf3'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#fffcf3'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    }

    return {
      basicOptions
    }
  }

  const { basicOptions } = getLightTheme()

  return (
    <div className="card">
      <h5> COSTOS POR TONELADAS</h5>
      <Chart
        type="bar"
        data={dataGraficaCostoTmMuelle}
        options={basicOptions}
      />
    </div>
  )
}

export default CostoPorTmHomeGrafica
