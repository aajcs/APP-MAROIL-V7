import VolumetriaContextProvider from '../contexts/VolumetriaContext'
import BarcoContextProvider from '../contexts/BarcoContext'
import VolumetriaEstadistica from '../components/VolumetriaEstadistica'

export const VolumetriaEstadisticaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <BarcoContextProvider>
            <VolumetriaContextProvider>
              <VolumetriaEstadistica />
            </VolumetriaContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
