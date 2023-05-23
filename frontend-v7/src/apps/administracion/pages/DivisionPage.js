import DivisionList from '../components/DivisionList'
import DivisionContextProvider from '../contexts/DivisionContext'

export const DivisionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Division CRUD</h5>
          <DivisionContextProvider>
            <DivisionList />
          </DivisionContextProvider>
        </div>
      </div>
    </div>
  )
}
