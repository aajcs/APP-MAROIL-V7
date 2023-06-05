import Clasificacion3erNivelList from '../components/Clasificacion3erNivelList'
import Clasificacion3erNivelContextProvider from '../contexts/Clasificacion3erNivelContext'
import ClasificacionServicioContextProvider from '../contexts/ClasificacionServicioContext'

export const Clasificacion3erNivelPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Clasificacion3erNivel CRUD</h5>
          <ClasificacionServicioContextProvider>
            <Clasificacion3erNivelContextProvider>
              <Clasificacion3erNivelList />
            </Clasificacion3erNivelContextProvider>
          </ClasificacionServicioContextProvider>
        </div>
      </div>
    </div>
  )
}
