import { Card } from 'primereact/card'
import { Timeline } from 'primereact/timeline'
import ReactPlayer from 'react-player'

const ModeladoOperacionList = () => {
  const agenciasMaritimas = [
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      icon: 'pi pi-arrow-down-right',
      color: '#9C27B0',
      descrioption: 'probando que funciona lo q voy a poer aqui',
      nombre: 'Modelado de las Operaciones de Buque',
      direccion: '',
      telefono: '+58 (414) 313.03.74',
      personaContacto: 'gerenciaocamaroriente@ocamar.com.ve',
      webSite: require('../assetsControl/modeladoOperacionBuque.mp4'),
      image: ''
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-arrow-down-left',
      color: '#673AB7',
      nombre: 'Modelado de las Operaciones de Petro San Félix',
      direccion: '',
      telefono: '+58 (269) 246.69.70',
      personaContacto: 'info@navasca.com.ve',
      webSite: require('../assetsControl/Petro_San_Felix.mp4'),
      image: ''
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      icon: 'pi pi-arrow-down-right',
      color: '#FF9800',
      nombre: 'Modelado de las Operaciones de Petro Cedeño',
      direccion: '',
      telefono: '+58 (281) 282.02.58',
      personaContacto: 'ventas@desarrollos1405.com',
      webSite: require('../assetsControl/Petro_Cedeno.mp4'),
      image: ''
    }
  ]
  const customizedMarker = (item) => {
    return (
      <span
        className="custom-marker p-shadow-2"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    )
  }
  const customizedContent = (item) => {
    return (
      <Card
        className="cardAgenciaMaritima animate__animated animate__flipInX animate__slower"
        title={item.nombre}
        subTitle={item.direccion}
      >
        <div className="">
          <ReactPlayer
            url={item.webSite}
            width="100%"
            height="calc(50vh - 15rem)"
            controls
            playing
            muted
            loop
            className=""
          />
        </div>
      </Card>
    )
  }
  return (
    <>
      <Timeline
        value={agenciasMaritimas}
        align="alternate"
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}
      />
    </>
  )
}

export default ModeladoOperacionList
