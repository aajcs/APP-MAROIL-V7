/* eslint-disable no-unused-vars */
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useLoader } from '@react-three/fiber'
import barcomodel3dOBJ from '../assetsControl/Boat.obj'
import barcomodel3dFBX from '../assetsControl/BarcoNo1.FBX'
const BarcoModel3D = () => {
  const geom = useLoader(FBXLoader, barcomodel3dFBX)
  return (
    <mesh scale={[0.003, 0.003, 0.003]}>
      <primitive object={geom} />
    </mesh>
  )
}

export default BarcoModel3D
