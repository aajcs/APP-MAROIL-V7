import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { CajaChicaContext } from '../contexts/CajaChicaContext'
import moment from 'moment'
import AuthUse from '../../../auth/AuthUse'
import CajaChicaForm from './CajaChicaForm'
import { PDFViewer } from '@react-pdf/renderer'
// import ReciboCajaChicaPDF from './ReciboCajaChicaPdf'
import CajaChicaRecibo from './CajaChicaRecibo'
const CajaChicaList = () => {
  const auth = AuthUse()
  const { cajaChicas, findCajaChica, deleteCajaChica, loading } =
    useContext(CajaChicaContext)
  const [cajaChica, setCajaChica] = useState(cajaChicas)
  const [deleteCajaChicaDialog, setDeleteCajaChicaDialog] = useState(false)
  const [reciboCajaChicaDialog, setReciboCajaChicaDialog] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [ingresoEgresoVisible, setIngresoEgresoVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)
  const saveCajaChica = (id) => {
    findCajaChica(id)
    setIsVisible(true)
  }
  const codigoUltimoActual = cajaChicas
    .map((p) => p.codigoCajaChica)
    .reduce((a, b) => Math.max(a, b), 0)
  console.log(codigoUltimoActual)
  // cabecera de la tabla
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2 ">
          <Button
            label="Nuevo ingreso"
            icon="pi pi-angle-double-down"
            className="p-button-success mr-2"
            onClick={() => {
              setIsVisible(true)
              setIngresoEgresoVisible(true)
            }}
          />
          <Button
            label="Nuevo egreso"
            icon="pi pi-angle-double-up"
            className="p-button-danger"
            onClick={() => setIsVisible(true)}
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

  const fechaCajaChicaCreado = (rowData) => {
    const fecha = moment(rowData.creadoCajaChica)
    return fecha.format('dddDD/MM/YY HH:mm')
  }
  const datefechaCajaChica = (rowData) => {
    const fecha = moment(rowData.fechaCajaChica)
    return fecha.format('MMMM YYYY ')
  }
  const fechaCajaChicaModificado = (rowData) => {
    const fecha = moment(rowData.modificadoCajaChica)
    return fecha.format('dddDD/MM/YY HH:mm')
  }

  const eliminarCajaChica = () => {
    deleteCajaChica(cajaChica.id)
    setDeleteCajaChicaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'CajaChica Eliminado',
      life: 3000
    })
  }

  const deleteCajaChicaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteCajaChicaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarCajaChica()}
      />
    </>
  )
  const reciboCajaChicaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setReciboCajaChicaDialog(false)}
      />
    </>
  )

  const confirmDeleteCajaChica = (CajaChica) => {
    setCajaChica(CajaChica)
    setDeleteCajaChicaDialog(true)
  }
  const imprimirRecibo = (rowData) => {
    setCajaChica(rowData)
    setReciboCajaChicaDialog(true)
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2 mb-2"
          onClick={() => {
            if (rowData.ingresoMontoCajaChica !== 0) {
              setIngresoEgresoVisible(true)
            } else {
              setIngresoEgresoVisible(false)
            }

            saveCajaChica(rowData.id)
          }}
        />{' '}
        <Button
          icon="pi pi-print"
          className="p-button-rounded p-button-raised p-button-text p-button-plain"
          onClick={() => imprimirRecibo(rowData)}
        />
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded  p-button-danger"
            onClick={() => confirmDeleteCajaChica(rowData)}
          />
        )}
      </div>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">CajaChica</h5>
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
    setDeleteCajaChicaDialog(false)
    setReciboCajaChicaDialog(false)
  }
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
  const egresoBodyTemplate = (rowData) => {
    return formatCurrency(rowData.egresoMontoCajaChica)
  }
  const ingresoBodyTemplate = (rowData) => {
    return formatCurrency(rowData.ingresoMontoCajaChica)
  }
  const estatusTemplate = (rowData) => {
    return (
      <span className={`  status-${rowData.estatusCajaChica}`}>
        {rowData.estatusCajaChica}
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
        value={cajaChicas}
        // onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} CajaChicas"
        globalFilter={globalFilter}
        emptyMessage="No hay CajaChicas."
        header={header}
        sortField="CajaChicaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column body={actionBodyTemplate}></Column>
        <Column
          field="fechaCajaChica"
          header="Fecha"
          body={datefechaCajaChica}
          dataType="date"
          sortable
        />

        <Column
          field="conceptoAuxId.nombreConceptoAux"
          header="Concepto"
          sortable
        />
        <Column field="codigoCajaChica" header="Codigo" sortable />
        <Column
          field="montoEntregadoCajaChica"
          header="Monto Entregado"
          sortable
        />
        <Column field="montoVueltoCajaChica" header="Monto Vuelto" sortable />
        <Column
          field="estatusVueltoCajaChica"
          header="Estatus Vuelto"
          sortable
        />
        <Column field="descripcionCajaChica" header="Descripcion" sortable />
        <Column
          field="ingresoMontoCajaChica"
          header="Ingreso"
          sortable
          dataType="numeric"
          body={ingresoBodyTemplate}
        />
        <Column
          field="egresoMontoCajaChica"
          header="Egreso"
          sortable
          dataType="numeric"
          body={egresoBodyTemplate}
        />

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
          field="estatusCajaChica"
          header="Estatus"
          sortable
          body={estatusTemplate}
        />

        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Column
            field="creadoCajaChica"
            body={fechaCajaChicaCreado}
            header="creadoCajaChica"
            dataType="date"
            sortable
          />
        )}
        {auth.user.faidUser.roles[0] === 'SUPERADMIN' && (
          <Column
            field="modificadoCajaChica"
            body={fechaCajaChicaModificado}
            header="modificadoCajaChica"
            dataType="date"
            sortable
          />
        )}
      </DataTable>

      <CajaChicaForm
        isVisible={isVisible}
        ingresoEgresoVisible={ingresoEgresoVisible}
        setIsVisible={setIsVisible}
        setIngresoEgresoVisible={setIngresoEgresoVisible}
        codigoUltimoActual={codigoUltimoActual}
      />

      <Dialog
        visible={deleteCajaChicaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteCajaChicaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {cajaChica && (
            <span>
              Esta seguro que quiere eliminar la CajaChica{' '}
              <b>{cajaChica.nombreProyecto}</b>?
            </span>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={reciboCajaChicaDialog}
        style={{ width: '100%', height: '90vh' }}
        header="Confirm"
        modal
        footer={reciboCajaChicaDialogFooter}
        onHide={() => clearSelected()}
      >
        <PDFViewer style={{ width: '100%', height: '90vh' }}>
          {/* <ReciboCajaChicaPDF cajaChica={cajaChica} /> */}
          <CajaChicaRecibo cajaChica={cajaChica} auth={auth} />
        </PDFViewer>
      </Dialog>
    </>
  )
}

export default CajaChicaList
