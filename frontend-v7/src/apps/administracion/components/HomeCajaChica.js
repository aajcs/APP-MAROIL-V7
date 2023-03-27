import HomeCajaChicaPendienteList from './HomeCajaChicaPendienteList'
import HomeCajaChicaVueltoList from './HomeCajaChicaVueltoList'
import HomeDisponibilidadCajaChicaList from './HomeDisponibilidadCajaChicaList'

const HomeCajaChica = () => {
  return (
    <div className="formgrid grid  ">
      <div className="field col-12 lg:col-6 xl:col-7 ">
        <HomeCajaChicaVueltoList />
      </div>

      {/* <div className="field card col-12 lg:col-6 xl:col-2 ">
        <HomeDisponibilidadCajaChicaList />
      </div>
      <div className="field card col-12 lg:col-6 xl:col-3 ">
        <HomeDisponibilidadCajaChicaList />
      </div> */}
      <div className="field card col-12 lg:col-6 xl:col-5 ">
        <HomeDisponibilidadCajaChicaList />
      </div>
      <div className="field col-12 lg:col-6 xl:col-7 ">
        <HomeCajaChicaPendienteList />
      </div>
    </div>
  )
}

export default HomeCajaChica
