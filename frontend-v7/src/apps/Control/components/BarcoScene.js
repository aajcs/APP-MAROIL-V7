/* eslint-disable react/prop-types */
import { Canvas } from '@react-three/fiber'
const BarcoScene = ({ children }) => {
  return (
    <Canvas>{children}</Canvas>
    // <Canvas camera={{ zoom: 1, position: [10, 20, 15] }}>{children}</Canvas>
  )
}

export default BarcoScene
