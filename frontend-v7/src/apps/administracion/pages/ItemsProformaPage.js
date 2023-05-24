import ItemsProformaList from '../components/ItemsProformaList'
import ItemsProformaContextProvider from '../contexts/ItemsProformaContext'

export const ItemsProformaPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ItemsProforma CRUD</h5>
          <ItemsProformaContextProvider>
            <ItemsProformaList />
          </ItemsProformaContextProvider>
        </div>
      </div>
    </div>
  )
}
