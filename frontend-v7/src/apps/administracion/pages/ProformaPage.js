import ProformaList from '../components/ProformaList'
import DivisionContextProvider from '../contexts/DivisionContext'
import DominioContextProvider from '../contexts/DominioContext'
import ProformaContextProvider from '../contexts/ProformaContext'

export const ProformaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Proforma CRUD</h5>
          <DominioContextProvider>
            <DivisionContextProvider>
              <ProformaContextProvider>
                <ProformaList />
              </ProformaContextProvider>
            </DivisionContextProvider>{' '}
          </DominioContextProvider>
        </div>
      </div>
    </div>
  )
}
