/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
import { Image } from 'primereact/image'
import { ProgressBar } from 'primereact/progressbar'
import { Galleria } from 'primereact/galleria'
import AuthUse from '../../../auth/AuthUse'
import { PhotoService } from '../services/PhotoService'
import { TanqueAuxContext } from '../contexts/TanqueAuxContext'
import TanqueAuxCard from './TanqueAuxCard'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

const embarcacionImagen = require.context('../assetsControlLiquidos', true)

function EmbarcacionCard({ embarcacions }) {
  const { tanqueAuxs } = useContext(TanqueAuxContext)
  const [tanqueAuxEmbarcacion, setTanqueAuxEmbarcacion] = useState(null)
  const [displayDetalleCarga, setDisplayDetalleCarga] = useState(false)

  const [porcentajeCombustible, setPorcentajeCombustible] = useState(0)
  const [images, setImages] = useState(null)
  const galleriaService = new PhotoService()
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ]
  const auth = AuthUse()
  const agentaCard = () => {
    if (!images) return
    images.map((tech) => {
      if (tech === embarcacions.nombreEmbarcacion) {
        return 'GraphQL'
      } else {
        return tech
      }
    })
  }
  const nuevaImagen =
    images === null
      ? []
      : images.filter((tech) =>
          tech.itemImageSrc.includes(
            embarcacions.nombreEmbarcacion.toLowerCase().substr(0, 4)
          )
        )
  // const fecha4 = fecha2.diff(fecha1, 'days')
  useEffect(() => {
    const handlesumar = () => {
      if (embarcacions.combustibleActualEmbarcacion) {
        const porcentaje =
          (100 * embarcacions.combustibleActualEmbarcacion) /
          embarcacions.combustibleCapacidadEmbarcacion
        setPorcentajeCombustible(porcentaje.toFixed(2))
      }
    }

    handlesumar()
  }, [])
  useEffect(() => {
    galleriaService.getImages().then((data) => setImages(data))
    agentaCard()
  }, [])
  useEffect(() => {
    const findBodegaBarco = (id) => {
      const bodegaBarco = tanqueAuxs.filter((p) => p.embarcacion.id === id)

      setTanqueAuxEmbarcacion(bodegaBarco)
    }
    findBodegaBarco(embarcacions.id)
  }, [tanqueAuxs])
  const itemTemplate = (item) => {
    return (
      // <img
      //   src={embarcacionImagen(`./${item.itemImageSrc}`)}
      //   onError={(e) =>
      //     (e.target.src =
      //       'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
      //   }
      //   alt={item.alt}
      //   style={{ width: '100%', display: 'block' }}
      // />
      <Image
        src={embarcacionImagen(`./${item.itemImageSrc}`)}
        onError={(e) =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
        }
        alt={item.alt}
        width="100%"
        preview
      />
    )
  }

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        onError={(e) =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
        }
        alt={item.alt}
        style={{ display: 'block' }}
      />
    )
  }
  const dialogFuncMap = {
    displayDetalleCarga: setDisplayDetalleCarga
  }
  const onClick = (name) => {
    dialogFuncMap[`${name}`](true)
  }
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false)
  }
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    )
  }

  return (
    <div className="col-12 lg:col-6 xl:col-6">
      <div className="card mt-2 mb-0 pb-0 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title mb-0">
                {embarcacions.nombreEmbarcacion}
              </h3>{' '}
              <h6 className="text-400 card-title mt-0">
                {embarcacions.descripcionEmbarcacion}
              </h6>
            </div>
            <div className="col-6 text-right ">
              <Tag
                className="w-100 p-2 text-900"
                style={{
                  'box-shadow':
                    embarcacions.estatusEmbarcacion === 'OPERATIVO'
                      ? '0px 6px 20px rgb(0 222 99 / 30%)'
                      : embarcacions.estatusEmbarcacion === 'INICIADO'
                      ? '0px 6px 20px rgb(0 109 222 / 30%)'
                      : '0px 6px 20px rgb(222 0 92 / 30%)',
                  fontSize: '12px',
                  background:
                    embarcacions.estatusEmbarcacion === 'OPERATIVO'
                      ? '#157347'
                      : embarcacions.estatusEmbarcacion === 'INICIADO'
                      ? '#094db1'
                      : '#97101d'
                }}
              >
                <p className=" mb-0">{embarcacions.estatusEmbarcacion}</p>
              </Tag>
              {auth.isLogged() && auth.user.faidUser.roles[0] !== 'LECTURA' && (
                <span className="text-sm text-400">
                  Act.
                  {moment(embarcacions.updatedAt).isValid() &&
                    moment(embarcacions.updatedAt).format('DD/MM HH:mm')}{' '}
                </span>
              )}
            </div>
          </div>
          <h6 className="card-text mt-0 mb-2">
            Ubicacion:
            <span className=" font-medium">
              {' '}
              {embarcacions.ubicacionEmbarcacion}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Combustible Actual:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                embarcacions.combustibleActualEmbarcacion
              )}
              {embarcacions.nombreEmbarcacion === 'NASCA I' ? ' TM' : ' Gls'}
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Combustible Capacidad:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                embarcacions.combustibleCapacidadEmbarcacion
              )}
              {embarcacions.nombreEmbarcacion === 'NASCA I' ? ' TM' : ' Gls'}
            </span>
          </h6>
          <hr className="mt-2 mb-2 " />

          <div onClick={() => onClick('displayDetalleCarga')}>
            <TanqueAuxCard
              tanqueAuxEmbarcacion={tanqueAuxEmbarcacion}
              embarcacions={embarcacions}
              heightTanque="300px"
            />
          </div>
          <Dialog
            header="Detalle de carga en bodegas"
            visible={displayDetalleCarga}
            onHide={() => onHide('displayDetalleCarga')}
            breakpoints={{ '960px': '75vw' }}
            style={{ width: '75vw' }}
            footer={renderFooter('displayDetalleCarga')}
          >
            <TanqueAuxCard
              heightTanque="500px"
              tanqueAuxEmbarcacion={tanqueAuxEmbarcacion}
              embarcacions={embarcacions}
              tolltip={true}
            />
          </Dialog>
          <hr className="mt-2 mb-2 " />
          <div className=" grid">
            <div
              className="col-6 text-center "
              // onClick={() => onClick('displayDetalleCarga')}
            >
              <Galleria
                value={nuevaImagen && nuevaImagen}
                responsiveOptions={responsiveOptions}
                numVisible={5}
                circular
                style={{ maxWidth: '640px' }}
                showItemNavigators
                showThumbnails={false}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
                autoPlay
                transitionInterval={6000}
              />
              {/* <BarChartDemo
                heightBogega="50px"
                bodegasDelBarco={bodegasDelBarco}
                barcos={barcos}
              /> */}
            </div>
            <div className="col-6 text-right ">
              <h6 className="text-center">Porcentaje de Combustible</h6>
              <ProgressBar
                className="mt-2 mb-3 "
                color={porcentajeCombustible > 10 ? '#198754' : '#ff0000'}
                value={porcentajeCombustible}
              ></ProgressBar>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbarcacionCard
