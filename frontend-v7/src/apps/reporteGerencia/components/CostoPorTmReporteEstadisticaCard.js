/* eslint-disable react/prop-types */

const CostoPorTmReporteEstadisticaCard = ({ dataDataCompleta }) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }
  const costoPorTm =
    dataDataCompleta.totalGastoMes / dataDataCompleta.totalVolumenMes
  const costoPorTmMensualidaOp =
    (dataDataCompleta.totalGastoMes + dataDataCompleta.totalmensualidadOpMes) /
    dataDataCompleta.totalVolumenMes
  const servicoOperativa =
    dataDataCompleta.totalVolumenMes * dataDataCompleta.totalCostoTmMes

  const utilidadConOperativa =
    dataDataCompleta.totalVolumenMes * dataDataCompleta.totalCostoTmMes -
    dataDataCompleta.totalGastoMes
  const utilidadSinOperativa =
    dataDataCompleta.totalVolumenMes * dataDataCompleta.totalCostoTmMes -
    (dataDataCompleta.totalGastoMes + dataDataCompleta.totalmensualidadOpMes)
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
    <div
      className=" col-12 lg:col-6 xl:col-6 "
      // onClick={onAppsControlClick}
    >
      <div className={`cardAPPS card mb-0 ${efectoTarjeta[getRandomInt(4)]}`}>
        <div className="flex justify-content-between mb-1">
          <div>
            <span className="block text-500 font-medium mb-1">
              {dataDataCompleta.mesNombre.toUpperCase()}
            </span>
            {/* <div className="text-500 font-medium  ">
              {'Gastos Maroil: '}
              <span className="text-900 ">
                <strong>
                  {formatCurrency(dataDataCompleta.totalGastoMaroil)}
                </strong>
              </span>
            </div>
            <div className="text-500 font-medium  ">
              {'Gastos Cedeño: '}
              <span className="text-900 ">
                <strong>
                  {formatCurrency(dataDataCompleta.totalGastoCedeno)}
                </strong>
              </span>
            </div>
            <div className="text-500 font-medium  ">
              {'Gastos San Felix: '}
              <span className="text-900 ">
                <strong>
                  {formatCurrency(dataDataCompleta.totalGastoSanFelix)}
                </strong>
              </span>
            </div> */}
            <div className="text-500 font-medium  ">
              {'Gastos Totales: '}
              <span className="text-900 ">
                <strong>
                  {formatCurrency(dataDataCompleta.totalGastoMes)}
                </strong>
              </span>
            </div>
            {/* <div className="text-500 font-medium  ">
              {'Toneladas Terminal Maroil: '}
              <span className="text-900 ">
                <strong>
                  {new Intl.NumberFormat().format(
                    dataDataCompleta.totalVolumenTerminalMaroil
                  )}{' '}
                  Tm
                </strong>
              </span>
            </div>
            <div className="text-500 font-medium  ">
              {'Toneladas San Felix: '}
              <span className="text-900 ">
                <strong>
                  {new Intl.NumberFormat().format(
                    dataDataCompleta.totalVolumenTerminalSanFelix
                  )}{' '}
                  Tm
                </strong>
              </span>
            </div>
            <div className="text-500 font-medium  ">
              {'Toneladas Cedeno: '}
              <span className="text-900 ">
                <strong>
                  {new Intl.NumberFormat().format(
                    dataDataCompleta.totalVolumenTerminalCedeno
                  )}{' '}
                  Tm
                </strong>
              </span>
            </div> */}
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
              {'Valor Tonelada Mensual: '}
              <span className="text-900 ">
                <strong>
                  {formatCurrency(dataDataCompleta.totalCostoTmMes)}
                </strong>
              </span>
            </div>
            <div className="text-500 font-medium  ">
              {'Gastos Mensualidad Operacional: '}
              <span className="text-900 ">
                <strong>
                  {formatCurrency(dataDataCompleta.totalmensualidadOpMes)}
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
              {'Costo por Tonelada Con Mensualidad Operacional'}
              <span className="text-900 ">
                <strong>{formatCurrency(costoPorTmMensualidaOp)}</strong>
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
            <div className="text-500 font-medium  ">
              {'Utilidad con mensualidad operativa'}
              <span className="text-900 ">
                <strong>{formatCurrency(utilidadSinOperativa)}</strong>
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
  )
}

export default CostoPorTmReporteEstadisticaCard
