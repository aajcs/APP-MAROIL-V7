import CargaInformacionPanel from '../components/CargaInformacionPanel'
import CentroDeCostoAuxContextProvider from '../contexts/CentroDeCostoAuxContext'
import ConceptoAuxContextProvider from '../contexts/ConceptoAuxContext'
import CostoTmMesContextProvider from '../contexts/CostoTmMesContext'
import IngresoGastoContextProvider from '../contexts/IngresoGastoContext'
import MensualidadOpMesContextProvider from '../contexts/MensualidadOpMesContext'
import ProcesoAuxContextProvider from '../contexts/ProcesoAuxContext'
import ProveedorContextProvider from '../contexts/ProveedorContext'

export const CargaInformacionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>IngresoGasto CRUD</h5>
          <MensualidadOpMesContextProvider>
            <CostoTmMesContextProvider>
              <ConceptoAuxContextProvider>
                <CentroDeCostoAuxContextProvider>
                  <ProveedorContextProvider>
                    <ProcesoAuxContextProvider>
                      <IngresoGastoContextProvider>
                        <CargaInformacionPanel />
                      </IngresoGastoContextProvider>
                    </ProcesoAuxContextProvider>
                  </ProveedorContextProvider>
                </CentroDeCostoAuxContextProvider>
              </ConceptoAuxContextProvider>
            </CostoTmMesContextProvider>{' '}
          </MensualidadOpMesContextProvider>
        </div>
      </div>
    </div>
  )
}
