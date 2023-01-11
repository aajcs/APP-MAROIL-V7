/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import { Chart } from 'primereact/chart'
import { Tag } from 'primereact/tag'

import buquegura4 from '../assetsControl/buqueFigura4.png'
import buqueFigura from '../assetsControl/BuquesFigura'
import BodegasInfo from './BodegasInfo'

const bodegasCarga = {
  bodega1: 10,
  bodega2: 20,
  bodega3: 30,
  bodega4: 40,
  bodega5: 50
}

const BarChartDemo = ({
  heightBogega,
  bodegasDelBarco,
  barcos,
  tolltip,
  reporteCargaGOM
}) => {
  let auxOtro1 = []
  for (let prop in bodegasDelBarco) {
    let nombreBodega = bodegasDelBarco[prop].nombreBodega
    let catidadBodega = bodegasDelBarco[prop].toneladasCargadasBodega
    let estatusBodegaColor =
      bodegasDelBarco[prop].estatusBodega === 'CARGANDO'
        ? '#01bc51'
        : bodegasDelBarco[prop].estatusBodega === 'PARADO'
        ? '#ffc107'
        : '#ff0000'

    auxOtro1.push({
      label: nombreBodega,
      data: [catidadBodega],
      backgroundColor: estatusBodegaColor
    })
  }
  // let auxDatasets = []
  let auxOtro = []
  for (let prop in bodegasCarga) {
    // auxDatasets = [prop, bodegasCarga[prop]]
    auxOtro.push({
      label: prop,
      data: [bodegasCarga[prop]],
      backgroundColor: '#01bc51'
    })
  }

  const multiAxisData = {
    labels: ['BODEGAS'],
    datasets: auxOtro1
  }
  const alwaysShowTooltip = {
    id: 'alwaysShowTooltip',
    afterDraw(chart, args, options) {
      const { ctx } = chart
      ctx.save()

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition()
          const text =
            chart.data.datasets[i].label +
            ': ' +
            chart.data.datasets[i].data[index]

          const textWidth = ctx.measureText(text).width
          ctx.fillStyle = 'rgba(0,0,0,0.8)'
          ctx.fillRect(x - (textWidth + 10) / 2, y, textWidth + 10, 20)
          // ctx.beginPath()
          // ctx.moveTo(x, y)
          // ctx.lineTo(x - 5, y - 5)
          // ctx.lineTo(x + 5, y - 5)
          // ctx.fill()
          // ctx.restore()

          ctx.font = '12px Arial'
          ctx.fillStyle = 'white'
          ctx.fillText(text, x - textWidth / 2, y + 15)
          ctx.restore()
        })
      })
    }
  }
  const getLightTheme = () => {
    let multiAxisOptions = {
      borderColor: '#151515',
      borderWidth: 3,
      barPercentage: 0.99,
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,

      plugins: {
        tooltip: {
          // mode: 'dataset',
          // intersect: true,
          // caretPadding: 5
          enabled: false
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            color: '#151515',
            position: 'bottom'
          }
        }
      },
      layout: {
        padding: 0
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    }

    return {
      multiAxisOptions
    }
  }

  const { multiAxisOptions } = getLightTheme()

  return (
    <div>
      <div className="card ">
        {tolltip && (
          <div className="grid ">
            <div className="col-6 text-right p-0">
              <h1>{barcos && barcos.nombreBarco}</h1>{' '}
            </div>
            <div className="col-6 text-center ">
              <Tag className="" severity="" style={{ fontSize: '1.5rem' }}>
                Carga en Buque{' '}
                {reporteCargaGOM &&
                  new Intl.NumberFormat().format(reporteCargaGOM)}{' '}
                TM
              </Tag>
            </div>
          </div>
        )}

        <div className="grid ">
          <div
            className="  col-12 d-flex justify-content-center"
            style={{
              height: heightBogega,
              width: '100%'
            }}
          >
            <img
              id="frame"
              src={buqueFigura[barcos.cantidadGruas ? barcos.cantidadGruas : 4]}
              onError={(e) => (e.target.src = { buquegura4 })}
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                overflow: 'hidden',
                bottom: '0px'
              }}
            ></img>
            <Chart
              type="bar"
              data={multiAxisData}
              options={multiAxisOptions}
              plugins={tolltip && [alwaysShowTooltip]}
              style={{
                height: '17%',
                width: '100%',
                position: 'absolute',
                overflow: 'hidden',
                bottom: '30%',
                'margin-left': '-6%',
                'padding-left': '14%'
              }}
            />
          </div>
          {/* <div className="flex text-center ">
            {bodegasDelBarco &&
              bodegasDelBarco.map(
                (bodega) =>
                  bodega.length !== 0 && (
                    <BodegasInfo key={bodega.id} bodega={bodega} />
                  )
              )}
          </div> */}
        </div>
      </div>
    </div>
  )
}
export default BarChartDemo
