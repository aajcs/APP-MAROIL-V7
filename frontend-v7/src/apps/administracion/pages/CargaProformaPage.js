import CargaProformaList from '../components/CargaProformaList'

import ActividadAsociadaContextProvider from '../contexts/ActividadAsociadaContext'
import ClasificacionServicioContextProvider from '../contexts/ClasificacionServicioContext'
import DependenciaContextProvider from '../contexts/DependenciaContext'
import DivisionContextProvider from '../contexts/DivisionContext'
import DominioContextProvider from '../contexts/DominioContext'
import ItemsProformaContextProvider from '../contexts/ItemsProformaContext'
import ProformaContextProvider from '../contexts/ProformaContext'
import ProveedorContextProvider from '../contexts/ProveedorContext'
import SubDependenciaContextProvider from '../contexts/SubDependenciaContext'

export const CargaProformaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>CargaProforma CRUD</h5>
          <DominioContextProvider>
            <DivisionContextProvider>
              <DependenciaContextProvider>
                <SubDependenciaContextProvider>
                  <ProveedorContextProvider>
                    <ActividadAsociadaContextProvider>
                      <ClasificacionServicioContextProvider>
                        <ProformaContextProvider>
                          <ItemsProformaContextProvider>
                            <CargaProformaList />
                          </ItemsProformaContextProvider>
                        </ProformaContextProvider>
                      </ClasificacionServicioContextProvider>
                    </ActividadAsociadaContextProvider>
                  </ProveedorContextProvider>
                </SubDependenciaContextProvider>
              </DependenciaContextProvider>
            </DivisionContextProvider>
          </DominioContextProvider>
        </div>
      </div>
    </div>
  )
}
