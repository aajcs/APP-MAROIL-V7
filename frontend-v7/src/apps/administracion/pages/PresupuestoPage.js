import PresupuestoList from '../components/PresupuestoList'
import PresupuestoContextProvider from '../contexts/PresupuestoContext'

export const PresupuestoPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Presupuesto CRUD</h5>
          <PresupuestoContextProvider>
            <PresupuestoList />
          </PresupuestoContextProvider>
        </div>
      </div>
    </div>
  )
}
