/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { CargaBodegaContext } from '../contexts/CargaBodegaContext'
import { BarcoContext } from '../contexts/BarcoContext'
import CargaBodegaForm from './CargaBodegaForm'
import { InputText } from 'primereact/inputtext'
import { TabView, TabPanel } from 'primereact/tabview'
import moment from 'moment'

const CargaBodegaList = () => {
  const { cargaBodegas, findCargaBodega, deleteCargaBodega, loading } =
    useContext(CargaBodegaContext)
  const { barcos } = useContext(BarcoContext)
  const [cargaBodega, setCargaBodega] = useState(cargaBodegas)
  const [deleteCargaBodegaDialog, setDeleteCargaBodegaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [expandedRows, setExpandedRows] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveCargaBodega = (id) => {
    findCargaBodega(id)
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

  const eliminarCargaBodega = () => {
    deleteCargaBodega(cargaBodega.id)
    setDeleteCargaBodegaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Reporte Carga GOM Eliminado',
      life: 3000
    })
  }
  const deleteCargaBodegaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteCargaBodegaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarCargaBodega()}
      />
    </>
  )
  const confirmDeleteCargaBodega = (cargaBodegas) => {
    setCargaBodega(cargaBodegas)
    setDeleteCargaBodegaDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveCargaBodega(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteCargaBodega(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">CargaBodega</h5>
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
    setDeleteCargaBodegaDialog(false)
  }

  const cargaBodegaCreadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.cargaBodegaCreado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.cargaBodegaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const cargaBodegaModificadoTemplate = (rowData) => {
    const validarFecha = moment(rowData.cargaBodegaModificado).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.cargaBodegaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  cargaBodegas.sort((o1, o2) => {
    if (o1.nombreBodega < o2.nombreBodega) {
      return -1
    } else if (o1.nombreBodega > o2.nombreBodega) {
      return 1
    } else {
      return 0
    }
  })

  return (
    <>
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <DataTable
        ref={dt}
        value={cargaBodegas}
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
        emptyMessage="No hay cargaBodegas."
        header={header}
        loading={loading}
        breakpoint="960px"
      >
        <Column field="nombreBodega" header="nombreBodega" />

        <Column
          field="toneladasCargadasBodega"
          header="toneladasCargadasBodega"
        />
        <Column
          field="toneladasCapacidadBodega"
          header="toneladasCapacidadBodega"
        />
        <Column field="estatusBodega" header="estatusBodega" />
        <Column
          field="cargaBodegaCreado"
          header="reporte CargaGOM Creado"
          body={cargaBodegaCreadoTemplate}
          dataType="date"
        />
        <Column
          field="cargaBodegaModificado"
          body={cargaBodegaModificadoTemplate}
          header="reporte CargaGOM Modificado"
          dataType="date"
        />
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <Toast ref={toast} />

      <CargaBodegaForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <Dialog
        visible={deleteCargaBodegaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteCargaBodegaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {cargaBodega && (
            <span>
              Esta seguro que quiere eliminar la cargaBodega Selecionado ?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CargaBodegaList
