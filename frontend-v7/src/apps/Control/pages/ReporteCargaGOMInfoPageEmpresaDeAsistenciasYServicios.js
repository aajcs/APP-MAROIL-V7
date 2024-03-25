import ReporteCargaGOMContextProvider from '../contexts/ReporteCargaGOMContext'
import BarcoContextProvider from '../contexts/BarcoContext'
import CargaBodegaContextProvider from '../contexts/CargaBodegaContext'
import ReporteCargaGOMInfoEmpresaDeAsistenciasYServicios from '../components/ReporteCargaGOMInfoEmpresaDeAsistenciasYServicios'
import ProgramacionVentanaContextProvider from '../contexts/ProgramacionVentanaContext'

export const ReporteCargaGOMInfoPageEmpresaDeAsistenciasYServicios = () => {
  return (
    <div className="grid">
      <BarcoContextProvider>
        <CargaBodegaContextProvider>
          <ProgramacionVentanaContextProvider>
            <ReporteCargaGOMContextProvider>
              <ReporteCargaGOMInfoEmpresaDeAsistenciasYServicios />
            </ReporteCargaGOMContextProvider>
          </ProgramacionVentanaContextProvider>
        </CargaBodegaContextProvider>
      </BarcoContextProvider>
    </div>
  )
}
