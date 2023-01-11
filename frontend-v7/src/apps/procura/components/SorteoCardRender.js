/* eslint-disable react/prop-types */
const SorteoCardRender = ({ data }) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const efectoTarjeta = [
    'animate__animated animate__backInDown',
    'animate__animated animate__backInLeft',
    'animate__animated animate__backInRight',
    'animate__animated animate__backInUp',
    'animate__animated animate__bounce',
    'animate__animated animate__flash',
    'animate__animated animate__shakeX',
    'animate__animated animate__swing',
    'animate__animated animate__wobble'
  ]

  return (
    <div
      className=" col-2 lg:col-2 xl:col-2 "
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
      // onClick={onAppsControlClick}
    >
      <div
        className={`cardAPPS card mb-0 ${
          efectoTarjeta[getRandomInt(3)]
        } animate__slower`}
      >
        <div className="flex justify-content-between mb-1">
          <div>
            <span className="block text-500 font-medium mb-1"></span>
            <div className="text-500 font-medium  ">
              <span className="text-900 ">
                <strong>{data.nombreGanador}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SorteoCardRender
