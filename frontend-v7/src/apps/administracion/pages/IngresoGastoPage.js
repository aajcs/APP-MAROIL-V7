import IngresoGastoList from '../components/IngresoGastoList'
import CentroDeCostoAuxContextProvider from '../contexts/CentroDeCostoAuxContext'
import IngresoGastoContextProvider from '../contexts/IngresoGastoContext'
import ProcesoAuxContextProvider from '../contexts/ProcesoAuxContext'
import ProveedorContextProvider from '../contexts/ProveedorContext'

export const IngresoGastoPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>IngresoGasto CRUD</h5>
          <CentroDeCostoAuxContextProvider>
            <ProveedorContextProvider>
              <ProcesoAuxContextProvider>
                <IngresoGastoContextProvider>
                  <IngresoGastoList />
                </IngresoGastoContextProvider>
              </ProcesoAuxContextProvider>
            </ProveedorContextProvider>
          </CentroDeCostoAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
