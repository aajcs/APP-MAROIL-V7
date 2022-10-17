/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable react/prop-types */

import React from 'react'
import { Chart } from 'primereact/chart'

import embarcacionJPEG from '../assetsControlLiquidos/ImagenesTodas'
import { Tag } from 'primereact/tag'

function TanqueAuxCard({
  tanqueAuxEmbarcacion,
  tolltip,
  embarcacions,
  heightTanque
}) {
  const sumallGasolina =
    tanqueAuxEmbarcacion &&
    tanqueAuxEmbarcacion
      .map(
        (item) =>
          item.tipoCargaTanqueAux === 'GASOLINA' && item.volumenActualTanqueAux
      )
      .reduce((prev, curr) => prev + curr, 0)

  const sumallDiesel =
    tanqueAuxEmbarcacion &&
    tanqueAuxEmbarcacion
      .map(
        (item) =>
          item.tipoCargaTanqueAux === 'DIESEL' && item.volumenActualTanqueAux
      )
      .reduce((prev, curr) => prev + curr, 0)

  let auxBabor = []
  let auxEstribor = []
  for (let prop in tanqueAuxEmbarcacion) {
    if (tanqueAuxEmbarcacion[prop].ubicacionTanqueAux === 'BABOR') {
      let nombreTanque = tanqueAuxEmbarcacion[prop].descripcionTanqueAux
      let catidadTanque = tanqueAuxEmbarcacion[prop].volumenActualTanqueAux
      let estatusTanqueColor =
        tanqueAuxEmbarcacion[prop].tipoCargaTanqueAux === 'GASOLINA'
          ? '#01bc51'
          : tanqueAuxEmbarcacion[prop].tipoCargaTanqueAux === 'DIESEL'
          ? '#ffc107'
          : '#ff0000'
      auxBabor.push({
        label: nombreTanque,
        data: [catidadTanque],
        backgroundColor: estatusTanqueColor
      })
    } else {
      let nombreTanque = tanqueAuxEmbarcacion[prop].descripcionTanqueAux
      let catidadTanque = tanqueAuxEmbarcacion[prop].volumenActualTanqueAux
      let estatusTanqueColor =
        tanqueAuxEmbarcacion[prop].tipoCargaTanqueAux === 'GASOLINA'
          ? '#01bc51'
          : tanqueAuxEmbarcacion[prop].tipoCargaTanqueAux === 'DIESEL'
          ? '#ffc107'
          : '#ff0000'
      auxEstribor.push({
        label: nombreTanque,
        data: [catidadTanque],
        backgroundColor: estatusTanqueColor
      })
    }
  }
  const multiAxisDataBabor = {
    labels: ['BODEGAS'],
    datasets: auxBabor
  }
  const multiAxisDataEstribor = {
    labels: ['BODEGAS'],
    datasets: auxEstribor
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
            chart.data.datasets[i].data[index] +
            '-Bbls'

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
  return (
    <div className="col-12 lg:col-12 xl:col-12">
      <div className="">
        <div className={'card mt-2 mb-0 pb-0 '}>
          {tolltip && (
            <div className="grid ">
              <div className="col-6 text-right p-0">
                <h1>{embarcacions && embarcacions.nombreEmbarcacion}</h1>{' '}
              </div>
              <div className="col-6 text-center ">
                <Tag className="" severity="" style={{ fontSize: '1.5rem' }}>
                  Carga Total en Embarcion{' '}
                  {embarcacions &&
                    new Intl.NumberFormat().format(
                      sumallGasolina + sumallDiesel
                    )}{' '}
                  Bbls
                </Tag>
              </div>
            </div>
          )}
          <div
            className="card-body p-0 "
            style={{
              height: heightTanque,
              width: '100%'
            }}
          >
            <img
              id="frame"
              src={
                embarcacionJPEG[
                  embarcacions.nombreEmbarcacion === 'NASCA I' ? 17 : 16
                ]
              }
              onError={(e) => (e.target.src = { embarcacionJPEG })}
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
              data={multiAxisDataEstribor}
              options={multiAxisOptions}
              plugins={tolltip && [alwaysShowTooltip]}
              style={{
                height: '17%',
                width: '100%',
                position: 'absolute',
                overflow: 'hidden',
                bottom: '30%',
                'margin-left': '-7%',
                'padding-left': '14%'
              }}
            />
            <Chart
              type="bar"
              data={multiAxisDataBabor}
              options={multiAxisOptions}
              plugins={tolltip && [alwaysShowTooltip]}
              style={{
                height: '17%',
                width: '100%',
                position: 'absolute',
                overflow: 'hidden',
                bottom: '48%',
                'margin-left': '-7%',
                'padding-left': '14%'
              }}
            />
          </div>{' '}
          <h6 className="m-0">
            <Tag
              className=" p-2 text-gray-700"
              style={{ fontSize: '12px', background: '#01bc51' }}
            >
              <p className=" mb-0">
                Gasolina{' '}
                <span className="">
                  <strong>
                    {new Intl.NumberFormat().format(sumallGasolina)}
                  </strong>
                </span>
                -Bbls
              </p>
            </Tag>
          </h6>
          <h6 className="m-0 mt-1">
            <Tag
              className=" p-2 text-gray-700"
              style={{ fontSize: '12px', background: '#ffc107' }}
            >
              <p className=" mb-0">
                Diesel{' '}
                <span className="">
                  <strong>
                    {new Intl.NumberFormat().format(sumallDiesel)}
                  </strong>
                </span>{' '}
                -Bbls
              </p>
            </Tag>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default TanqueAuxCard
