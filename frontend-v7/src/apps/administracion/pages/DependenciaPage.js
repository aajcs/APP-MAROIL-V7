import DependenciaList from '../components/DependenciaList'
import DependenciaContextProvider from '../contexts/DependenciaContext'

export const DependenciaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Dependencia CRUD</h5>
          <DependenciaContextProvider>
            <DependenciaList />
          </DependenciaContextProvider>
        </div>
      </div>
    </div>
  )
}
