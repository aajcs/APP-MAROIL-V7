/* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { FacturaContext } from '../contexts/FacturaContext'
import moment from 'moment'

// import FacturaForm from './FacturaForm'

const FacturaList = () => {
  const { facturas, findFactura, deleteFactura, loading } =
    useContext(FacturaContext)
  const [factura, setFactura] = useState(facturas)
  const [deleteBarcoDialog, setDeleteBarcoDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveBarco = (id) => {
    findFactura(id)
    setIsVisible(true)
  }

  // cabecera de la tabla
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
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
  const fechaAtracoTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaAtraco).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaAtraco)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaInicioCargaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaInicioCarga).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaInicioCarga)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFinalCargaTemplate = (rowData) => {
    const validarFecha = moment(rowData.fechaFinalCarga).isValid()
    if (!validarFecha) return
    const fecha = moment(rowData.fechaFinalCarga)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const fechaFacturaCreado = (rowData) => {
    const fecha = moment(rowData.facturaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaFacturaModificado = (rowData) => {
    const fecha = moment(rowData.facturaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarBarco = () => {
    deleteFactura(factura.id)
    setDeleteBarcoDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Barco Eliminado',
      life: 3000
    })
  }

  const deleteBarcoDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteBarcoDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarBarco()}
      />
    </>
  )

  const confirmDeleteBarco = (barcos) => {
    setFactura(barcos)
    setDeleteBarcoDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveBarco(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteBarco(rowData)}
        />
      </div>
    )
  }
  const diasTotalesCarga = (rowData) => {
    function secondsToString(diff) {
      const numdays = Math.floor(diff / 86400)
      const numhours = Math.floor((diff % 86400) / 3600)
      const numminutes = Math.floor(((diff % 86400) % 3600) / 60)
      // const numseconds = ((diff % 86400) % 3600) % 60

      return (
        numdays + ' dias ' + numhours + ' horas ' + numminutes + ' minutos '
      )
    }
    const fecha1 = moment(rowData.fechaInicioCarga)
    const fecha2 = moment(
      rowData.fechaFinalCarga ? rowData.fechaFinalCarga : moment()
    ) //
    const diff = fecha2.diff(fecha1, 'seconds') // Diff in days

    return <div className="actions">{secondsToString(diff)}</div>
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Factura</h5>
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
    setDeleteBarcoDialog(false)
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
        value={facturas}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Barcos"
        globalFilter={globalFilter}
        emptyMessage="No hay barcos."
        header={header}
        sortField="barcoCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="fechaFactura" header="fechaFactura" />
        <Column field="codigoFactura" header="codigoFactura" />
        <Column field="proveedorId" header="proveedorId" />
        <Column
          field="facturaProformaFactura"
          header="facturaProformaFactura"
        />
        <Column field="conceptoFactura" header="conceptoFactura" />
        <Column field="tipoFactura" header="tipoFactura" />
        <Column field="procesoAuxId" header="procesoAuxId" />
        <Column field="montoFactura" header="montoFactura" />
        <Column field="abonoFactura" header="abonoFactura" />
        <Column field="saldoFactura" header="saldoFactura" />
        <Column field="estatusFactura" header="estatusFactura" />
        <Column field="userCreatorId" header="userCreatorId" />

        <Column
          field="facturaCreado"
          body={fechaFacturaCreado}
          header="facturaCreado"
          dataType="date"
        />
        <Column
          field="facturaModificado"
          body={fechaFacturaModificado}
          header="facturaModificado"
          dataType="date"
        />
      </DataTable>

      {/* <FacturaForm isVisible={isVisible} setIsVisible={setIsVisible} /> */}

      <Dialog
        visible={deleteBarcoDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteBarcoDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {factura && (
            <span>
              Esta seguro que quiere eliminar la barco{' '}
              <b>{factura.nombreProyecto}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default FacturaList
