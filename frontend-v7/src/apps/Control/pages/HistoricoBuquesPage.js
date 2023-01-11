import BarcoContextProvider from '../contexts/BarcoContext'
import HistoricoBuquesList from '../components/HistoricoBuquesList'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import VolumetriaContextProvider from '../contexts/VolumetriaContext'
import IngresoGastoContextProvider from '../../administracion/contexts/IngresoGastoContext'
import CostoTmMesContextProvider from '../../administracion/contexts/CostoTmMesContext'
import MensualidadOpMesContextProvider from '../../administracion/contexts/MensualidadOpMesContext'

export const HistoricoBuquesPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <BarcoContextProvider>
            <CargaBodegaContextProvider>
              <VolumetriaContextProvider>
                <IngresoGastoContextProvider>
                  <CostoTmMesContextProvider>
                    <MensualidadOpMesContextProvider>
                      <HistoricoBuquesList />
                    </MensualidadOpMesContextProvider>
                  </CostoTmMesContextProvider>
                </IngresoGastoContextProvider>
              </VolumetriaContextProvider>
            </CargaBodegaContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
