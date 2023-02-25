import { useHistory } from 'react-router-dom'
import AuthUse from '../auth/AuthUse'

export default function Apps() {
  const auth = AuthUse()
  const appsPermiso = auth.user.faidUser.apps

  const validarAccesoApp = (apps) => {
    const accesoApps = appsPermiso.find((p) => p === apps || p === 'SUPERAPPS')
    return accesoApps
  }
  const history = useHistory()
  const onAppsControlClick = () => {
    history.push('/apps/control')
  }
  const onAppsControlLiquidosClick = () => {
    validarAccesoApp('CONTROLAPPS') && history.push('/apps/controlLiquidos')
  }
  const onAppsAdministracionClick = () => {
    validarAccesoApp('AMINISTRACIONAPPS') &&
      history.push('/apps/administracion')
  }
  const onAppsReporteGerenciaPagesClick = () => {
    validarAccesoApp('REPORTEGERENCIAAPPS') &&
      history.push('/apps/reportegerencia')
  }
  const onAppsProcuraClick = () => {
    history.push('/apps/procura')
  }
  const onAppsAITClick = () => {
    history.push('/apps/ait')
  }
  const onAppsPlanificacionMaritimaClick = () => {
    history.push('/apps/planificacionMaritima')
  }
  const onAppsAlmacenClick = () => {
    history.push('/apps/almacen')
  }
  return (
    // <div className="layout-main-container">
    //   <div className="layout-main" style={{ height: '50vh' }}>
    // <div className="container d-flex justify-content-center align-items-center h-100">
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="grid col-8 ">
        <div
          className=" col-12 lg:col-6 xl:col-3  animate__animated animate__bounceInLeft animate__slower"
          onClick={onAppsControlClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">CONTROL</span>
                <div className="text-900 font-medium text-xl ">
                  Control de Carga de Solidos
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-chart-bar text-blue-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">----- </span>
          </div>
        </div>
        <div
          className=" col-12 lg:col-6 xl:col-3  animate__animated animate__bounceInLeft animate__slower"
          onClick={onAppsControlLiquidosClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">CONTROL</span>
                <div className="text-900 font-medium text-xl ">
                  Control de Carga de Liquidos
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-blue-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-chart-bar text-blue-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">----- </span>
          </div>
        </div>
        <div
          className="col-12 lg:col-6 xl:col-3 animate__animated animate__bounceInDown animate__slower"
          onClick={onAppsAdministracionClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3 mr-2">
                  ADMINISTRACIÓN
                </span>
                <div className="text-900 font-medium text-xl">
                  Egresos e Ingresos
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-orange-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-credit-card text-orange-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">------ </span>
          </div>
        </div>
        <div
          className="col-12 lg:col-6 xl:col-3 animate__animated animate__bounceInUp animate__slower"
          onClick={onAppsReporteGerenciaPagesClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  REPORTES
                </span>
                <div className="text-900 font-medium text-xl">
                  Gerencia Reportes
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-ticket text-cyan-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">------ </span>
          </div>
        </div>
        <div
          className="col-12 lg:col-6 xl:col-3 animate__animated animate__bounceInUp animate__slower"
          onClick={onAppsProcuraClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">SORTEO</span>
                <div className="text-900 font-medium text-xl">Maroil 2022</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-ticket text-cyan-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">------ </span>
          </div>
        </div>
        <div
          className="col-12 lg:col-6 xl:col-3 animate__animated animate__bounceInRight animate__slower"
          onClick={onAppsAITClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">AIT</span>
                <div className="text-900 font-medium text-xl">
                  Soporte y Control
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-sitemap text-purple-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">------ </span>
          </div>
        </div>
        <div
          className="col-12 lg:col-6 xl:col-3 animate__animated animate__bounceInRight animate__slower"
          onClick={onAppsPlanificacionMaritimaClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">
                  Planificacion
                </span>
                <div className="text-900 font-medium text-xl">
                  Seguimiento de actividades maritimas
                </div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-sitemap text-purple-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">------ </span>
          </div>
        </div>
        <div
          className="col-12 lg:col-6 xl:col-3 animate__animated animate__bounceInRight animate__slower"
          onClick={onAppsAlmacenClick}
        >
          <div className="cardAPPS card mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Almacen</span>
                <div className="text-900 font-medium text-xl">Almacen</div>
              </div>
              <div
                className="flex align-items-center justify-content-center bg-purple-100 border-round"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <i className="pi pi-sitemap text-purple-500 text-xl" />
              </div>
            </div>
            <span className="text-green-500 font-medium">------ </span>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  )
}
