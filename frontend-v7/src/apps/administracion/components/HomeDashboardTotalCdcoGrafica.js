/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact/chart'
const HomeDashboardTotalCdcoGrafica = ({ centroDeCosto }) => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const data = {
      labels: [
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S',
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S'
      ],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--blue-500')
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--teal-500')
        },
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45, 12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--gray-600'),
          tension: 0.4,
          backgroundColor: 'rgba(108,117,125,0.2)'
        }
      ]
    }
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          display: false,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    }

    setChartData(data)
    setChartOptions(options)
  }, [])
  return (
    <div className=" ">
      <div className="card">
        <Chart
          type="line"
          data={chartData}
          options={chartOptions}
          style={{
            height: '100px',
            width: '100%'
            // position: 'absolute',
            // overflow: 'hidden',
            // bottom: '30%',
            // 'margin-left': '-6%',
            // 'padding-left': '14%'
          }}
        />
      </div>
    </div>
  )
}

export default HomeDashboardTotalCdcoGrafica
