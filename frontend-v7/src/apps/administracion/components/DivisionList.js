import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { DivisionContext } from '../contexts/DivisionContext'
import moment from 'moment'

import DivisionForm from './DivisionForm'
import AuthUse from '../../../auth/AuthUse'

const DivisionList = () => {
  const auth = AuthUse()
  const { divisions, findDivision, deleteDivision, loading } =
    useContext(DivisionContext)
  console.log(divisions)
  const [division, setDivision] = useState(divisions)
  const [deleteDivisionDialog, setDeleteDivisionDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveDivision = (id) => {
    findDivision(id)
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

  const fechaDivisionCreado = (rowData) => {
    const fecha = moment(rowData.DivisionCreado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const fechaDivisionModificado = (rowData) => {
    const fecha = moment(rowData.divisionModificado)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarDivision = () => {
    deleteDivision(division.id)
    setDeleteDivisionDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'Division Eliminado',
      life: 3000
    })
  }

  const deleteDivisionDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteDivisionDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarDivision()}
      />
    </>
  )

  const confirmDeleteDivision = (divisions) => {
    setDivision(divisions)
    setDeleteDivisionDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => saveDivision(rowData.id)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteDivision(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Division</h5>
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
    setDeleteDivisionDialog(false)
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
        value={divisions}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} Divisions"
        globalFilter={globalFilter}
        emptyMessage="No hay Division."
        header={header}
        sortField="DivisionCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column field="dominioId.nombreDominio" header="dominioId" />
        <Column field="id" header="id" />

        <Column field="codigoDivision" header="codigoDivision" />
        <Column field="nombreDivision" header="nombreDivision" />
        <Column field="descripcionDivision" header="descripcionDivision" />
        <Column field="estatusDivision" header="estatusDivision" />
        <Column
          field="divisionCreado"
          body={fechaDivisionCreado}
          header="divisionCreado"
          dataType="date"
        />
        <Column
          field="divisionModificado"
          body={fechaDivisionModificado}
          header="divisionModificado"
          dataType="date"
        />
      </DataTable>

      <DivisionForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteDivisionDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteDivisionDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {division && (
            <span>
              Esta seguro que quiere eliminar la Division{' '}
              <b>{division.nombreDivision}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default DivisionList