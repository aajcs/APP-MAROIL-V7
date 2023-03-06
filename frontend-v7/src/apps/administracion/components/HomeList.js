/* eslint-disable multiline-ternary */
import { useContext, useRef } from 'react'
import { ProyectoContext } from '../contexts/ProyectoContext'
import { Skeleton } from 'primereact/skeleton'

import HomeProyectoCardRender from './HomeProyectoCardRender'
import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import HomePresupuestoList from './HomePresupuestoList'
import HomeComentarioSubProyectoList from './HomeComentarioSubProyectoList'
import HomeSolicitudFondoList from './HomeSolicitudFondoList'

function HomeList() {
  const { proyectos } = useContext(ProyectoContext)
  const menu2 = useRef(null)
  // console.table(proyectos)
  return (
    <>
      {proyectos.length === 0 ? (
        <div className="field col-12 lg:col-6 xl:col-4 pr-0">
          <div className="card custom-skeleton p-4">
            <div className="flex justify-content-between mt-3 mb-3">
              <div className="mr-2">
                <Skeleton
                  width="13rem"
                  height="3rem"
                  className="mb-2"
                ></Skeleton>
                <Skeleton
                  width="5rem"
                  height="1.5rem"
                  className="mb-2"
                ></Skeleton>
              </div>

              <Skeleton width="40%" height="4.5rem"></Skeleton>
            </div>

            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="75%" height="1.5rem" className="mb-2"></Skeleton>
            <div className="flex justify-content-between mt-3">
              <Skeleton width="45%" height="5rem"></Skeleton>
              <Skeleton width="45%" height="5rem"></Skeleton>
            </div>
          </div>
        </div>
      ) : (
        <>
          {proyectos.map(
            (proyectos) =>
              proyectos.estatusProyecto === 'OPERATIVO' && (
                <HomeProyectoCardRender
                  key={proyectos.id}
                  proyectos={proyectos}
                />
              )
          )}
          <div className="col-12 xl:col-4">
            <div className="card animate__animated animate__backInUp animate__slower">
              <h5>Solicitud de Fondos Por Aprobar</h5>
              <HomeSolicitudFondoList />
            </div>
          </div>
          <div className="col-12 xl:col-5">
            <div className="card animate__animated animate__backInUp animate__slower">
              <h5>Presupuesto Por Aprobar</h5>
              <HomePresupuestoList />
            </div>
          </div>

          <div className="col-12 xl:col-3">
            <div className="card animate__animated animate__backInRight animate__slower ">
              <div className="flex align-items-center justify-content-between ">
                <h5>Notificacion</h5>
                <div>
                  <Button
                    type="button"
                    icon="pi pi-ellipsis-v"
                    className="p-button-rounded p-button-text p-button-plain"
                    onClick={(event) => menu2.current.toggle(event)}
                  />
                  <Menu
                    ref={menu2}
                    popup
                    model={[
                      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
                      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
                    ]}
                  />
                </div>
              </div>
              <HomeComentarioSubProyectoList />
            </div>{' '}
          </div>
        </>
      )}
    </>
  )
}

export default HomeList
