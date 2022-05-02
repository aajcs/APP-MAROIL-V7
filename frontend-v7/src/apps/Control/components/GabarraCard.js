/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
const GabarraCard = ({ gabarra, gabarraEstatus, gabarratrenesactual }) => {
  const toast = useRef(null)
  const [remanentegabarra, setremanentegabarra] = useState(
    gabarra.toneladasremanente
  )
  const [visible, setVisible] = useState(false)
  const [displayResponsive, setDisplayResponsive] = useState(false)

  const ESTADOS_GABARRA = {
    Cargando: 'success',
    'Fondeada sin Carga': 'danger',
    'Fondeada con Carga': 'warning',
    Descargando: 'info'
  }

  const estadoTag = ESTADOS_GABARRA[gabarra.estatusGabarra]

  const ESTADOS_GABARRASECUENCIA = {
    Cargando: 'Fondeada con Carga',
    'Fondeada sin Carga': 'Cargando',
    'Fondeada con Carga': 'Descargando',
    Descargando: 'Fondeada sin Carga'
  }

  const estadoBoton = ESTADOS_GABARRASECUENCIA[gabarra.estatusGabarra]

  const accept = () => {
    gabarraEstatus(gabarra.id, estadoBoton)
    // console.log(estadoBoton);
    toast.current.show({
      severity: 'info',
      summary: 'Confirmado',
      detail: 'Cambio de la gabarra realizado',
      life: 3000
    })
  }
  const accept2 = () => {
    gabarraEstatus(gabarra.id, estadoBoton, remanentegabarra)
    // console.log(remanente_gabarra);
    toast.current.show({
      severity: 'info',
      summary: 'Confirmado',
      detail: 'Cambio de la gabarra realizado',
      life: 3000
    })
    setDisplayResponsive(false)
    // gabarraEstatus(gabarra._id, estadoBoton);
  }
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => setDisplayResponsive(false)}
          className="p-button-text"
        />
        <Button
          label="Si"
          icon="pi pi-check"
          onClick={() => accept2()}
          autoFocus
        />
      </div>
    )
  }

  const updateField = (data) => {
    setremanentegabarra(data)
  }
  // console.log(remanente_gabarra);
  const reject = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Cancelar',
      detail: 'decidio cancelar la operacion',
      life: 3000
    })
  }
  return (
    <div className="col-12 lg:col-6 xl:col-3">
      <Toast ref={toast}></Toast>
      <div className="card mt-2 ">
        <div className="card-body p-0">
          <div className="grid ">
            <div className="col-6">
              <h3 className=" card-title ">{gabarra.nombreGabarra}</h3>
            </div>
            <div className="col-6 text-right ">
              <Tag
                className="w-100 p-2"
                severity={estadoTag}
                style={{ fontSize: '12px' }}
              >
                {gabarra.estatusGabarra}
              </Tag>
            </div>
          </div>
          <p className="card-text text-end">{gabarra.descripcion}</p>
          <p className="card-text text-end">
            Capacidad de Toneladas: {gabarra.toneladasCapacidad}
          </p>
          <h4 className="card-text text-end">
            Toneladas Remanente:
            <span className="text-orange-500 font-medium">
              {' '}
              {gabarra.toneladasRemanente}
            </span>
          </h4>
          <h4 className="card-text text-end">
            Toneladas Cargadas:
            <span className="text-green-500 font-medium">
              {' '}
              {gabarra.toneladasActual}
            </span>
          </h4>
          <p className="card-text text-end">
            Total de trenes:{' '}
            <span className="text-blue-500 font-medium">
              {gabarra.trenesCapacidad}
            </span>
          </p>

          <h4 className="card-text text-end">
            Trenes Cargados:{' '}
            <Button
              disabled={gabarra.estatusGabarra !== 'Cargando'}
              type="button"
              icon="pi pi-minus"
              onClick={() =>
                gabarratrenesactual(gabarra.id, gabarra.trenesActual - 1)
              }
              className="p-button-rounded p-button-danger ml-2 "
            ></Button>{' '}
            <span className="text-green-500 font-medium">
              {gabarra.trenesActual}{' '}
            </span>
            <span style={{ minWidth: '5rem' }}></span>
            <Button
              // {gabarra.estatus==='dsfdsfsd' ? 'Cargado' : 'Cargando'}
              disabled={gabarra.estatusGabarra !== 'Cargando'}
              type="button"
              icon="pi pi-plus"
              onClick={() =>
                gabarratrenesactual(gabarra.id, gabarra.trenesActual + 1)
              }
              className="p-button-rounded p-button-success ml-2"
            ></Button>
          </h4>

          <hr />
          <div className="d-flex justify-content-center">
            <ConfirmDialog
              visible={visible}
              onHide={() => setVisible(false)}
              message={`Quiere cambiar de estado la Gabarra: ${gabarra.nombreGabarra}?`}
              header="Confirmacion"
              icon="pi pi-exclamation-triangle"
              accept={accept}
              reject={reject}
            />

            <Button
              label={estadoBoton}
              className="p-button-secondary"
              onClick={() =>
                estadoBoton === 'Cargando'
                  ? setDisplayResponsive(true)
                  : setVisible(true)
              }
            />
            <Dialog
              header="Cambio de Estado"
              visible={displayResponsive}
              onHide={() => setDisplayResponsive(false)}
              breakpoints={{ '960px': '75vw' }}
              style={{ width: '20vw' }}
              footer={renderFooter('displayResponsive')}
            >
              <div className="field col-6 p-col-2 p-md-3">
                <label htmlFor="toneladasRemanente">Toneladas Remanente</label>
                <InputNumber
                  inputId="toneladasRemanente"
                  value={gabarra.toneladasRemanente}
                  onValueChange={(e) => updateField(e.target.value)}
                  showButtons
                  buttonLayout="horizontal"
                  step={1}
                  decrementButtonClassName="p-button-danger"
                  incrementButtonClassName="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  suffix=" TM"
                />
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GabarraCard
