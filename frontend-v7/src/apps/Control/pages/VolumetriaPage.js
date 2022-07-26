import VolumetriaContextProvider from '../contexts/VolumetriaContext'
import VolumetriaList from '../components/VolumetriaList'
import BarcoContextProvider from '../contexts/BarcoContext'

export const VolumetriaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Volumetria CRUD</h5>
          <BarcoContextProvider>
            <VolumetriaContextProvider>
              <VolumetriaList />
            </VolumetriaContextProvider>
          </BarcoContextProvider>
        </div>
      </div>
    </div>
  )
}
