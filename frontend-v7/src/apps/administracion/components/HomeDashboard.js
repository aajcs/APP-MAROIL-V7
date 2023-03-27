/* eslint-disable react/prop-types */

import HomeDashboardTotalMes from './HomeDashboardTotalMes'

const HomeDashboard = ({ ingresoGastos, centroDeCostoAuxs }) => {
  // console.log(centroDeCostoAuxs)
  return (
    <div className="formgrid grid  ">
      {centroDeCostoAuxs.map(
        (p) =>
          p.estatusCentroDeCosto === 'OPERATIVO' && (
            <div className="field card col-12 lg:col-12 xl:col-8 ">
              <h6>{p.descripcionCentroDeCosto}</h6>
              <HomeDashboardTotalMes
                key={p.id}
                centroDeCosto={p}
                ingresoGastos={ingresoGastos}
              />
            </div>
          )
      )}
    </div>
  )
}

export default HomeDashboard
