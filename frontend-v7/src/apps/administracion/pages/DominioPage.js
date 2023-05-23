import DominioList from '../components/DominioList'
import DominioContextProvider from '../contexts/DominioContext'

export const DominioPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>Dominio CRUD</h5>
          <DominioContextProvider>
            <DominioList />
          </DominioContextProvider>
        </div>
      </div>
    </div>
  )
}
