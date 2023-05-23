import ClasificacionServicioList from '../components/ClasificacionServicioList'
import ClasificacionServicioContextProvider from '../contexts/ClasificacionServicioContext'

export const ClasificacionServicioPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ClasificacionServicio CRUD</h5>
          <ClasificacionServicioContextProvider>
            <ClasificacionServicioList />
          </ClasificacionServicioContextProvider>
        </div>
      </div>
    </div>
  )
}
