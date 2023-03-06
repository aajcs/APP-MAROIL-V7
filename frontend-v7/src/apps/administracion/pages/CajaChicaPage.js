import CajaChicaList from '../components/CajaChicaList'
import CentroDeCostoAuxContextProvider from '../contexts/CentroDeCostoAuxContext'
import ConceptoAuxContextProvider from '../contexts/ConceptoAuxContext'
import CajaChicaContextProvider from '../contexts/CajaChicaContext'
import ProveedorContextProvider from '../contexts/ProveedorContext'

export const CajaChicaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <ConceptoAuxContextProvider>
            <CentroDeCostoAuxContextProvider>
              <ProveedorContextProvider>
                <CajaChicaContextProvider>
                  <CajaChicaList />
                </CajaChicaContextProvider>
              </ProveedorContextProvider>
            </CentroDeCostoAuxContextProvider>
          </ConceptoAuxContextProvider>
        </div>
      </div>
    </div>
  )
}
