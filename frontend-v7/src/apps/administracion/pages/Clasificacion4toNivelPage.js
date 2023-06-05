import Clasificacion4toNivelList from '../components/Clasificacion4toNivelList'
import Clasificacion4toNivelContextProvider from '../contexts/Clasificacion4toNivelContext'
import Clasificacion3erNivelContextProvider from '../contexts/Clasificacion3erNivelContext'

export const Clasificacion4toNivelPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Clasificacion4toNivel CRUD</h5>
          <Clasificacion3erNivelContextProvider>
            <Clasificacion4toNivelContextProvider>
              <Clasificacion4toNivelList />
            </Clasificacion4toNivelContextProvider>
          </Clasificacion3erNivelContextProvider>
        </div>
      </div>
    </div>
  )
}
