import DependenciaList from '../components/DependenciaList'
import DependenciaContextProvider from '../contexts/DependenciaContext'
import DivisionContextProvider from '../contexts/DivisionContext'

export const DependenciaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Dependencia CRUD</h5>
          <DivisionContextProvider>
            <DependenciaContextProvider>
              <DependenciaList />
            </DependenciaContextProvider>
          </DivisionContextProvider>
        </div>
      </div>
    </div>
  )
}
