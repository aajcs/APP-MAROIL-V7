import IngresoGastoContextProvider from '../contexts/IngresoGastoContext'
import HomeAdministracion from '../components/HomeAdministracion'
import CajaChicaContextProvider from '../contexts/CajaChicaContext'
import ConceptoAuxContextProvider from '../contexts/ConceptoAuxContext'
import CentroDeCostoAuxContextProvider from '../contexts/CentroDeCostoAuxContext'
import ProveedorContextProvider from '../contexts/ProveedorContext'
import VolumetriaContextProvider from '../../Control/contexts/VolumetriaContext'
export const HomeAdministracionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <VolumetriaContextProvider>
          <IngresoGastoContextProvider>
            <ConceptoAuxContextProvider>
              <CentroDeCostoAuxContextProvider>
                <ProveedorContextProvider>
                  <CajaChicaContextProvider>
                    <HomeAdministracion />
                  </CajaChicaContextProvider>
                </ProveedorContextProvider>
              </CentroDeCostoAuxContextProvider>
            </ConceptoAuxContextProvider>
          </IngresoGastoContextProvider>
        </VolumetriaContextProvider>
      </div>
    </div>
  )
}
