import UsuarioContextProvider from '../contexts/UsuarioContext'
import UsuarioList from '../components/UsuarioList'
export const UsuariosPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <h5>Usuario CRUD</h5>
          <UsuarioContextProvider>
            <UsuarioList />
          </UsuarioContextProvider>
        </div>
      </div>
    </div>
  )
}
