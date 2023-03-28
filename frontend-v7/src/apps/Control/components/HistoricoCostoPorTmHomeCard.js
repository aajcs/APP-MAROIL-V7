/* eslint-disable react/prop-types */

const HistoricoCostoPorTmHomeCard = ({ dataDataCompleta }) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const costoPorTm =
    dataDataCompleta.totalGastoMes / dataDataCompleta.totalVolumenMes

  const servicoOperativa =
    dataDataCompleta.totalVolumenMes * dataDataCompleta.totalCostoTmMes

  const utilidadConOperativa =
    dataDataCompleta.totalVolumenMes * dataDataCompleta.totalCostoTmMes -
    dataDataCompleta.totalGastoMes

  const efectoTarjeta = [
    'animate__animated animate__rotateInUpRight animate__slower',
    'animate__animated animate__rubberBand animate__slower',
    'animate__animated animate__jackInTheBox animate__slower',
    'animate__animated animate__zoomInDown animate__slower',
    'animate__animated animate__rotateIn animate__slower'
  ]
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  return (
    <>
      <div
        className="card Pb-0 border-bottom-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
        style={{ 'border-color': '#094db1', padding: 0 }}
      >
        <span className="text-900 text-center fw-bold fst-italic ">
          {dataDataCompleta.mesNombre.toUpperCase()}
        </span>
      </div>
      <div
        className="flex justify-content-between mb-1 col-12 lg:col-12 xl:col-12 "
        // onClick={onAppsControlClick}
      >
        {' '}
        <div
          className={`cardAPPS card m-2 mt-0 col-12 lg:col-12 xl:col-12 ${
            efectoTarjeta[getRandomInt(4)]
          }`}
        >
          <div className="flex justify-content-between mb-1 p-3">
            <div>
              <div className="text-500 font-medium  ">
                {'Gastos Totales: '}
                <span className="text-900 ">
                  <strong>
                    {formatCurrency(dataDataCompleta.totalGastoMes)}
                  </strong>
                </span>
              </div>{' '}
              <div className="text-500 font-medium  ">
                {'Toneladas Totales: '}
                <span className="text-900 ">
                  <strong>
                    {new Intl.NumberFormat().format(
                      dataDataCompleta.totalVolumenMes
                    )}{' '}
                    Tm
                  </strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Costo por Tonelada'}
                <span className="text-900 ">
                  <strong>{formatCurrency(costoPorTm)}</strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Servicio de operacion'}
                <span className="text-900 ">
                  <strong>{formatCurrency(servicoOperativa)}</strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Utilidad sin mensualidad operativa'}
                <span className="text-900 ">
                  <strong>{formatCurrency(utilidadConOperativa)}</strong>
                </span>
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-blue-100 border-round"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className="pi pi-chart-bar text-blue-500 " />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoricoCostoPorTmHomeCard
