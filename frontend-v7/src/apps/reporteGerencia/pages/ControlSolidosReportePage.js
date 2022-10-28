import VolumetriaEstadistica from '../../Control/components/VolumetriaEstadistica'
import BarcoContextProvider from '../../Control/contexts/BarcoContext'
import VolumetriaContextProvider from '../../Control/contexts/VolumetriaContext'
export const ControlSolidosReportePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <BarcoContextProvider>
          <VolumetriaContextProvider>
            <VolumetriaEstadistica />
          </VolumetriaContextProvider>
        </BarcoContextProvider>
      </div>
    </div>
  )
}
