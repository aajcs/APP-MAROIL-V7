import ItemsProformaList from '../components/ItemsProformaList'
import ItemsProformaContextProvider from '../contexts/ItemsProformaContext'
import ProformaContextProvider from '../contexts/ProformaContext'

export const ItemsProformaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ItemsProforma CRUD</h5>
          <ItemsProformaContextProvider>
            <ProformaContextProvider>
              <ItemsProformaList />
            </ProformaContextProvider>
          </ItemsProformaContextProvider>
        </div>
      </div>
    </div>
  )
}
