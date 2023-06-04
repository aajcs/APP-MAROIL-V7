import DivisionList from '../components/DivisionList'
import DivisionContextProvider from '../contexts/DivisionContext'
import DominioContextProvider from '../contexts/DominioContext'

export const DivisionPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Division CRUD</h5>
          <DominioContextProvider>
            <DivisionContextProvider>
              <DivisionList />
            </DivisionContextProvider>
          </DominioContextProvider>
        </div>
      </div>
    </div>
  )
}
