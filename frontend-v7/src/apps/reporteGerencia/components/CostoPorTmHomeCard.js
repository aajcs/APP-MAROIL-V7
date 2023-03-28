/* eslint-disable react/prop-types */

const CostoPorTmHomeCard = ({ dataDataCompleta, anoVisual }) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const costoPorMaroilTm =
    dataDataCompleta.totalGastoMaroil /
    dataDataCompleta.totalVolumenTerminalMaroil
  const costoPorCedenoTm =
    dataDataCompleta.totalGastoCedeno /
    dataDataCompleta.totalVolumenTerminalCedeno
  const costoPorSanFelixTm =
    dataDataCompleta.totalGastoSanFelix /
    dataDataCompleta.totalVolumenTerminalSanFelix
  const costoPorTm =
    dataDataCompleta.totalGastoMes / dataDataCompleta.totalVolumenMes
  const costoPorTmMensualidaOp =
    (dataDataCompleta.totalGastoMes + dataDataCompleta.totalmensualidadOpMes) /
    dataDataCompleta.totalVolumenMes
  const servicoOperativa =
    dataDataCompleta.totalVolumenMes * dataDataCompleta.totalCostoTmMes
  const servicoOperativaMaroil =
    dataDataCompleta.totalVolumenTerminalMaroil *
    dataDataCompleta.totalCostoTmMes
  const servicoOperativaCedeno =
    dataDataCompleta.totalVolumenTerminalCedeno *
    dataDataCompleta.totalCostoTmMes
  const servicoOperativaSanFelix =
    dataDataCompleta.totalVolumenTerminalSanFelix *
    dataDataCompleta.totalCostoTmMes

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
          className={`cardAPPS card m-2 mt-0 col-12 lg:col-12 xl:col-6 ${
            efectoTarjeta[getRandomInt(4)]
          }`}
        >
          <div className="flex justify-content-between mb-1 p-3">
            <div>
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
          </div> */}{' '}
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
                {'Costo por Tonelada'}
                <span className="text-900 ">
                  <strong>{formatCurrency(costoPorTm)}</strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Mensualidad Operacional: '}
                <span className="text-900 ">
                  <strong>
                    {formatCurrency(dataDataCompleta.totalmensualidadOpMes)}
                  </strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Total Gasto con Mensualida Operativa: '}
                <span className="text-900 ">
                  <strong>
                    {formatCurrency(
                      dataDataCompleta.totalmensualidadOpMes +
                        dataDataCompleta.totalGastoMes
                    )}
                  </strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Costo por Tonelada Con Mensualidad Operativa'}
                <span className="text-900 ">
                  <strong>{formatCurrency(costoPorTmMensualidaOp)}</strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'costo por Tonelada Del Servicio De Operacion: '}
                <span className="text-900 ">
                  <strong>
                    {formatCurrency(dataDataCompleta.totalCostoTmMes)}
                  </strong>
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
        <div
          className={`cardAPPS card m-2 mt-0 col-12 lg:col-12 xl:col-6 ${
            efectoTarjeta[getRandomInt(4)]
          }`}
        >
          <div className="flex justify-content-between mb-1 p-3">
            <div>
              <div className="text-500 font-medium  ">
                {'Gastos Maroil: '}
                <span className="text-900 ">
                  <strong>
                    {formatCurrency(dataDataCompleta.totalGastoMaroil)}
                  </strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
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
                {'servicio operacional: '}
                <span className="text-900 ">
                  <strong>{formatCurrency(servicoOperativaMaroil)}</strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Costo por Toneladas: '}
                <span className="text-900 ">
                  <strong>{formatCurrency(costoPorMaroilTm)}</strong>
                </span>
              </div>
              <hr className="mt-2 mb-2 " />
              <div className="text-500 font-medium  ">
                {'Gastos Cedeño: '}
                <span className="text-900 ">
                  <strong>
                    {formatCurrency(dataDataCompleta.totalGastoCedeno)}
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
              </div>
              <div className="text-500 font-medium  ">
                {'servicio operacional: '}
                <span className="text-900 ">
                  <strong>{formatCurrency(servicoOperativaCedeno)}</strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Costo por Toneladas: '}
                <span className="text-900 ">
                  <strong>{formatCurrency(costoPorCedenoTm)}</strong>
                </span>
              </div>
              <hr className="mt-2 mb-2 " />
              <div className="text-500 font-medium  ">
                {'Gastos San Felix: '}
                <span className="text-900 ">
                  <strong>
                    {formatCurrency(dataDataCompleta.totalGastoSanFelix)}
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
                {'servicio operacional: '}
                <span className="text-900 ">
                  <strong>{formatCurrency(servicoOperativaSanFelix)}</strong>
                </span>
              </div>
              <div className="text-500 font-medium  ">
                {'Costo por Toneladas: '}
                <span className="text-900 ">
                  <strong>{formatCurrency(costoPorSanFelixTm)}</strong>
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

export default CostoPorTmHomeCard
