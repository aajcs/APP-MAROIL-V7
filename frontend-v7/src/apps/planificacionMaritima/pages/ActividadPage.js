import EmbarcacionContextProvider from '../../controlLiquidos/contexts/EmbarcacionContext'
import ActividadList from '../components/ActividadList'
import ActividadContextProvider from '../contexts/ActividadContext'

export const ActividadPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Actividad CRUD</h5>
          <ActividadContextProvider>
            <EmbarcacionContextProvider>
              <ActividadList />
            </EmbarcacionContextProvider>
          </ActividadContextProvider>
        </div>
      </div>
    </div>
  )
}
