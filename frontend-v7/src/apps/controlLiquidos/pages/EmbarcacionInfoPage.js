import EmbarcacionInfo from '../components/EmbarcacionInfo'
import EmbarcacionContextProvider from '../contexts/EmbarcacionContext'
import TanqueAuxContextProvider from '../contexts/TanqueAuxContext'

export const EmbarcacionInfoPage = () => {
  return (
    <div className="grid">
      <TanqueAuxContextProvider>
        <EmbarcacionContextProvider>
          <EmbarcacionInfo />
        </EmbarcacionContextProvider>
      </TanqueAuxContextProvider>
    </div>
  )
}
