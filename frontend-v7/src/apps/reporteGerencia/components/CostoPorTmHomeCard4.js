/* eslint-disable react/prop-types */

const CostoPorTmHomeCard = ({ dataDataCompleta }) => {
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
      className=" col-12 lg:col-12 xl:col-12 "
      // onClick={onAppsControlClick}
    >
      <div className="card  ">
        <span className="text-900 text-center fw-bold fst-italic ">
          {dataDataCompleta.mesNombre.toUpperCase()}
        </span>
      </div>
      <div className={`  mb-0 ${efectoTarjeta[getRandomInt(4)]}`}>
        <div className="grid">
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card  cardAPPS">
              <div
                className="card Pb-0 border-bottom-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
                style={{ 'border-color': '#094db1', padding: 0 }}
              >
                <span className="mr-2  fst-italic ">
                  {'MAROIL TRADING ING'}
                </span>{' '}
              </div>

              <div
                className="card Pb-2 border-top-0 border-end-0 border-2 animate__animated animate__zoomInLeft animate__slower animate__delay-2s"
                style={{ 'border-color': '#094db1' }}
              >
                <div className="flex justify-content-between">
                  <div>
                    <span className="text-500"> {'Gastos => '}</span>
                    <span className="text-900 font-medium text-xl">
                      {formatCurrency(dataDataCompleta.totalGastoMaroil)}
                    </span>
                  </div>
                  <div className="">
                    <span style={{ height: '2.5rem', 'font-size': '0.8rem' }}>
                      Costo TM <br />
                    </span>
                    <span>
                      <strong>{formatCurrency(costoPorMaroilTm)}</strong>
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-500"> {'Toneladas => '}</span>
                  <span className="text-900 font-medium text-xl">
                    {new Intl.NumberFormat().format(
                      dataDataCompleta.totalVolumenTerminalMaroil
                    )}{' '}
                    Tm
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card cardAPPS ">
              <div
                className="card Pb-0 border-bottom-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
                style={{ 'border-color': '#d9a406', padding: 0 }}
              >
                <span className="mr-2  fst-italic ">{'PETRO CEDEÑO'}</span>{' '}
              </div>

              <div
                className="card Pb-2 border-top-0 border-end-0 border-2 animate__animated animate__zoomInLeft animate__slower animate__delay-2s"
                style={{ 'border-color': '#d9a406' }}
              >
                <div className="flex justify-content-between">
                  <div>
                    <span className="text-500"> {'Gastos => '}</span>
                    <span className="text-900 font-medium text-xl">
                      {formatCurrency(dataDataCompleta.totalGastoCedeno)}
                    </span>
                  </div>
                  <div className="">
                    <span style={{ height: '2.5rem', 'font-size': '0.8rem' }}>
                      Costo TM <br />
                    </span>
                    <span>
                      <strong>{formatCurrency(costoPorCedenoTm)}</strong>
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-500"> {'Toneladas => '}</span>
                  <span className="text-900 font-medium text-xl">
                    {new Intl.NumberFormat().format(
                      dataDataCompleta.totalVolumenTerminalCedeno
                    )}{' '}
                    Tm
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card  cardAPPS">
              <div
                className="card Pb-0 border-bottom-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
                style={{ 'border-color': '#157347', padding: 0 }}
              >
                <span className="mr-2  fst-italic ">{'PETRO SAN FÉLIX'}</span>{' '}
              </div>

              <div
                className="card Pb-2 border-top-0 border-end-0 border-2 animate__animated animate__zoomInLeft animate__slower animate__delay-2s"
                style={{ 'border-color': '#157347' }}
              >
                <div className="flex justify-content-between">
                  <div>
                    <span className="text-500"> {'Gastos => '}</span>
                    <span className="text-900 font-medium text-xl">
                      {formatCurrency(dataDataCompleta.totalGastoSanFelix)}
                    </span>
                  </div>
                  <div className="">
                    <span style={{ height: '2.5rem', 'font-size': '0.8rem' }}>
                      Costo TM <br />
                    </span>
                    <span>
                      <strong>{formatCurrency(costoPorSanFelixTm)}</strong>
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-500"> {'Toneladas => '}</span>
                  <span className="text-900 font-medium text-xl">
                    {new Intl.NumberFormat().format(
                      dataDataCompleta.totalVolumenTerminalSanFelix
                    )}{' '}
                    Tm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="col-12 lg:col-6 xl:col-6">
            <div className="card  cardAPPS">
              <div
                className="card Pb-0 border-bottom-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
                style={{ 'border-color': '#157347', padding: 0 }}
              >
                <span className="mr-2  fst-italic ">
                  {'UTILIDAD SIN MENSUALIDAD OPERATIVA'}
                </span>{' '}
              </div>

              <div
                className="card Pb-2 border-top-0 border-end-0 border-2 animate__animated animate__zoomInLeft animate__slower animate__delay-2s"
                style={{ 'border-color': '#157347' }}
              >
                <div>
                  <span className="text-500"> {'Toneladas => '}</span>
                  <span className="text-900 font-medium text-xl">
                    {new Intl.NumberFormat().format(
                      dataDataCompleta.totalVolumenMes
                    )}{' '}
                    Tm
                  </span>
                </div>
                <div className="flex justify-content-between">
                  <div>
                    <span className="text-500"> {'Gastos => '}</span>
                    <span className="text-900 font-medium text-xl">
                      {formatCurrency(dataDataCompleta.totalGastoMes)}
                    </span>
                  </div>
                  <div className="">
                    <span style={{ height: '2.5rem', 'font-size': '0.8rem' }}>
                      Costo TM <br />
                    </span>
                    <span>
                      <strong>{formatCurrency(costoPorTm)}</strong>
                    </span>
                  </div>
                </div>
                <div className="flex justify-content-between">
                  <div>
                    <span className="text-500"> {'Ingreso => '}</span>
                    <span className="text-900 font-medium text-xl">
                      {formatCurrency(servicoOperativa)}
                    </span>
                  </div>
                  <div className="">
                    <span style={{ height: '2.5rem', 'font-size': '0.8rem' }}>
                      Valor TM <br />
                    </span>
                    <span>
                      <strong>
                        {formatCurrency(dataDataCompleta.totalCostoTmMes)}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="card Pb-0 border-top-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
                style={{ 'border-color': '#157347', padding: 0 }}
              >
                <div className="flex justify-content-center">
                  <span className="text-500"> {'Utilidad => '}</span>
                  <span className="text-900 font-medium text-xl">
                    {formatCurrency(utilidadConOperativa)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 lg:col-6 xl:col-6">
            <div className="card cardAPPS ">
              <div
                className="card Pb-0 border-bottom-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
                style={{ 'border-color': '#157347', padding: 0 }}
              >
                <div className="flex justify-content-around">
                  <span className="text-900 font-medium text-xl">
                    {formatCurrency(dataDataCompleta.totalmensualidadOpMes)}
                  </span>
                  <span className="mr-2  fst-italic ">
                    {'UTILIDAD CON MENSUALIDAD OPERATIVA'}
                  </span>{' '}
                </div>
              </div>

              <div
                className="card Pb-2 border-top-0 border-end-0 border-2 animate__animated animate__zoomInLeft animate__slower animate__delay-2s"
                style={{ 'border-color': '#157347' }}
              >
                {' '}
                <div>
                  <span className="text-500"> {'Toneladas => '}</span>
                  <span className="text-900 font-medium text-xl">
                    {new Intl.NumberFormat().format(
                      dataDataCompleta.totalVolumenMes
                    )}{' '}
                    Tm
                  </span>
                </div>
                <div className="flex justify-content-between">
                  <div>
                    <span className="text-500"> {'Gastos => '}</span>
                    <span className="text-900 font-medium text-xl">
                      {formatCurrency(
                        dataDataCompleta.totalGastoMes +
                          dataDataCompleta.totalmensualidadOpMes
                      )}
                    </span>
                  </div>
                  <div className="">
                    <span style={{ height: '2.5rem', 'font-size': '0.8rem' }}>
                      Costo TM <br />
                    </span>
                    <span>
                      <strong>{formatCurrency(costoPorTmMensualidaOp)}</strong>
                    </span>
                  </div>
                </div>
                <div className="flex justify-content-between">
                  <div>
                    <span className="text-500"> {'Ingreso => '}</span>
                    <span className="text-900 font-medium text-xl">
                      {formatCurrency(servicoOperativa)}
                    </span>
                  </div>
                  <div className="">
                    <span style={{ height: '2.5rem', 'font-size': '0.8rem' }}>
                      Valor TM <br />
                    </span>
                    <span>
                      <strong>
                        {formatCurrency(dataDataCompleta.totalCostoTmMes)}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="card Pb-0 border-top-0 border-start-0 border-2  mb-0 text-end animate__animated animate__rotateInDownRight animate__slower"
                style={{ 'border-color': '#157347', padding: 0 }}
              >
                <div className="flex justify-content-center">
                  <span className="text-500"> {'Utilidad => '}</span>
                  <span className="text-900 font-medium text-xl">
                    {formatCurrency(utilidadSinOperativa)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CostoPorTmHomeCard
