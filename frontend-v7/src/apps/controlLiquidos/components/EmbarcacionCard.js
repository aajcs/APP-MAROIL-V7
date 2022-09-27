/* eslint-disable indent */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Tag } from 'primereact/tag'
import { Image } from 'primereact/image'
import { ProgressBar } from 'primereact/progressbar'
import { Galleria } from 'primereact/galleria'

import AuthUse from '../../../auth/AuthUse'
import embarcacionJPEG from '../assetsControlLiquidos/ImagenesTodas'
import { PhotoService } from '../services/PhotoService'
import inmaculada5 from '../assetsControlLiquidos/inmaculada5.jpeg'
console.log(inmaculada5)
function EmbarcacionCard({ embarcacions }) {
  const [porcentajeCombustible, setPorcentajeCombustible] = useState(0)
  const [images, setImages] = useState(null)
  const galleriaService = new PhotoService()
  console.log(images)
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
  }, [])
  const itemTemplate = (item) => {
    console.log(item.itemImageSrc)
    return (
      <img
        src={
          'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800'
        }
        onError={(e) =>
          (e.target.src =
            'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
        }
        alt={item.alt}
        style={{ width: '100%', display: 'block' }}
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
              <Tag className="w-100 p-2 text-900">
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
            </span>
          </h6>
          <h6 className="card-text mt-0 mb-2">
            Combustible Capacidad:
            <span className=" font-medium">
              {' '}
              {new Intl.NumberFormat().format(
                embarcacions.combustibleCapacidadEmbarcacion
              )}
            </span>
          </h6>
          <hr className="mt-2 mb-2 " />
          <div className="card">
            <h5>Item Navigators without Thumbnails</h5>
            <Galleria
              value={images}
              responsiveOptions={responsiveOptions}
              numVisible={5}
              circular
              style={{ maxWidth: '640px' }}
              showItemNavigators
              showThumbnails={false}
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
            />
          </div>
          <div className=" grid">
            <div
              className="col-6 text-center "
              // onClick={() => onClick('displayDetalleCarga')}
            >
              <Image
                src={
                  embarcacionJPEG[
                    embarcacions.nombreEmbarcacion === 'NASCA 1' ? 5 : 0
                  ]
                }
                alt="Image"
                width="100%"
                preview
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
