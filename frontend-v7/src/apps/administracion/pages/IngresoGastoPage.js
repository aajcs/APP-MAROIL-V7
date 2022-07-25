import IngresoGastoList from '../components/IngresoGastoList'
import IngresoGastoContextProvider from '../contexts/IngresoGastoContext'

export const IngresoGastoPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>IngresoGasto CRUD</h5>
          <IngresoGastoContextProvider>
            <IngresoGastoList />
          </IngresoGastoContextProvider>
        </div>
      </div>
    </div>
  )
}
