import EmbarcacionContextProvider from '../../controlLiquidos/contexts/EmbarcacionContext'
import PresupuestoPMList from '../components/PresupuestoPMList'
import PresupuestoPMContextProvider from '../contexts/PresupuestoPMContext'

export const PresupuestoPMPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>PresupuestoPM CRUD</h5>
          <PresupuestoPMContextProvider>
            <EmbarcacionContextProvider>
              <PresupuestoPMList />
            </EmbarcacionContextProvider>
          </PresupuestoPMContextProvider>
        </div>
      </div>
    </div>
  )
}
