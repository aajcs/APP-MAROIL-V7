import OperacionesGOMList from '../components/OperacionesGOMList'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'
import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import VolumetriaContextProvider from '../contexts/VolumetriaContext'
import WhatsappContextProvider from '../contexts/WhatsappContext'

export const OperacionesGOMPAGE = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <WhatsappContextProvider>
            <BarcoContextProvider>
              <CargaBodegaContextProvider>
                <ReporteCargaGOMContextProvider>
                  <ProgramacionVentanaContextProvider>
                    <VolumetriaContextProvider>
                      <OperacionesGOMList />
                    </VolumetriaContextProvider>
                  </ProgramacionVentanaContextProvider>
                </ReporteCargaGOMContextProvider>
              </CargaBodegaContextProvider>
            </BarcoContextProvider>
          </WhatsappContextProvider>
        </div>
      </div>
    </div>
  )
}
