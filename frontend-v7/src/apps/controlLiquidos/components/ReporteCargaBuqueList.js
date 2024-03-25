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
import { ReporteCargaBuqueContext } from '../contexts/ReporteCargaBuqueContext'
import { BuqueContext } from '../contexts/BuqueContext'
import ReporteCargaBuqueForm from './ReporteCargaBuqueForm'
import { InputText } from 'primereact/inputtext'
import moment from 'moment'
import { BuqueService } from '../services/BuqueService'
import AuthUse from '../../../auth/AuthUse'

const ReporteCargaBuqueList = () => {
  const buqueService = new BuqueService()
  const auth = AuthUse()
  const token = auth.user.token
  const {
    reporteCargaBuques,
    findReporteCargaBuque,
    deleteReporteCargaBuque,
    loading
  } = useContext(ReporteCargaBuqueContext)
  const { buques } = useContext(BuqueContext)
  const [buquestodos, setBuquestodos] = useState(buques)

  const [reporteCargaBuque, setReporteCargaBuque] = useState(reporteCargaBuques)
  const [deleteReporteCargaBuqueDialog, setDeleteReporteCargaBuqueDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [expandedRows, setExpandedRows] = useState([])
  const [expandedRows2, setExpandedRows2] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveReporteCargaBuque = (id) => {
    findReporteCargaBuque(id)
    setIsVisible(true)
  }
  const onRowGroupExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.buqueID.nombreBuque,
      life: 3000
    })
  }

  useEffect(() => {
    buqueService.readAll(token).then((data) => {
      setBuquestodos(data)
    })
  }, [reporteCargaBuques])

  const onRowGroupCollapse = (event) => {
    toast.current.show({
      severity: 'success',
      summary: 'Grupo de filas contraído',
      detail: 'Bueque: ' + event.data.buqueID.nombreBuque,
      life: 3000
    })
  }
  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span className="image-text">{data.buqueID.nombreBuque}</span>
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

  const eliminarReporteCargaBuque = () => {
    deleteReporteCargaBuque(reporteCargaBuque.id)
    setDeleteReporteCargaBuqueDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Reporte Carga Buque Eliminado',
      life: 3000
    })
  }
  const deleteReporteCargaBuqueDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteReporteCargaBuqueDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarReporteCargaBuque()}
      />
    </>
  )
  const confirmDeleteReporteCargaBuque = (reporteCargaBuques) => {
    setReporteCargaBuque(reporteCargaBuques)
    setDeleteReporteCargaBuqueDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveReporteCargaBuque(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteReporteCargaBuque(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">ReporteCargaBuque</h5>
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
    setDeleteReporteCargaBuqueDialog(false)
  }

  const fechaInicioFeederBuqueTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaInicioFeederBuque).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaInicioFeederBuque)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinFeederBuqueTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaFinFeederBuque).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaFinFeederBuque)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const onRowExpand = (event) => {
    toast.current.show({
      severity: 'info',
      summary: 'Grupo de filas ampliado',
      detail: 'Buque: ' + event.data.nombreBuque,
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
    buques.forEach((p) => (_expandedRows[`${p.id}`] = true))

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
    console.log(data)
    return (
      <div className="orders-subtable">
        <h5>Reporte Buque del buque {data.nombreBuque}</h5>
        <DataTable
          value={data.reporteCargaGOMBuque}
          responsiveLayout="scroll"
          sortField="data.fechaInicioFeederBuque"
          sortOrder={1}
        >
          <Column body={actionBodyTemplate}></Column>
          <Column field="ubicacionBuque" header="ubicacionBuque" />
          <Column field="nombreFeederBuque" header="nombreFeederBuque" />
          <Column
            field="fechaInicioFeederBuque"
            header="reporte CargaBuque Creado"
            body={fechaInicioFeederBuqueTemplate}
            dataType="date"
            sortable
          />
          <Column
            field="fechaFinFeederBuque"
            body={fechaFinFeederBuqueTemplate}
            header="reporte CargaBuque Modificado"
            dataType="date"
          />
          <Column field="capacidadFeederBuque" header="capacidadFeederBuque" />

          <Column field="materialCargadoBuque" header="materialCargadoBuque" />
          <Column field="tasaDeCargaBuque" header="tasaDeCargaBuque" />
          <Column field="etcBuque" header="etcBuque" />
          <Column field="comentariosBuque" header="comentariosBuque" />
          <Column field="observacionesBuque" header="observacionesBuque" />
        </DataTable>
      </div>
    )
  }
  const estatusTemplate = (rowData) => {
    return (
      <span className={`text-gray-900 ml-3 status-${rowData.estatusBuque}`}>
        {rowData.estatusBuque}
      </span>
    )
  }

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
          value={buquestodos}
          expandedRows={expandedRows2}
          onRowToggle={(e) => setExpandedRows2(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="id"
          header={header2}
          globalFilter={globalFilter}
          sortField="estatusBuque"
          sortOrder={-1}
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="nombreBuque" header="nombre Buque" sortable />
          <Column field="clienteBuque" header="clienteBuque" sortable />
          <Column
            body={estatusTemplate}
            field="estatusBuque"
            header="estatusBuque"
            sortable
          />
          <Column field="capacidadBuque" header="capacidadBuque" sortable />
          <Column
            field="capacidadNominadaBuque"
            header="capacidadNominadaBuque"
            sortable
          />
        </DataTable>
      </div>
      {/* <DataTable
        ref={dt}
        value={reporteCargaBuques}
        rowGroupMode="subheader"
        groupRowsBy="buqueID.nombreBuque"
        sortMode="single"
        sortField="buqueID.nombreBuque"
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
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ReporteCargaBuques"
        globalFilter={globalFilter}
        emptyMessage="No hay reporteCargaBuques."
        header={header}
        loading={loading}
      >
        <Column field="ubicacionBuque" header="ubicacionBuque" />
        <Column field="puestoTerminal" header="puestoTerminal" />

        <Column
          field="toneladasCargadasBuque"
          header="toneladas Cargadas Buque"
        />
        <Column field="tasaDeCargaBuque" header="tasaDeCargaBuque" />
        <Column field="etc" header="etc" />
        <Column field="comentariosBuque" header="comentarios Buque" />
        <Column field="observacionesBuque" header="observaciones Buque" />
        <Column
          field="fechaInicioFeederBuque"
          header="reporte CargaBuque Creado"
          body={fechaInicioFeederBuqueTemplate}
          dataType="date"
        />
        <Column
          field="fechaFinFeederBuque"
          body={fechaFinFeederBuqueTemplate}
          header="reporte CargaBuque Modificado"
          dataType="date"
        />
        <Column body={actionBodyTemplate}></Column>
      </DataTable> */}

      <ReporteCargaBuqueForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <Dialog
        visible={deleteReporteCargaBuqueDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteReporteCargaBuqueDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {reporteCargaBuque && (
            <span>
              Esta seguro que quiere eliminar la reporteCargaBuque Selecionado ?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ReporteCargaBuqueList
