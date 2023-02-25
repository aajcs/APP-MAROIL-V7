/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import VolumetriaForm from './VolumetriaForm'
import { InputText } from 'primereact/inputtext'
import moment from 'moment'

import VolumetriaEstadistica from './VolumetriaEstadistica'

const VolumetriaList = () => {
  const { volumetrias, findVolumetria, deleteVolumetria, loading } =
    useContext(VolumetriaContext)

  const [volumetria, setVolumetria] = useState(volumetrias)
  const [deleteVolumetriaDialog, setDeleteVolumetriaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveVolumetria = (id) => {
    findVolumetria(id)
    setIsVisible(true)
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
          />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    )
  }
  const exportCSV = () => {
    dt.current.exportCSV()
  }

  const eliminarVolumetria = () => {
    deleteVolumetria(volumetria.id)
    setDeleteVolumetriaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Reporte Carga GOM Eliminado',
      life: 3000
    })
  }
  const deleteVolumetriaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteVolumetriaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarVolumetria()}
      />
    </>
  )
  const confirmDeleteVolumetria = (volumetrias) => {
    setVolumetria(volumetrias)
    setDeleteVolumetriaDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveVolumetria(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteVolumetria(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Volumetria</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  )
  const clearSelected = () => {
    setDeleteVolumetriaDialog(false)
  }

  const fechaBlFinalVolumetriaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaBlFinalVolumetria).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaBlFinalVolumetria)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  // const volumetriaCreadoTemplate = (rowData) => {
  //   const validarFecha = moment(rowData.volumetriaCreado).isValid()
  //   if (!validarFecha) return
  //   const fecha = moment(rowData.volumetriaCreado)
  //   return fecha.format('dddDD/MM/YY HH:mm')
  // }
  // const volumetriaModificadoTemplate = (rowData) => {
  //   const validarFecha = moment(rowData.volumetriaModificado).isValid()
  //   if (!validarFecha) return
  //   const fecha = moment(rowData.volumetriaModificado)
  //   return fecha.format('dddDD/MM/YY HH:mm')
  // }

  const blFinalVolumetriaBodyTemplate = (rowData) => {
    const numeroTonelada = new Intl.NumberFormat('de-DE').format(
      rowData.blFinalVolumetria
    )
    return numeroTonelada + ' TM'
  }

  // const totalVolumetria = volumetrias
  //   .map((volumetria) => volumetria.blFinalVolumetria)
  //   .reduce((a, b) => a + b, 0)

  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <div className="card">
        <h1>aqui va la grafica </h1>
        <VolumetriaEstadistica />
      </div>
      <div className="card">
        <DataTable
          ref={dt}
          value={volumetrias}
          responsiveLayout="scroll"
          dataKey="id"
          header={header}
          globalFilter={globalFilter}
          sortField="estatusBarco"
          sortOrder={-1}
          loading={loading}
        >
          <Column body={actionBodyTemplate}></Column>
          <Column field="barcoID.nombreBarco" header="Buque" sortable />
          <Column field="barcoID.buqueCliente" header="buqueCliente" sortable />
          <Column field="terminalAuxId" header="terminalAuxId" sortable />
          <Column
            field="blFinalVolumetria"
            header="blFinalVolumetria"
            sortable
            body={blFinalVolumetriaBodyTemplate}
          />
          <Column
            field="estatusVolumetria"
            header="estatusVolumetria"
            sortable
          />
          <Column
            field="fechaBlFinalVolumetria"
            header="fechaBlFinalVolumetria"
            sortable
            body={fechaBlFinalVolumetriaTemplate}
            dataType="date"
          />
          {/* <Column
            field="volumetriaCreado"
            header="volumetriaCreado"
            body={volumetriaCreadoTemplate}
            dataType="date"
          />
          <Column
            field="volumetriaModificado"
            header="volumetriaModificado"
            dataType="date"
            body={volumetriaModificadoTemplate}
          /> */}
        </DataTable>
      </div>

      <VolumetriaForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <Dialog
        visible={deleteVolumetriaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteVolumetriaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {volumetria && (
            <span>
              Esta seguro que quiere eliminar la volumetria Selecionado ?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default VolumetriaList
