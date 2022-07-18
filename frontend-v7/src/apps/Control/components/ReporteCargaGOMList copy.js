/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { ReporteCargaGOMContext } from '../contexts/ReporteCargaGOMContext'
import { BarcoContext } from '../contexts/BarcoContext'
import ReporteCargaGOMForm from './ReporteCargaGOMForm'
import { InputText } from 'primereact/inputtext'
import moment from 'moment'

const ReporteCargaGOMList = () => {
  const {
    reporteCargaGOMs,
    findReporteCargaGOM,
    deleteReporteCargaGOM,
    loading
  } = useContext(ReporteCargaGOMContext)
  const { barcos } = useContext(BarcoContext)
  const [reporteCargaGOM, setReporteCargaGOM] = useState(reporteCargaGOMs)
  const [deleteReporteCargaGOMDialog, setDeleteReporteCargaGOMDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [expandedRows, setExpandedRows] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveReporteCargaGOM = (id) => {
    findReporteCargaGOM(id)
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

  const eliminarReporteCargaGOM = () => {
    deleteReporteCargaGOM(reporteCargaGOM.id)
    setDeleteReporteCargaGOMDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Reporte Carga GOM Eliminado',
      life: 3000
    })
  }
  const deleteReporteCargaGOMDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteReporteCargaGOMDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarReporteCargaGOM()}
      />
    </>
  )
  const confirmDeleteReporteCargaGOM = (reporteCargaGOMs) => {
    setReporteCargaGOM(reporteCargaGOMs)
    setDeleteReporteCargaGOMDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveReporteCargaGOM(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteReporteCargaGOM(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">ReporteCargaGOM</h5>
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
    setDeleteReporteCargaGOMDialog(false)
  }

  const reporteCargaGOMCreadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.reporteCargaGOMCreado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.reporteCargaGOMCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const reporteCargaGOMModificadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.reporteCargaGOMModificado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.reporteCargaGOMModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <DataTable
        ref={dt}
        value={reporteCargaGOMs}
        rowGroupMode="subheader"
        groupRowsBy="barcoID.nombreBarco"
        sortMode="single"
        sortField="barcoID.nombreBarco"
        sortOrder={1}
        responsiveLayout="scroll"
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowGroupExpand}
        onRowCollapse={onRowGroupCollapse}
        rowGroupHeaderTemplate={headerTemplate}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        // paginator
        // rows={10}
        // rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ReporteCargaGOMs"
        globalFilter={globalFilter}
        emptyMessage="No hay reporteCargaGOMs."
        header={header}
        loading={loading}
      >
        <Column field="ubicacionBuque" header="ubicacionBuque" />
        <Column field="puestoTerminal" header="puestoTerminal" />

        <Column field="toneladasCargadasGOM" header="toneladas Cargadas GOM" />
        <Column field="tasaDeCargaGOM" header="tasaDeCargaGOM" />
        <Column field="etc" header="etc" />
        <Column field="comentariosGOM" header="comentarios GOM" />
        <Column field="observacionesGOM" header="observaciones GOM" />
        <Column
          field="reporteCargaGOMCreado"
          header="reporte CargaGOM Creado"
          body={reporteCargaGOMCreadoTemplate}
          dataType="date"
        />
        <Column
          field="reporteCargaGOMModificado"
          body={reporteCargaGOMModificadoTemplate}
          header="reporte CargaGOM Modificado"
          dataType="date"
        />
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <ReporteCargaGOMForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <Dialog
        visible={deleteReporteCargaGOMDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteReporteCargaGOMDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {reporteCargaGOM && (
            <span>
              Esta seguro que quiere eliminar la reporteCargaGOM Selecionado ?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ReporteCargaGOMList
