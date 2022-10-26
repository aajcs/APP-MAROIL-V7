import OperacionesGOMList from '../components/OperacionesGOMList'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'
import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import VolumetriaContextProvider from '../contexts/VolumetriaContext'

export const OperacionesGOMPAGE = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
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
        </div>
      </div>
    </div>
  )
}
