import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { ProformaContext } from '../contexts/ProformaContext'
import moment from 'moment'

import ProformaForm from './ProformaForm'
import AuthUse from '../../../auth/AuthUse'
const ProformaList = () => {
  const auth = AuthUse()
  const { proformas, findProforma, deleteProforma, loading } =
    useContext(ProformaContext)

  const [proforma, setProforma] = useState(proformas)
  const [deleteProformaDialog, setDeleteProformaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveProforma = (id) => {
    findProforma(id)
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

  const fechaProformaCreado = (rowData) => {
    const fecha = moment(rowData.ProformaCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaProformaModificado = (rowData) => {
    const fecha = moment(rowData.proformaModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarProforma = () => {
    deleteProforma(proforma.id)
    setDeleteProformaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Proforma Eliminado',
      life: 3000
    })
  }

  const deleteProformaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteProformaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarProforma()}
      />
    </>
  )

  const confirmDeleteProforma = (proformas) => {
    setProforma(proformas)
    setDeleteProformaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveProforma(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteProforma(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Proforma</h5>
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
    setDeleteProformaDialog(false)
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
        value={proformas}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Proformas"
        globalFilter={globalFilter}
        emptyMessage="No hay Proforma."
        header={header}
        sortField="ProformaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>

        <Column field="id" header="id" />
        <Column field="codigoProforma" header="codigoProforma" />
        <Column field="proveedorId.nombreProveedor" header="proveedorId" />
        <Column field="numeroControlProforma" header="numeroControlProforma" />
        <Column field="fechaControlProforma" header="fechaControlProforma" />
        <Column field="dominioId.nombreDominio" header="dominioId" />
        <Column field="divisionId.nombreDivision" header="divisionId" />
        <Column
          field="dependenciaId.nombreDependencia"
          header="dependenciaId"
        />
        <Column
          field="subDependenciaId.nombreSubDependencia"
          header="subDependenciaId"
        />
        <Column
          field="actividadAsociadaId.nombreActividadAsociada"
          header="actividadAsociadaId"
        />
        <Column
          field="clasificacionServicioId.nombreClasificacionServicio"
          header="clasificacionServicioId"
        />
        <Column field="ingresoProforma" header="ingresoProforma" />
        <Column field="egresoProforma" header="egresoProforma" />
        <Column field="totalProforma" header="totalProforma" />
        <Column field="descripcionProforma" header="descripcionProforma" />
        <Column field="estatusProforma" header="estatusProforma" />
        <Column field="userCreatorId.id" header="userCreatorId" />

        <Column
          field="creadoProforma"
          body={fechaProformaCreado}
          header="creadoProforma"
          dataType="date"
        />
        <Column
          field="modificadoProforma"
          body={fechaProformaModificado}
          header="modificadoProforma"
          dataType="date"
        />
      </DataTable>

      <ProformaForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteProformaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteProformaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {proforma && (
            <span>
              Esta seguro que quiere eliminar la Proforma{' '}
              <b>{proforma.nombreProforma}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default ProformaList
