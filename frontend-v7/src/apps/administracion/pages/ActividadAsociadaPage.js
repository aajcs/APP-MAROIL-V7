import ActividadAsociadaList from '../components/ActividadAsociadaList'
import ActividadAsociadaContextProvider from '../contexts/ActividadAsociadaContext'

export const ActividadAsociadaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ActividadAsociada CRUD</h5>
          <ActividadAsociadaContextProvider>
            <ActividadAsociadaList />
          </ActividadAsociadaContextProvider>
        </div>
      </div>
    </div>
  )
}
