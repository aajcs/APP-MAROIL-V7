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

import CargaProformaForm from './CargaProformaForm'
import AuthUse from '../../../auth/AuthUse'
import { ItemsProformaContext } from '../contexts/ItemsProformaContext'

import ItemsProformaForm from './ItemsProformaForm'
const CargaProformaList = () => {
  const auth = AuthUse()
  const { proformas, findProforma, deleteProforma, loading } =
    useContext(ProformaContext)
  console.log(proformas)
  const { itemsProformas, findItemsProforma, deleteItemsProforma } =
    useContext(ItemsProformaContext)
  const [proforma, setProforma] = useState(proformas)
  const [itemsProforma, setItemsProforma] = useState(itemsProformas)
  const [deleteProformaDialog, setDeleteProformaDialog] = useState(false)
  const [deleteProformaDialog2, setDeleteProformaDialog2] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [expandedRows2, setExpandedRows2] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveProforma = (id) => {
    findProforma(id)
    setIsVisible(true)
  }
  const saveProforma2 = (id) => {
    findItemsProforma(id)
    setIsVisible2(true)
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
  const eliminarProforma2 = () => {
    deleteItemsProforma(itemsProforma.id)
    setDeleteProformaDialog2(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'ItemsProforma Eliminado',
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
  const deleteProformaDialogFooter2 = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteProformaDialog2(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarProforma2()}
      />
    </>
  )

  const confirmDeleteProforma = (proformas) => {
    setProforma(proformas)
    setDeleteProformaDialog(true)
  }
  const confirmDeleteProforma2 = (proformas) => {
    setItemsProforma(proformas)
    setDeleteProformaDialog2(true)
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
  const actionBodyTemplate2 = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveProforma2(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteProforma2(rowData)}
          />
        )}
      </div>
    )
  }

  // const header = (
  //   <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
  //     <h5 className="m-0">Proforma</h5>
  //     <span className="block mt-2 md:mt-0 p-input-icon-left">
  //       <i className="pi pi-search" />
  //       <InputText
  //         type="search"
  //         onInput={(e) => setGlobalFilter(e.target.value)}
  //         placeholder="Buscar..."
  //       />
  //     </span>
  //   </div>
  // )
  const clearSelected = () => {
    setDeleteProformaDialog(false)
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
  const rowExpansionTemplate = (data) => {
    const itemsProformasFill = itemsProformas.filter(
      (p) => p.proformaId && p.proformaId.id === data.id && p
    )
    console.log(data)
    console.log(itemsProformas)
    return (
      <div className="orders-subtable">
        <h5>Items Proforma {data.nombreBarco}</h5>
        <DataTable
          value={itemsProformasFill}
          responsiveLayout="scroll"
          sortField="data.reporteCargaGOMModificado"
          sortOrder={-1}
        >
          {(auth.user.faidUser.roles[0] === 'ADMIN' ||
            auth.user.faidUser.roles[0] === 'OPERADOR' ||
            auth.user.faidUser.roles[0] === 'SUPERADMIN') && (
            <Column body={actionBodyTemplate2}></Column>
          )}

          <Column field="codigoItemsProforma" header="codigoItemsProforma" />
          <Column
            field="descripcionItemsProforma"
            header="descripcionItemsProforma"
          />

          <Column
            field="fechaInicioItemsProforma"
            header="fechaInicioItemsProforma"
          />
          <Column
            field="fechaFinItemsProforma"
            header="fechaFinItemsProforma"
          />
          <Column field="unidadItemsProforma" header="unidadItemsProforma" />
          <Column
            field="cantidadItemsProforma"
            header="cantidadItemsProforma"
          />
          <Column
            field="precioUnitarioItemsProforma"
            header="precioUnitarioItemsProforma"
          />
          <Column
            field="precioTotalItemsProforma"
            header="precioTotalItemsProforma"
          />
          <Column
            field="estatus1ItemsProforma"
            header="estatus1ItemsProforma"
          />
          <Column
            field="estatus2ItemsProforma"
            header="estatus2ItemsProforma"
          />
          <Column field="proformaId.id" header="proformaId" />

          {/* <Column
            field="reporteCargaGOMModificado"
            body={reporteCargaGOMModificadoTemplate}
            header="Carga GOM Modificado"
            dataType="date"
            sortable
          /> */}
        </DataTable>
      </div>
    )
  }
  const expandAll = () => {
    const _expandedRows = {}
    proformas.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows2(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows2(null)
  }
  const header2 = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <Button
        icon="pi pi-plus"
        label="Expandir Todos"
        onClick={expandAll}
        className="mr-2"
      />
      <Button icon="pi pi-minus" label="Reducir Todos" onClick={collapseAll} />
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

  return (
    <>
      <Toast ref={toast} />
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <DataTable
        value={proformas}
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
        loading={loading}
      >
        <Column expander style={{ width: '3em' }} />
        <Column body={actionBodyTemplate}></Column>

        <Column field="codigoProforma" header="codigoProforma" sortable />
        <Column
          field="proveedorId.nombreProveedor"
          header="proveedorId"
          sortable
        />
        <Column
          field="numeroControlProforma"
          header="numeroControlProforma"
          sortable
        />
        <Column
          field="fechaControlProforma"
          header="fechaControlProforma"
          sortable
        />
        <Column field="dominioId.nombreDominio" header="dominioId" sortable />
        <Column
          field="divisionId.nombreDivision"
          header="divisionId"
          sortable
        />
        <Column
          field="dependenciaId.nombreDependencia"
          header="dependenciaId"
          sortable
        />
        <Column
          field="subDependenciaId.nombreSubDependencia"
          header="subDependenciaId"
          sortable
        />
        <Column field="usoFondoProforma" header="usoFondoProforma" />
        <Column
          field="actividadAsociadaId.nombreActividadAsociada"
          header="actividadAsociadaId"
          sortable
        />
        <Column
          field="clasificacionServicioId.nombreClasificacionServicio"
          header="clasificacionServicioId"
          sortable
        />
        <Column field="ingresoProforma" header="ingresoProforma" sortable />
        <Column field="egresoProforma" header="egresoProforma" sortable />
        <Column field="totalProforma" header="totalProforma" sortable />
        <Column
          field="descripcionProforma"
          header="descripcionProforma"
          sortable
        />
        <Column field="estatusProforma" header="estatusProforma" sortable />
        <Column field="userCreatorId.id" header="userCreatorId" sortable />

        <Column
          field="creadoProforma"
          body={fechaProformaCreado}
          header="creadoProforma"
          dataType="date"
          sortable
        />
        <Column
          field="modificadoProforma"
          body={fechaProformaModificado}
          header="modificadoProforma"
          dataType="date"
          sortable
        />
      </DataTable>

      {/* <DataTable
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
      </DataTable> */}

      <CargaProformaForm isVisible={isVisible} setIsVisible={setIsVisible} />
      <ItemsProformaForm isVisible={isVisible2} setIsVisible={setIsVisible2} />

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
      <Dialog
        visible={deleteProformaDialog2}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteProformaDialogFooter2}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {itemsProforma && (
            <span>
              Esta seguro que quiere eliminar la ItemsProforma{' '}
              <b>{itemsProforma.codigoItemsProforma}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CargaProformaList
