import { OrbitControls, Stars } from '@react-three/drei'
import BarcoScene from '../components/BarcoScene'
// import Sphere from '../components/Sphere'
import BarcoModel3D from '../components/BarcoModel3D'
import { Suspense } from 'react'
export const Barco3DPage = () => {
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card" style={{ height: 'calc(95vh - 9rem)' }}>
          <BarcoScene>
            {/* <Sphere /> */}
            <Suspense fallback={null}>
              <BarcoModel3D />
              <OrbitControls />
              <Stars count={1000} />
            </Suspense>
            <ambientLight intensity={0.32} />
          </BarcoScene>
        </div>
      </div>
    </div>
  )
}
