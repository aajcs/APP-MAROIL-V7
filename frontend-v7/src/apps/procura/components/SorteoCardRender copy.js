/* eslint-disable react/prop-types */
const SorteoCardRender = (SorteoCardRender) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const efectoTarjeta = [
    'animate__animated animate__backInDown',
    'animate__animated animate__backInLeft',
    'animate__animated animate__backInRight',
    'animate__animated animate__backInUp',
    'animate__animated animate__backOutDown',
    'animate__animated animate__backInDown',
    'animate__animated animate__backOutLeft',
    'animate__animated animate__backOutRight',
    'animate__animated animate__backOutUp'
  ]

  return (
    <div
      className=" col-12 lg:col-6 xl:col-2 "
      // onClick={onAppsControlClick}
    >
      <div
        className={`cardAPPS card mb-0 ${
          efectoTarjeta[getRandomInt(7)]
        } animate__slower`}
      >
        <div className="flex justify-content-between mb-1">
          <div>
            <span className="block text-500 font-medium mb-1"></span>
            <div className="text-500 font-medium  ">
              <span className="text-900 ">
                <strong>BETANCOURT PAREJO, FRANKLIN JOSE</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SorteoCardRender
