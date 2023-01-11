import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { CostoTmMesContext } from '../contexts/CostoTmMesContext'
import moment from 'moment'
import AuthUse from '../../../auth/AuthUse'
import CostoTmMesForm from './CostoTmMesForm'

const CostoTmMesList = () => {
  const auth = AuthUse()
  const { costoTmMess, findCostoTmMes, deleteCostoTmMes, loading } =
    useContext(CostoTmMesContext)

  const [activo, setCostoTmMes] = useState(costoTmMess)
  const [deleteBarcoDialog, setDeleteBarcoDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveBarco = (id) => {
    findCostoTmMes(id)
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
  const datefechaEfectivaCostoTmMes = (rowData) => {
    const fecha = moment(rowData.fechaEfectivaCostoTmMes)
    return fecha.format('MMMM YYYY ')
  }
  const fechaCostoTmMesCreado = (rowData) => {
    const fecha = moment(rowData.creadoCostoTmMes)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaCostoTmMesModificado = (rowData) => {
    const fecha = moment(rowData.modificadoCostoTmMes)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarBarco = () => {
    deleteCostoTmMes(activo.id)
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
    setCostoTmMes(barcos)
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
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteBarco(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">CostoTmMes</h5>
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
        value={costoTmMess}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Barcos"
        globalFilter={globalFilter}
        emptyMessage="No hay CostoTmMes."
        header={header}
        sortField="creadoCostoTmMes"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="codigoCostoTmMes" header="codigoCostoTmMes" sortable />
        <Column field="nombreCostoTmMes" header="nombreCostoTmMes" sortable />
        <Column field="costoCostoTmMes" header="costoCostoTmMes" sortable />

        <Column
          field="fechaEfectivaCostoTmMes"
          header="Fecha"
          body={datefechaEfectivaCostoTmMes}
          dataType="date"
          sortable
        />
        <Column field="estatusCostoTmMes" header="estatusCostoTmMes" sortable />
        <Column
          field="creadoCostoTmMes"
          body={fechaCostoTmMesCreado}
          header="creadoCostoTmMes"
          dataType="date"
          sortable
        />
        <Column
          field="CostoTmMesModificado"
          body={fechaCostoTmMesModificado}
          header="CostoTmMesModificado"
          dataType="date"
          sortable
        />
      </DataTable>

      <CostoTmMesForm isVisible={isVisible} setIsVisible={setIsVisible} />

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
          {activo && (
            <span>
              Esta seguro que quiere eliminar la CostoTmMes{' '}
              <b>{activo.nombreCostoTmMes}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default CostoTmMesList
