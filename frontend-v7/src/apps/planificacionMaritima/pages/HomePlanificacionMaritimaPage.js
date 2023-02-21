import HomePlanificacionMaritima from '../components/HomePlanificacionMaritima'
import ActividadContextProvider from '../contexts/ActividadContext'
export const HomePlanificacionMaritimaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <ActividadContextProvider>
          <HomePlanificacionMaritima />
        </ActividadContextProvider>
      </div>
    </div>
  )
}
