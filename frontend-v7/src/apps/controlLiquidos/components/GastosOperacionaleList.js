import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { GastosOperacionaleContext } from '../contexts/GastosOperacionaleContext'
import moment from 'moment'
import AuthUse from '../../../auth/AuthUse'
import GastosOperacionaleForm from './GastosOperacionaleForm'

const GastosOperacionaleList = () => {
  const auth = AuthUse()
  const {
    gastosOperacionales,
    findGastosOperacionale,
    deleteGastosOperacionale,
    loading
  } = useContext(GastosOperacionaleContext)
  const [gastosOperacionale, setGastosOperacionale] =
    useState(gastosOperacionales)
  const [deleteGastosOperacionaleDialog, setDeleteGastosOperacionaleDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveGastosOperacionale = (id) => {
    findGastosOperacionale(id)
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

  const fechaGastosOperacionaleCreado = (rowData) => {
    const fecha = moment(rowData.gastosOperacionaleCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaGastosOperacionaleModificado = (rowData) => {
    const fecha = moment(rowData.gastosOperacionaleModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarGastosOperacionale = () => {
    deleteGastosOperacionale(gastosOperacionale.id)
    setDeleteGastosOperacionaleDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'GastosOperacionale Eliminado',
      life: 3000
    })
  }

  const deleteGastosOperacionaleDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteGastosOperacionaleDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarGastosOperacionale()}
      />
    </>
  )

  const confirmDeleteGastosOperacionale = (gastosOperacionales) => {
    setGastosOperacionale(gastosOperacionales)
    setDeleteGastosOperacionaleDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveGastosOperacionale(rowData.id)}
        />
        {(auth.user.faidUser.roles[0] === 'ADMIN' ||
          auth.user.faidUser.roles[0] === 'SUPERADMIN') && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteGastosOperacionale(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">GastosOperacionales</h5>
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
    setDeleteGastosOperacionaleDialog(false)
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
        value={gastosOperacionales}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} GastosOperacionales"
        globalFilter={globalFilter}
        emptyMessage="No hay gastosOperacionales."
        header={header}
        sortField="gastosOperacionaleCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column
          field="nombreGastosOperacionale"
          header="Concepto Gasto"
          sortable
        />
        <Column field="descripcionGastosOperacionale" header="descripcion" />
        <Column
          field="montoGastosOperacionale"
          header="monto Gastos"
          sortable
        />
        <Column field="fechaGastosOperacionale" header="fecha" sortable />
        <Column field="estatusGastosOperacionale" header="estatus" sortable />
        <Column
          field="embarcacion.nombreEmbarcacion"
          header="embarcacion"
          sortable
        />
        <Column
          field="remolcador.nombreRemolcador"
          header="remolcador"
          sortable
        />
        <Column field="viaje.nombreViaje" header="viaje" sortable />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Column
            field="gastosOperacionaleCreado"
            body={fechaGastosOperacionaleCreado}
            header="GastosOperacionale Creado"
            dataType="date"
          />
        )}
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Column
            field="gastosOperacionaleModificado"
            body={fechaGastosOperacionaleModificado}
            header="GastosOperacionale Modificado"
            dataType="date"
          />
        )}
      </DataTable>

      <GastosOperacionaleForm
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />

      <Dialog
        visible={deleteGastosOperacionaleDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteGastosOperacionaleDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {gastosOperacionale && (
            <span>
              Esta seguro que quiere eliminar la gastosOperacionale{' '}
              <b>{gastosOperacionale.nombreGastosOperacionale}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default GastosOperacionaleList
