import EmbarcacionInfo from '../components/EmbarcacionInfo'
import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'

export const EmbarcacionInfoPage = () => {
  return (
    <div className="grid">
      <EmbarcacionContextProvider>
        <EmbarcacionInfo />
      </EmbarcacionContextProvider>
    </div>
  )
}
