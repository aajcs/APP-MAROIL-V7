import IngresoGastoList from '../components/IngresoGastoList'
import CentroDeCostoAuxContextProvider from '../contexts/CentroDeCostoAuxContext'
import ConceptoAuxContextProvider from '../contexts/ConceptoAuxContext'
import IngresoGastoContextProvider from '../contexts/IngresoGastoContext'
import ProcesoAuxContextProvider from '../contexts/ProcesoAuxContext'
import ProveedorContextProvider from '../contexts/ProveedorContext'

export const IngresoGastoPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>IngresoGasto CRUD</h5>
          <ConceptoAuxContextProvider>
            <CentroDeCostoAuxContextProvider>
              <ProveedorContextProvider>
                <ProcesoAuxContextProvider>
                  <IngresoGastoContextProvider>
                    <IngresoGastoList />
                  </IngresoGastoContextProvider>
                </ProcesoAuxContextProvider>
              </ProveedorContextProvider>
            </CentroDeCostoAuxContextProvider>
          </ConceptoAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
