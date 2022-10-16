import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { RemolcadorContext } from '../contexts/RemolcadorContext'
import moment from 'moment'

import RemolcadorForm from './RemolcadorForm'

const RemolcadorList = () => {
  const { remolcadors, findRemolcador, deleteRemolcador, loading } =
    useContext(RemolcadorContext)
  const [remolcador, setRemolcador] = useState(remolcadors)
  const [deleteRemolcadorDialog, setDeleteRemolcadorDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveRemolcador = (id) => {
    findRemolcador(id)
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

  const fechaRemolcadorCreado = (rowData) => {
    const fecha = moment(rowData.remolcadorCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaRemolcadorModificado = (rowData) => {
    const fecha = moment(rowData.remolcadorModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarRemolcador = () => {
    deleteRemolcador(remolcador.id)
    setDeleteRemolcadorDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Remolcador Eliminado',
      life: 3000
    })
  }

  const deleteRemolcadorDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteRemolcadorDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarRemolcador()}
      />
    </>
  )

  const confirmDeleteRemolcador = (remolcadors) => {
    setRemolcador(remolcadors)
    setDeleteRemolcadorDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveRemolcador(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded  p-button-danger"
          onClick={() => confirmDeleteRemolcador(rowData)}
        />
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Remolcadors</h5>
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
    setDeleteRemolcadorDialog(false)
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
        value={remolcadors}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Remolcadors"
        globalFilter={globalFilter}
        emptyMessage="No hay remolcadors."
        header={header}
        sortField="remolcadorCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column field="nombreRemolcador" header="Remolcador" />
        <Column field="descripcionRemolcador" header="Descripción" />
        <Column field="estatusRemolcador" header="Estatus" />
        <Column field="ubicacionRemolcador" header="Actividad" />
        <Column
          field="combustibleActualRemolcador"
          header="Combustible Actual"
        />
        <Column
          field="combustibleCapacidadRemolcador"
          header="Combustible Capacidad"
        />
        <Column
          field="remolcadorCreado"
          body={fechaRemolcadorCreado}
          header="Remolcador Creado"
          dataType="date"
        />
        <Column
          field="remolcadorModificado"
          body={fechaRemolcadorModificado}
          header="Remolcador Modificado"
          dataType="date"
        />

        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <RemolcadorForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteRemolcadorDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteRemolcadorDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {remolcador && (
            <span>
              Esta seguro que quiere eliminar la remolcador{' '}
              <b>{remolcador.nombreRemolcador}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default RemolcadorList
