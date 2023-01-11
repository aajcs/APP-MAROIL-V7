/* eslint-disable react/prop-types */
const HistoricoEstadisticaCardRender = ({ data }) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const efectoTarjeta = [
    'animate__animated animate__rotateInUpRight animate__slower',
    'animate__animated animate__rubberBand animate__slower',
    'animate__animated animate__jackInTheBox animate__slower',
    'animate__animated animate__zoomInDown animate__slower',
    'animate__animated animate__rotateIn animate__slower'
  ]

  return (
    <div
      className=" col-12 lg:col-12 xl:col-12 "
      // onClick={onAppsControlClick}
    >
      <div className={`cardAPPS card mb-0 ${efectoTarjeta[getRandomInt(4)]}`}>
        <div className="flex justify-content-between mb-1">
          <div>
            <span className="block text-500 font-medium mb-1">
              {data.mesNombre.toUpperCase()}
            </span>

            <div className="text-500 font-medium  ">
              <span className="text-blue-500 "> {'Toneladas Totales: '}</span>
              <span className="text-900 ">
                <strong>
                  {new Intl.NumberFormat().format(data.totalGastoMes)} Tm
                </strong>
              </span>
            </div>
          </div>
          <div
            className="flex align-items-center justify-content-center bg-blue-100 border-round"
            style={{ width: '2.5rem', height: '2.5rem' }}
          >
            <i className="pi pi-chart-bar text-blue-500 text-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoricoEstadisticaCardRender
