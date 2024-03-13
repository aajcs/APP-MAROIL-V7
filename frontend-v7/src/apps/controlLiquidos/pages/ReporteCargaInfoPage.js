import ReporteCargaGOMInfo from '../components/ReporteCargaGOMInfo'
import BuqueContextProvider from '../contexts/BuqueContext'
import ReporteCargaBuqueContextProvider from '../contexts/ReporteCargaBuqueContext'

export const ReporteCargaInfoPage = () => {
  return (
    <div className="grid">
      <BuqueContextProvider>
        <ReporteCargaBuqueContextProvider>
          <ReporteCargaGOMInfo />
        </ReporteCargaBuqueContextProvider>
      </BuqueContextProvider>
    </div>
  )
}
