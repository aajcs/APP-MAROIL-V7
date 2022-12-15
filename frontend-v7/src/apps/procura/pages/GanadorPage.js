import GanadorPageList from '../components/GanadorList'
import GanadorPageContextProvider from '../contexts/GanadorContext'

export const GanadorPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>GanadorPage CRUD</h5>
          <GanadorPageContextProvider>
            <GanadorPageList />
          </GanadorPageContextProvider>
        </div>
      </div>
    </div>
  )
}
