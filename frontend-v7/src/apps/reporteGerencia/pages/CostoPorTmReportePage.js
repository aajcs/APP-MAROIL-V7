import CostoTmMesContextProvider from '../../administracion/contexts/CostoTmMesContext'
import IngresoGastoContextProvider from '../../administracion/contexts/IngresoGastoContext'
import MensualidadOpMesContextProvider from '../../administracion/contexts/MensualidadOpMesContext'
import VolumetriaContextProvider from '../../Control/contexts/VolumetriaContext'
import CostoPorTmReporteEstadistica from '../components/CostoPorTmReporteEstadistica'
export const CostoPorTmReportePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <MensualidadOpMesContextProvider>
          <CostoTmMesContextProvider>
            <VolumetriaContextProvider>
              <IngresoGastoContextProvider>
                <CostoPorTmReporteEstadistica />
              </IngresoGastoContextProvider>
            </VolumetriaContextProvider>
          </CostoTmMesContextProvider>
        </MensualidadOpMesContextProvider>
      </div>
    </div>
  )
}
