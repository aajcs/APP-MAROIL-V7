// /* eslint-disable no-unused-vars */
import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { IngresoGastoContext } from '../contexts/IngresoGastoContext'
import moment from 'moment'
import AuthUse from '../../../auth/AuthUse'
import IngresoGastoForm from './IngresoGastoForm'

const IngresoGastoList = () => {
  const auth = AuthUse()
  const { ingresoGastos, findIngresoGasto, deleteIngresoGasto, loading } =
    useContext(IngresoGastoContext)

  const [ingresoGasto, setIngresoGasto] = useState(ingresoGastos)
  const [deleteIngresoGastoDialog, setDeleteIngresoGastoDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveIngresoGasto = (id) => {
    findIngresoGasto(id)
    setIsVisible(true)
  }
  // const totalEgreso = ingresoGastos
  //   .map((egreso) => egreso.egresoIngresoGasto)
  //   .reduce((a, b) => a + b, 0)

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

  const fechaIngresoGastoCreado = (rowData) => {
    const fecha = moment(rowData.ingresoGastoCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const datefechaIngresoGasto = (rowData) => {
    const fecha = moment(rowData.fechaIngresoGasto)
    return fecha.format('MMMM YYYY ')
  }
  const fechaIngresoGastoModificado = (rowData) => {
    const fecha = moment(rowData.ingresoGastoModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarIngresoGasto = () => {
    deleteIngresoGasto(ingresoGasto.id)
    setDeleteIngresoGastoDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'IngresoGasto Eliminado',
      life: 3000
    })
  }

  const deleteIngresoGastoDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteIngresoGastoDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarIngresoGasto()}
      />
    </>
  )

  const confirmDeleteIngresoGasto = (IngresoGasto) => {
    setIngresoGasto(IngresoGasto)
    setDeleteIngresoGastoDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveIngresoGasto(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteIngresoGasto(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">IngresoGasto</h5>
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
    setDeleteIngresoGastoDialog(false)
  }
  const formatCurrency = (value) => {
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })
  }
  const egresoBodyTemplate = (rowData) => {
    return formatCurrency(rowData.egresoIngresoGasto)
  }
  const ingresoBodyTemplate = (rowData) => {
    return formatCurrency(rowData.ingresoIngresoGasto)
  }
  const estatusTemplate = (rowData) => {
    return (
      <span className={`  status-${rowData.estatusIngresoGasto}`}>
        {rowData.estatusIngresoGasto}
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

      <DataTable
        ref={dt}
        value={ingresoGastos}
        // onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} IngresoGastos"
        globalFilter={globalFilter}
        emptyMessage="No hay IngresoGastos."
        header={header}
        sortField="IngresoGastoCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column
          field="fechaIngresoGasto"
          header="Fecha"
          body={datefechaIngresoGasto}
          dataType="date"
          sortable
        />

        <Column
          field="conceptoAuxId.nombreConceptoAux"
          header="Concepto"
          sortable
        />
        <Column field="descripcionIngresoGasto" header="Descripcion" sortable />
        <Column
          field="ingresoIngresoGasto"
          header="Ingreso"
          sortable
          dataType="numeric"
          body={ingresoBodyTemplate}
        />
        <Column
          field="egresoIngresoGasto"
          header="Egreso"
          sortable
          dataType="numeric"
          body={egresoBodyTemplate}
        />
        <Column field="procesoAuxId.nombreProceso" header="Proceso" sortable />
        <Column
          field="proveedorId.nombreProveedor"
          header="Proveedor"
          sortable
        />
        <Column
          field="centroDeCostoAuxId.nombreCentroDeCosto"
          header="Centro De Costo"
          sortable
        />
        <Column
          field="estatusIngresoGasto"
          header="Estatus"
          sortable
          body={estatusTemplate}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Column field="userCreatorId" header="user Creator Id" sortable />
        )}
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Column
            field="ingresoGastoCreado"
            body={fechaIngresoGastoCreado}
            header="ingresoGastoCreado"
            dataType="date"
            sortable
          />
        )}
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Column
            field="ingresoGastoModificado"
            body={fechaIngresoGastoModificado}
            header="ingresoGastoModificado"
            dataType="date"
            sortable
          />
        )}
      </DataTable>

      <IngresoGastoForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteIngresoGastoDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteIngresoGastoDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {ingresoGasto && (
            <span>
              Esta seguro que quiere eliminar la IngresoGasto{' '}
              <b>{ingresoGasto.nombreProyecto}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default IngresoGastoList
