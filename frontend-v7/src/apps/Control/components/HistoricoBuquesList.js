/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { BarcoContext } from '../contexts/BarcoContext'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Dropdown } from 'primereact/dropdown'
import moment from 'moment'
import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
import BarChartDemo from './BarChart'
import flagplaceholder from '../assetsControl/flagplaceholder.png'
import { Tag } from 'primereact/tag'
import { Calendar } from 'primereact/calendar'
import VolumetriaEstadisticaCardRender from './VolumetriaEstadisticaCardRender'
import VolumetriaEstadisticaCard from './VolumetriaEstadisticaCard'
import HistoricoBuqueGastosTM from './HistoricoBuqueGastosTM'
import AuthUse from '../../../auth/AuthUse'
const HistoricoBuquesList = () => {
  const auth = AuthUse()
  const { barcos, findBarco, deleteBarco, loading } = useContext(BarcoContext)
  console.log(barcos)
  const [barcoPdvsaDemoratotal, setBarcoPdvsaDemoratotal] = useState(0)
  const [barcoMaroilDemoratotal, setBarcoMaroilDemoratotal] = useState(0)

  const demorasTotales = () => {
    let barcoPdvsa = barcos.filter((p) => p.buqueCliente === 'PDVSA')
    let barcoMaroil = barcos.filter((p) => p.buqueCliente === 'MAROIL')
    console.log(barcoPdvsa)
    console.log(barcoMaroil)
    let sumaBarcosMaroil = 0
    barcoMaroil.map((p) => (sumaBarcosMaroil += p.tiempoDemora * p.costoDemora))
    console.log(sumaBarcosMaroil)
    let sumaBarcosPdvsa = 0
    barcoPdvsa.map((p) => (sumaBarcosPdvsa += p.tiempoDemora * p.costoDemora))
    console.log(sumaBarcosPdvsa)
    setBarcoPdvsaDemoratotal(sumaBarcosPdvsa)
    setBarcoMaroilDemoratotal(sumaBarcosMaroil)
    //   .reduce((a, b) => a + b, 0)
    // const totalVolumetriaMaroil = volumetriaMaroilMes
    //   .map((blFinal) => blFinal.blFinalVolumetria)
    //   .reduce((a, b) => a + b, 0)
    // const totalVolumetriaSanFelix = volumetriaSanFelixMes
    //   .map((blFinal) => blFinal.blFinalVolumetria)
    //   .reduce((a, b) => a + b, 0)
    // const totalVolumetriaCedeno = volumetriaCedenoMes
    //   .map((blFinal) => blFinal.blFinalVolumetria)
    //   .reduce((a, b) => a + b, 0)
  }
  const { cargaBodegas } = useContext(CargaBodegaContext)
  const [layout, setLayout] = useState('grid')
  const [buquesHistorico, setBuquesHistorico] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState(-1)
  const [sortField, setSortField] = useState('barcoCreado')
  const [date9, setDate9] = useState(moment())
  const [bodegasDelBarco, setBodegasDelBarco] = useState(null)
  function secondsToString(diff) {
    const numdays = Math.floor(diff / 86400)
    const numhours = Math.floor((diff % 86400) / 3600)
    const numminutes = Math.floor(((diff % 86400) % 3600) / 60)
    // const numseconds = ((diff % 86400) % 3600) % 60

    return numdays + ' dias ' + numhours + ' horas ' + numminutes + ' minutos '
  }
  // useEffect(() => {
  //   const findBodegaBarco = (id) => {
  //     const bodegaBarco = cargaBodegas.filter((p) => p.barcoID.id === id)

  //     setBodegasDelBarco(bodegaBarco)
  //   }
  //   findBodegaBarco(barcos.id)
  // }, [cargaBodegas])
  const sortOptions = [
    { label: 'Price High to Low', value: '!barcoCreado' },
    { label: 'Price Low to High', value: 'barcoCreado' }
  ]
  useEffect(() => {
    const barcosMes = barcos.filter((p) =>
      moment(p.fechaFinalCarga).isSame(moment(), 'month')
    )
    setBuquesHistorico(barcosMes)
    demorasTotales()
  }, [barcos])
  const filtroMes = (event) => {
    const barcosMes = barcos.filter((p) =>
      moment(p.fechaFinalCarga).isSame(event, 'month')
    )
    setBuquesHistorico(barcosMes)
  }
  const onSortChange = (event) => {
    const value = event.value

    if (value.indexOf('!') === 0) {
      setSortOrder(-1)
      setSortField(value.substring(1, value.length))
      setSortKey(value)
    } else {
      setSortOrder(1)
      setSortField(value)
      setSortKey(value)
    }
  }
  const renderListItem = (data) => {
    const bodegaBarco = cargaBodegas.filter((p) => p.barcoID.id === data.id)
    const fecha1 = moment(data.fechaInicioCarga)
    const fecha2 = moment(
      data.fechaFinalCarga ? data.fechaFinalCarga : moment()
    )

    const diff = fecha2.diff(fecha1, 'seconds') // Diff in days
    return (
      <div className="col-12 animate__animated  animate__rotateInUpLeft animate__slower">
        <div className="product-list-item">
          {' '}
          {/* <div
            className="col-3 text-center "
            // onClick={() => onClick('displayDetalleCarga')}
          >
            <BarChartDemo
              heightBogega="50px"
              bodegasDelBarco={bodegaBarco}
              barcos={data.id}
            />
          </div> */}
          <div className="product-list-detail">
            <div className="product-name">
              {data.nombreBarco}
              <img
                alt={'option.name'}
                src={flagplaceholder}
                onError={(e) =>
                  (e.target.src =
                    'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                }
                className={`ml-3 flag flag-${data.buquePaisDestino.toLowerCase()}`}
              />
            </div>
            <div className="product-description">
              <span className="text-sm text-400">
                Act.{' '}
                {moment(data.updatedAt).isValid() &&
                  moment(data.updatedAt).format('DD/MM HH:mm')}
              </span>
            </div>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">
              {' '}
              {moment(data.fechaFinalCarga)
                .format('MMMM DD YYYY')
                .toUpperCase()}
            </span>
          </div>
          <div className="product-list-action">
            <span className="product-price">
              {new Intl.NumberFormat().format(data.blFinalBuque)} Tm
            </span>
            <Tag
              className=" p-2 text-900"
              style={{
                fontSize: '12px',
                background:
                  data.buqueCliente === 'MAROIL' ? '#094db1' : '#a31220'
              }}
            >
              <p className=" mb-0">{data.buqueCliente}</p>
            </Tag>
            <span className={'product-badge status-'}>
              {secondsToString(diff)}
            </span>
          </div>
          <div className="product-list-detail">
            <BarChartDemo
              heightBogega="50px"
              bodegasDelBarco={bodegaBarco}
              barcos={data.id}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderGridItem = (data) => {
    const fecha1 = moment(data.fechaInicioCarga)
    const fecha2 = moment(
      data.fechaFinalCarga ? data.fechaFinalCarga : moment()
    )

    const diff = fecha2.diff(fecha1, 'seconds') // Diff in days

    const bodegaBarco = cargaBodegas.filter((p) => p.barcoID.id === data.id)

    return (
      <div className="col-12 md:col-4">
        <div className="product-grid-item card animate__animated  animate__bounceInUp animate__slower">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-history product-category-icon"></i>
              <span className="product-category">
                {moment(data.fechaInicioCarga)
                  .format('MMMM DD YYYY')
                  .toUpperCase()}
              </span>
            </div>
            <span
              className={`product-badge status-${'data.inventoryStatus.toLowerCase()'}`}
            >
              {secondsToString(diff)}
            </span>
          </div>
          <div className="product-grid-item-content">
            <div
              className="col-12 text-center "
              // onClick={() => onClick('displayDetalleCarga')}
            >
              {/* <Image src={barcoJPEG} alt="Image" width="100" preview /> */}
              <BarChartDemo
                heightBogega="50px"
                bodegasDelBarco={bodegaBarco}
                barcos={data.id}
              />
            </div>

            <div className="product-name">
              {data.nombreBarco}
              <img
                alt={'option.name'}
                src={flagplaceholder}
                onError={(e) =>
                  (e.target.src =
                    'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                }
                className={`ml-3 flag flag-${
                  data.buquePaisDestino && data.buquePaisDestino.toLowerCase()
                }`}
              />
            </div>
            <div className="product-description">
              <span className="text-sm text-400">
                Act.{' '}
                {moment(data.updatedAt).isValid() &&
                  moment(data.updatedAt).format('DD/MM HH:mm')}
              </span>
            </div>
            <div className="product-description">
              <span className="text-sm text-400">
                Tiempo Demora. {data.tiempoDemora}
                {' Hrs'}
              </span>

              <span className="text-sm text-400">
                {' //'} Costo Demora.{' '}
                {new Intl.NumberFormat().format(data.costoDemora)}
                {' $'}
              </span>
            </div>
            <div className="product-description">
              {' '}
              <span className="text-sm text-400">
                Total Demora.{' '}
                {new Intl.NumberFormat().format(
                  data.tiempoDemora * data.costoDemora
                )}{' '}
                {' $'}
              </span>
            </div>
          </div>
          <div className="product-grid-item-bottom">
            <div>
              <span className="product-price">
                {new Intl.NumberFormat().format(data.blFinalBuque)} tm
              </span>
              <br />
              <span className="product-price text-sm">
                {new Intl.NumberFormat().format(data.blFinalBuque * 12.5)} $
                Costo Operación
              </span>
            </div>

            <Tag
              className=" p-2 text-900"
              style={{
                fontSize: '12px',
                background:
                  data.buqueCliente === 'MAROIL' ? '#094db1' : '#a31220'
              }}
            >
              <p className=" mb-0">{data.buqueCliente}</p>
            </Tag>
          </div>
        </div>
      </div>
    )
  }

  const itemTemplate = (product, layout) => {
    if (!product) {
      return
    }

    if (layout === 'list') return renderListItem(product)
    else if (layout === 'grid') return renderGridItem(product)
  }
  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="field col-12 md:col-4">
          {/* <label htmlFor="monthpicker">Month Picker</label> */}
          <Calendar
            id="monthpicker"
            value={date9}
            onChange={(e) => {
              setDate9(e.value)
              filtroMes(e.target.value)
            }}
            view="month"
            dateFormat="mm/yy"
            inline
          />
        </div>{' '}
        <div className="field col-12 md:col-7">
          {(auth.user.faidUser.roles[0] === 'ADMIN' ||
            auth.user.faidUser.user === 'QUILLONLAM' ||
            auth.user.faidUser.roles[0] === 'SUPERADMIN') && (
            <HistoricoBuqueGastosTM date9={date9} />
          )}{' '}
        </div>
        <div className="col-1" style={{ textAlign: 'right' }}>
          <DataViewLayoutOptions
            layout={layout}
            onChange={(e) => setLayout(e.value)}
          />
        </div>
      </div>
    )
  }

  const header = renderHeader()
  return (
    <div className="dataview-demo">
      {/* <div className="col-12 font-medium" style={{ textAlign: 'left' }}>
        <h4>
          {'Total Demoras PDVSA =>'}
          {new Intl.NumberFormat().format(
            barcoPdvsaDemoratotal.toFixed(2)
          )}{' '}
          {'$'}
        </h4>
        <h4>
          {'Total Demoras Maroil =>'}
          {new Intl.NumberFormat().format(
            barcoMaroilDemoratotal.toFixed(2)
          )}{' '}
          {'$'}
          {}
        </h4>
      </div> */}
      <div className="card">
        <DataView
          value={buquesHistorico}
          layout={layout}
          header={header}
          itemTemplate={itemTemplate}
          paginator
          rows={9}
          sortOrder={sortOrder}
          sortField={sortField}
        />
      </div>
    </div>
  )
}

export default HistoricoBuquesList
