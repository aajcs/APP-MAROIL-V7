import ReporteCargaBuqueContextProvider from '../contexts/ReporteCargaBuqueContext'
import ReporteCargaBuqueList from '../components/ReporteCargaBuqueList'
import BuqueContextProvider from '../contexts/BuqueContext'

export const ReporteCargaBuquePage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12 ">
        <div className="card">
          <h5>ReporteCargaBuque CRUD</h5>
          <BuqueContextProvider>
            <ReporteCargaBuqueContextProvider>
              <ReporteCargaBuqueList />
            </ReporteCargaBuqueContextProvider>
          </BuqueContextProvider>
        </div>
      </div>
    </div>
  )
}
