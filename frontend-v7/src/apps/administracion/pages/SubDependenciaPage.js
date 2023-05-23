import SubDependenciaList from '../components/SubDependenciaList'
import SubDependenciaContextProvider from '../contexts/SubDependenciaContext'

export const SubDependenciaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>SubDependencia CRUD</h5>
          <SubDependenciaContextProvider>
            <SubDependenciaList />
          </SubDependenciaContextProvider>
        </div>
      </div>
    </div>
  )
}
