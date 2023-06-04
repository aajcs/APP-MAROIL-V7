import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { DominioContext } from '../contexts/DominioContext'
import moment from 'moment'

import DominioForm from './DominioForm'
import AuthUse from '../../../auth/AuthUse'
const DominioList = () => {
  const auth = AuthUse()
  const { dominios, findDominio, deleteDominio, loading } =
    useContext(DominioContext)

  const [dominio, setDominio] = useState(dominios)
  const [deleteDominioDialog, setDeleteDominioDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveDominio = (id) => {
    findDominio(id)
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

  const fechaDominioCreado = (rowData) => {
    const fecha = moment(rowData.DominioCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaDominioModificado = (rowData) => {
    const fecha = moment(rowData.dominioModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarDominio = () => {
    deleteDominio(dominio.id)
    setDeleteDominioDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Dominio Eliminado',
      life: 3000
    })
  }

  const deleteDominioDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteDominioDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarDominio()}
      />
    </>
  )

  const confirmDeleteDominio = (dominios) => {
    setDominio(dominios)
    setDeleteDominioDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveDominio(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteDominio(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Dominio</h5>
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
    setDeleteDominioDialog(false)
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
        value={dominios}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Dominios"
        globalFilter={globalFilter}
        emptyMessage="No hay Dominio."
        header={header}
        sortField="DominioCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="id" header="id" />
        <Column field="codigoDominio" header="codigoDominio" />
        <Column field="nombreDominio" header="nombreDominio" />
        <Column field="descripcionDominio" header="descripcionDominio" />
        <Column field="estatusDominio" header="estatusDominio" />
        <Column
          field="dominioCreado"
          body={fechaDominioCreado}
          header="dominioCreado"
          dataType="date"
        />
        <Column
          field="dominioModificado"
          body={fechaDominioModificado}
          header="dominioModificado"
          dataType="date"
        />
      </DataTable>

      <DominioForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteDominioDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteDominioDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {dominio && (
            <span>
              Esta seguro que quiere eliminar la Dominio{' '}
              <b>{dominio.nombreDominio}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default DominioList
