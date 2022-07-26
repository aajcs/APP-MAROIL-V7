/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { VolumetriaContext } from '../contexts/VolumetriaContext'
import { BarcoContext } from '../contexts/BarcoContext'
import VolumetriaForm from './VolumetriaForm'
import { InputText } from 'primereact/inputtext'
import moment from 'moment'
import { BarcoService } from '../services/BarcoService'
import AuthUse from '../../../auth/AuthUse'

const VolumetriaList = () => {
  const barcoService = new BarcoService()
  const auth = AuthUse()
  const token = auth.user.token
  const { volumetrias, findVolumetria, deleteVolumetria, loading } =
    useContext(VolumetriaContext)
  const { barcos } = useContext(BarcoContext)
  const [barcostodos, setBarcostodos] = useState(barcos)

  const [volumetria, setVolumetria] = useState(volumetrias)
  const [deleteVolumetriaDialog, setDeleteVolumetriaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [expandedRows, setExpandedRows] = useState([])
  const [expandedRows2, setExpandedRows2] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveVolumetria = (id) => {
    findVolumetria(id)
    setIsVisible(true)
  }
  const onRowGroupExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.barcoID.nombreBarco,
      life: 3000
    })
  }

  useEffect(() => {
    barcoService.readAll(token).then((data) => {
      setBarcostodos(data)
    })
  }, [volumetrias])

  const onRowGroupCollapse = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Grupo de filas contraído',
      detail: 'Bueque: ' + event.data.barcoID.nombreBarco,
      life: 3000
    })
  }
  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span className="image-text">{data.barcoID.nombreBarco}</span>
      </React.Fragment>
    )
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
  const volumetriaCreadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.volumetriaCreado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.volumetriaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const volumetriaModificadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.volumetriaModificado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.volumetriaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinalCargaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaFinalCarga).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaFinalCarga)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const onRowExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.nombreBarco,
      life: 3000
    })
  }

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Product Collapsed',
      detail: event.data.name,
      life: 3000
    })
  }
  const expandAll = () => {
    let _expandedRows = {}
    barcos.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows2(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows2(null)
  }
  const header2 = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <Button
        icon="pi pi-plus"
        label="Expand All"
        onClick={expandAll}
        className="mr-2"
      />
      <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
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

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <h5>Volumetria por terminal del buque {data.nombreBarco}</h5>
        <DataTable
          value={data.volumetria}
          responsiveLayout="scroll"
          sortField="data.volumetriaCreado"
          sortOrder={1}
        >
          <Column body={actionBodyTemplate}></Column>
          <Column field="terminalAuxId" header="terminalAuxId" />
          <Column field="centroDeCostoAuxId" header="centroDeCostoAuxId" />

          <Column field="blFinalVolumetria" header="blFinalVolumetria" />

          <Column
            field="fechaBlFinalVolumetria"
            header="fechaBlFinalVolumetria"
            body={fechaBlFinalVolumetriaTemplate}
            dataType="date"
            sortable
          />
          <Column
            field="volumetriaCreado"
            header="reporte CargaGOM Creado"
            body={volumetriaCreadoTemplate}
            dataType="date"
            sortable
          />
          <Column
            field="volumetriaModificado"
            body={volumetriaModificadoTemplate}
            header="reporte CargaGOM Modificado"
            dataType="date"
          />
        </DataTable>
      </div>
    )
  }
  const estatusTemplate = (rowData) => {
    return (
      <span className={`text-gray-900 ml-3 status-${rowData.estatusBarco}`}>
        {rowData.estatusBarco}
      </span>
    )
  }
  console.log(barcostodos)
  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <div className="card">
        <DataTable
          value={barcostodos}
          expandedRows={expandedRows2}
          onRowToggle={(e) => setExpandedRows2(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          header={header2}
          globalFilter={globalFilter}
          sortField="estatusBarco"
          sortOrder={-1}
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="nombreBarco" header="Buque" sortable />
          <Column field="buqueCliente" header="buqueCliente" sortable />

          <Column
            field="toneladasCapacidad"
            header="toneladas Nominadas"
            sortable
          />
          <Column
            field="toneladasNominadas"
            header="toneladas Solicitadas"
            sortable
          />
          <Column field="blFinalBuque" header="toneladas Finales" sortable />
          <Column
            field="fechaFinalCarga"
            header="fechaFinalCarga"
            sortable
            body={fechaFinalCargaTemplate}
          />
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
