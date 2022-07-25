import ActivoList from '../components/ActivoList'
import ActivoContextProvider from '../contexts/ActivoContext'

export const ActivoPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Activo CRUD</h5>
          <ActivoContextProvider>
            <ActivoList />
          </ActivoContextProvider>
        </div>
      </div>
    </div>
  )
}
