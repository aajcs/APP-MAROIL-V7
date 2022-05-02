/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */

const BodegasInfo = ({ bodega }) => {
  return (
    <div className="card">
      <span className=" font-medium">{bodega.nombreBodega}</span>
      <span className=" font-medium">
        Capacidad Bodega: {bodega.toneladasCapacidadBodega}
      </span>
      <span className=" font-medium">
        toneladas Cargadas: {bodega.toneladasCargadasBodega}
      </span>
    </div>
  )
}
export default BodegasInfo
