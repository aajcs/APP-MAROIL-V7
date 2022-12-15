// import { useEffect, useState } from 'react'
import SorteoCard from '../components/SorteoCard'
import GanadorPageContextProvider from '../contexts/GanadorContext'

export const HomeProura = () => {
  return (
    <div className="grid">
      <GanadorPageContextProvider>
        <SorteoCard />
      </GanadorPageContextProvider>
    </div>
  )
}
