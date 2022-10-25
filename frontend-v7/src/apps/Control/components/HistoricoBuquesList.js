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
const HistoricoBuquesList = () => {
  const { barcos, findBarco, deleteBarco, loading } = useContext(BarcoContext)
  const { cargaBodegas } = useContext(CargaBodegaContext)
  const [layout, setLayout] = useState('grid')
  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)
  const [sortField, setSortField] = useState(null)
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
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ]
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
    console.log(data)

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
                {moment(data.fechaFinalCarga)
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
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">
              {new Intl.NumberFormat().format(data.blFinalBuque)} tm
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
        <div className="col-6" style={{ textAlign: 'left' }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={onSortChange}
          />
        </div>
        <div className="col-6" style={{ textAlign: 'right' }}>
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
      <div className="card">
        <DataView
          value={barcos}
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
